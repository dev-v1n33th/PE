package com.arshaa.service;


import com.arshaa.common.CheckOutIntiated;
import com.arshaa.common.FinalCheckOutConfimation;
import com.arshaa.common.InitiateCheckoutByGuestId;
import com.arshaa.common.InitiatingCheckOut;
import com.arshaa.common.OnboardingConfirmation;
import com.arshaa.model.EmailResponse;

import com.arshaa.common.Bed;
import com.arshaa.common.MailDto;
import com.arshaa.common.Payment;
import com.arshaa.common.PaymentRemainderData;
import com.arshaa.common.UpdateGuestDetails;
import com.arshaa.common.UpdateGuestStatusAfterInitiateCheckout;
import com.arshaa.dtos.CheckOutConfirmation;
import com.arshaa.dtos.GuestDto;
import com.arshaa.dtos.RatedDto;
import com.arshaa.entity.Guest;
import com.arshaa.entity.RatesConfig;
import com.arshaa.model.DueGuestsList;
import com.arshaa.model.PaymentRemainder;
import com.arshaa.model.PreviousGuests;
import com.arshaa.model.VacatedGuests;
import com.arshaa.repository.GuestRepository;
import com.arshaa.repository.RatesConfigRepository;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.domain.Sort;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.client.RestTemplate;

import java.net.URI;
import java.net.URISyntaxException;
import java.sql.Date;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Period;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.time.temporal.Temporal;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.persistence.EntityManager;
import javax.persistence.ParameterMode;
import javax.persistence.PersistenceContext;
import javax.persistence.StoredProcedureQuery;

@Service
public class GuestService implements GuestInterface {
	@Autowired(required = true)
	private GuestRepository repository;
	
	@Autowired
	private RatesConfigRepository rconfig;

	@Autowired
	@Lazy
	private RestTemplate template;

	@Autowired
	private ModelMapper modelMapper;

	@Autowired
	@PersistenceContext
	private EntityManager em;
	
	@Autowired
	private    DueCalculateService dueService;
	
	

 
	    
	    public ResponseEntity getAllRents(String occupancyType, int buildingId, int sharing)
	    {
    		RatesConfig rc=rconfig.findByOccupancyTypeAndBuildingIdAndSharing(occupancyType,buildingId,sharing);
             return new ResponseEntity(rc,HttpStatus.OK);
	    }

	@Override
	public List<GuestDto> getGuests(String field) {
		List<Guest> getGuest = repository.findAll(Sort.by(Sort.Direction.DESC, field));
		List<GuestDto> gdto = new ArrayList<>();

		getGuest.forEach(s -> {
			GuestDto d = new GuestDto();
			d.setAadharNumber(s.getAadharNumber());
			d.setBedId(s.getBedId());
			d.setBuildingId(s.getBuildingId());
			d.setGuestName(s.getFirstName().concat(" ").concat(s.getLastName()));
			d.setAmountPaid(s.getAmountPaid());
			d.setBuildingId(s.getBuildingId());
			String name = template.getForObject(
					"http://bedService/bed/getBuildingNameByBuildingId/" + s.getBuildingId(), String.class);
			d.setBuildingName(name);
			d.setPersonalNumber(s.getPersonalNumber());
			d.setCheckInDate(s.getCheckInDate());
			d.setCheckOutDate(s.getCheckOutDate());
			d.setAddressLine1(s.getAddressLine1());
			d.setAddressLine2(s.getAddressLine2());
			d.setId(s.getId());
			d.setDefaultRent(s.getDefaultRent());
			gdto.add(d);

		});
		return gdto;
	}

	@Override
	public Guest getGuestById(String guestId) {
		return repository.findById(guestId);
	}

	public Guest addGuest(Guest guest) {
        //double initialDefaultrent = 0;
        String bedUri = "http://bedService/bed/updateBedStatusBydBedId";
        String payUri = "http://paymentService/payment/addPaymentAtOnBoarding";
        String mailUri="http://emailService/mail/sendOnboardingConfirmation";
 //     Bed getUniqueBed = template.getForObject("http://bedService/bed/getBedByBedId/" + guest.getBedId(), Bed.class);
//        if (getUniqueBed.getBedId().equalsIgnoreCase(guest.getBedId())) {
//            System.out.println(getUniqueBed.getBedId());
//            guest.setDueAmount(getUniqueBed.getDefaultRent() - guest.getAmountPaid());
//        }
        System.out.println("cccc"+guest.getCheckInDate());
        SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss");
        System.out.println("ccff"+formatter.format(guest.getCheckInDate()));
       
        
//        java.util.Date  utilDate = new java.util.Date(guest.getCheckInDate());
        java.sql.Date tSqlDate = new java.sql.Date(guest.getTransactionDate().getTime());
        
        guest.setTransactionDate(tSqlDate);
        
       
       java.sql.Date createDate =new java.sql.Date(guest.getCreatedOn().getTime());
       guest.setCreatedOn(createDate);
       if(guest.getBuildingId()==0 || guest.getBedId()==null)
       {
    	   Guest g=null;
    	   return g;
       }
       else {
    	   repository.save(guest);
           
           if(guest.getOccupancyType().equalsIgnoreCase("Daily"))
           {
           	java.util.Date m = guest.getCheckInDate();
           	java.sql.Date ms = new java.sql.Date(m.getTime());
               Calendar cal = Calendar.getInstance();  
               cal.setTime(m);  
               cal.add(Calendar.DATE, guest.getDuration()); 
               m = cal.getTime();   
               System.out.println(m);
               guest.setPlannedCheckOutDate(m);
               guest.setGuestStatus("Active");            
               repository.save(guest);
           }
           else if(guest.getOccupancyType().equalsIgnoreCase("OneMonth"))
           {
           	guest.setDuration(1);
           	repository.save(guest);
           	java.util.Date m = guest.getCheckInDate();
           	
           	java.sql.Date ms = new java.sql.Date(m.getTime());
           	
               Calendar cal = Calendar.getInstance();  
               cal.setTime(m);  
               cal.add(Calendar.MONTH, guest.getDuration()); 
               m = cal.getTime();   
               System.out.println(m);
               
               DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");  
               //System.out.println(dtf.format(m));  

               guest.setPlannedCheckOutDate(m);
               guest.setGuestStatus("Active");            
               repository.save(guest);
           }        
           else {
               guest.setGuestStatus("active");            

               repository.save(guest);
           }


//           System.out.println(initialDefaultrent); 
           guest.setGuestStatus("active");            

           repository.save(guest);
                   System.out.println(guest.getDueAmount());
           Bed bedReq = new Bed();
           Payment payReq = new Payment();
           //bed setting
           bedReq.setBedId(guest.getBedId());
           
           bedReq.setGuestId(guest.getId());
           //bedReq.setDueAmount(guest.getDueAmount());
           template.put(bedUri, bedReq, Bed.class);
           //payment setting
           payReq.setGuestId(guest.getId());
           payReq.setBuildingId(guest.getBuildingId());
           payReq.setTransactionId(guest.getTransactionId());
           payReq.setOccupancyType(guest.getOccupancyType());
           payReq.setTransactionDate(guest.getTransactionDate());
          // payReq.setCheckinDate(cSqlDate);
           payReq.setAmountPaid(guest.getAmountPaid());
          // payReq.setDueAmount(guest.getDueAmount());
           payReq.setPaymentPurpose(guest.getPaymentPurpose());
           repository.save(guest);
           Payment parRes = template.postForObject(payUri, payReq, Payment.class);
           System.out.println(parRes);
           
           OnboardingConfirmation mail=new OnboardingConfirmation();
           mail.setName(guest.getFirstName()+guest.getLastName());
           mail.setAmountPaid(guest.getAmountPaid());
           String name=template.getForObject("http://bedService/bed/getBuildingNameByBuildingId/"+ guest.getBuildingId(), String.class);
           mail.setBuildingName(name);
           mail.setBedId(guest.getBedId());
           mail.setEmail(guest.getEmail());
           OnboardingConfirmation res = template.postForObject(mailUri, mail, OnboardingConfirmation.class);

                   return guest;
       }
        
    }

	@Override
	public double updateGuest(Guest guest) {
		Guest newGuest = repository.findById(guest.getId());
		newGuest.setDueAmount(guest.getDueAmount());
		repository.save(newGuest);
		return newGuest.getDueAmount();
	}

	@Override
	public void deleteGuest(String guestId) {
		Guest deleteGuest = repository.findById(guestId);
		repository.delete(deleteGuest);
	}

	// Method to fetch the dueamount by guestId .
	@SuppressWarnings("unchecked")
	@Override
	public List<Guest> getByGuestId(String guestId) {
		// TODO Auto-generated method stub

		return em.createNamedStoredProcedureQuery("firstProcedure").setParameter("g_id", guestId).getResultList();

	}

	// Method to fetch all the dueamount .
	@SuppressWarnings("unchecked")
	@Override
	public List<Guest> getTotalDue() {

		return em.createNamedStoredProcedureQuery("dueDashBoard").getResultList();

	}

	@Override
	public List<Guest> getPendingByBuildingId(int buildingId) {
		// TODO Auto-generated method stub
		return em.createNamedStoredProcedureQuery("thirdProcedure").setParameter("b_id", buildingId).getResultList();

	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Guest> getCheckOutAmountByGuestId(String id) {
		// TODO Auto-generated method stub
		return em.createNamedStoredProcedureQuery("checkOut").setParameter("GUEST__ID", id).getResultList();
	}

	@SuppressWarnings("unchecked")
	@Override
	public ResponseEntity getFinalDueAmountById(String id) {
		// TODO Auto-generated method stub
		String maila ="http://emailService/mail/guestCheckOutNotification";
		try {
		 em.createNamedStoredProcedureQuery("finalDue").setParameter("guest__id", id).getResultList();
		
		  	Guest getGuest=repository.findById(id);
    	CheckOutConfirmation mail= new CheckOutConfirmation();
        mail.setName(getGuest.getFirstName()+getGuest.getLastName());
        mail.setNoticeDate(getGuest.getNoticeDate());
        mail.setCheckOutDate(getGuest.getCheckOutDate());
        String name=template.getForObject("http://bedService/bed/getBuildingNameByBuildingId/"+ getGuest.getBuildingId(), String.class);
        mail.setBuildingName(name);
        mail.setBedId(getGuest.getBedId());
        mail.setEmail(getGuest.getEmail());
       CheckOutConfirmation res = template.postForObject(maila, mail, CheckOutConfirmation.class);
	return new ResponseEntity(res , HttpStatus.OK);
		}catch(Exception e) {
			e.getMessage();
		}
		return null;

	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Guest> getOnlyDues(String id) {
		// TODO Auto-generated method stub
		return  em.createNamedStoredProcedureQuery("onlyDues").setParameter("GUEST__ID", id).getResultList();
		

	}

	public List<VacatedGuests> findByGuestStatus(String guestStatus) {

		List<Guest> getList = repository.findByGuestStatus(guestStatus);
		List<VacatedGuests> gin = new ArrayList<>();

		// GuestsInNotice gs=new GuestsInNotice();
		getList.forEach(g -> {
			VacatedGuests gs = new VacatedGuests();
			gs.setBedId(g.getBedId());
			String name = template.getForObject(
					"http://bedService/bed/getBuildingNameByBuildingId/" + g.getBuildingId(), String.class);
			gs.setBuildingName(name);

			gs.setCheckOutDate(g.getCheckOutDate());
			gs.setEmail(g.getEmail());
			gs.setBedId(g.getBedId());
			gs.setFirstName(g.getFirstName());
			gs.setPersonalNumber(g.getPersonalNumber());
			gs.setId(g.getId());
			gin.add(gs);
		});
		return gin;
	}

	@Override
	public List<Guest> getTotalPaidByGuestId(String id) {
		// TODO Auto-generated method stub
		return em.createNamedStoredProcedureQuery("totalGuestAmount").setParameter("GUEST__ID", id).getResultList();

	}

	@Override
	public Guest addPostGuest(PreviousGuests guest) {
		String bedUri = "http://bedService/bed/updateBedStatusBydBedId";
		String payUri = "http://paymentService/payment/addPaymentAtOnBoarding";
		Guest g = new Guest();

		java.sql.Date createDate = new java.sql.Date(guest.getCreatedOn().getTime());
		g.setCreatedOn(createDate);
		g.setAadharNumber(guest.getAadharNumber());
		g.setAddressLine1(guest.getAddressLine1());
		g.setAddressLine2(guest.getAddressLine2());
		g.setAmountPaid(guest.getAmountPaid());
		g.setAmountToBePaid(guest.getAmountToBePaid());
		g.setBedId(guest.getBedId());
		g.setBloodGroup(guest.getBloodGroup());
		g.setBuildingId(guest.getBuildingId());
		g.setCheckInDate(guest.getCheckInDate());
		g.setCheckinNotes(guest.getCheckinNotes());
		g.setCheckOutDate(guest.getCheckOutDate());
		g.setCity(guest.getCity());
		g.setCreatedBy(guest.getCreatedBy());
		g.setCreatedOn(guest.getCreatedOn());
		g.setDateOfBirth(guest.getDateOfBirth());
		g.setDefaultRent(guest.getDefaultRent());
		g.setDueAmount(guest.getDueAmount());
		g.setDuration(guest.getDuration());
		g.setEmail(guest.getEmail());
		g.setFatherName(guest.getFatherName());
		g.setFatherNumber(guest.getFatherNumber());
		g.setFirstName(guest.getFirstName());
		g.setGender(guest.getGender());
		g.setGuestStatus(guest.getGuestStatus());

		g.setLastName(guest.getLastName());
		g.setNoticeDate(guest.getNoticeDate());
		g.setOccupancyType(guest.getOccupancyType());
		g.setOccupation(guest.getOccupation());
		g.setPaymentPurpose(guest.getPaymentPurpose());
		g.setPersonalNumber(guest.getPersonalNumber());
		g.setPincode(guest.getPincode());
		g.setPlannedCheckOutDate(guest.getPlannedCheckOutDate());
		g.setSecondaryPhoneNumber(guest.getSecondaryPhoneNumber());
		g.setSecurityDeposit(guest.getSecurityDeposit());
		g.setState(guest.getState());
//		java.sql.Date tDate = new java.sql.Date(guest.getTransactionDate().getTime());
//		g.setTransactionDate(tDate);
		g.setTransactionDate(guest.getTransactionDate());
		g.setTransactionId(guest.getTransactionId());
		
		 if(guest.getBuildingId()==0 || guest.getBedId()==null)
         {
             Guest gt =null;
             return gt;
         }
         else {
		
		repository.save(g);

		if (guest.getOccupancyType().equalsIgnoreCase("daily")) {
			java.util.Date m = guest.getCheckInDate();
			java.sql.Date ms = new java.sql.Date(m.getTime());
			
		
			
			Calendar cal = Calendar.getInstance();
			cal.setTime(ms);
			cal.add(Calendar.DATE, guest.getDuration());
			m = cal.getTime();
			//Newly Addel Logic 
			cal.add(Calendar.DATE, -1);
			m=cal.getTime();
			
			System.out.println(m);
			g.setPlannedCheckOutDate(m);
			g.setGuestStatus("active");
			repository.save(g);
		} else if (guest.getOccupancyType().equalsIgnoreCase("OneMonth")) {
			java.util.Date m = guest.getCheckInDate();
			java.sql.Date ms = new java.sql.Date(m.getTime());
			Calendar cal = Calendar.getInstance();
			cal.setTime(ms);
			cal.add(Calendar.MONTH, guest.getDuration());
			cal.add(Calendar.MONTH, 0);
			ms = (Date) cal.getTime();
            cal.add(Calendar.DATE,-1);
            m=cal.getTime();
			System.out.println(m);
			

			DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
			// System.out.println(dtf.format(m));

			g.setPlannedCheckOutDate(m);
			g.setGuestStatus("active");
			repository.save(g);
		} else {
			g.setGuestStatus("active");

			repository.save(g);
		}
         }

//	        System.out.println(initialDefaultrent); 
		guest.setGuestStatus("active");

		repository.save(g);
		System.out.println(guest.getDueAmount());
		Bed bedReq = new Bed();
		Payment payReq = new Payment();
		// bed setting
		bedReq.setBedId(g.getBedId());

		bedReq.setGuestId(g.getId());
		// bedReq.setDueAmount(guest.getDueAmount());
		template.put(bedUri, bedReq, Bed.class);
		// payment setting
		payReq.setGuestId(g.getId());
		payReq.setBuildingId(g.getBuildingId());
		payReq.setTransactionId(g.getTransactionId());
		payReq.setOccupancyType(g.getOccupancyType());
		payReq.setTransactionDate(g.getTransactionDate());
		// payReq.setCheckinDate(cSqlDate);
		payReq.setAmountPaid(g.getAmountPaid());
		// payReq.setDueAmount(guest.getDueAmount());
		payReq.setPaymentPurpose(g.getPaymentPurpose());
		repository.save(g);
		Payment parRes = template.postForObject(payUri, payReq, Payment.class);
		System.out.println(parRes);
		return g;
	}

//	@Override
//	public List<MailDto> getGuestData(int buildingId) {	
//		List<Guest>  guest = repository.getByBuildingId(buildingId);
//		List<MailDto> mt = new ArrayList<>();
//		
//		guest.forEach(g->{
//			
//			MailDto mm = new MailDto();
//			mm.setEmail(g.getEmail());
//			mm.setGuestId(g.getId());
//	double d = template.getForObject("http://guestService/onClickDues/"+g.getBuildingId() , double.class);
//	mm.setDueAmount(d);
//	
//		});
//		
//	}

//		StoredProcedureQuery query = em.createStoredProcedureQuery("PAYMENTS_REMAINDER"); 
//		 query.registerStoredProcedureParameter(1, Integer.class, ParameterMode.IN);
//		// query.registerStoredProcedureParameter(2, Object.class, ParameterMode.OUT);
//		 
//		//Pass the parameter values
//	        query.setParameter(1, buildingId);
//	      
//	        //Execute query
//	        query.execute();
//	        
//	        //Get output parameters
//	      List<Guest> ss=  query.getResultList();
//	      //  Object outMessage = (Object) query.getOutputParameterValue(2);
//		List<Guest> s=new ArrayList<>();
//		Guest g2=new Guest();
//	     Optional<List<Guest>> ss= Optional.of(em.createNamedStoredProcedureQuery("paymentsRemainder").setParameter("building_id" , buildingId).getResultList());
////		ss.get().forEach(g->{
////			g2.setId(g.getId());
////			g2.setEmail(g.getEmail());
////			g2.setDueAmount(g.getDueAmount());
////			s.add(g2);
////		});
//	      return new ResponseEntity(ss,HttpStatus.OK);
//	}

public ResponseEntity paymentRemainder(int buildingId)
	{
		String url="http://emailService/mail/sendPaymentRemainder/";
		List<PaymentRemainder> getList=new ArrayList();
		List<EmailResponse> getRes=new ArrayList<>();
		List<Guest> getGuest=repository.getByBuildingId(buildingId);
		  System.out.println("List:"+getGuest); 

		if(!getGuest.isEmpty())
		{
			getGuest.forEach(g->{
				String ss = g.getOccupancyType() ;
			boolean s=	"Regular".contentEquals(ss);
			System.out.println("s"  + s);
				if(s==true)
				{
					PaymentRemainder pr=new PaymentRemainder(); 

					double dueAmount=calculateDueAmount(g.getId());
					System.out.println(dueAmount);
					if((dueAmount)>0)
							{
						pr.setDueAmount(dueAmount);
						pr.setEmail(g.getEmail());
						pr.setGuestId(g.getId());
						pr.setName(g.getFirstName());
						EmailResponse parRes = template.postForObject(url, pr, EmailResponse.class);
						EmailResponse er=new EmailResponse();
						er.setStatus(parRes.isStatus()) ;
						er.setMessage(parRes.getMessage());
						
			 			//getList.add(pr);
						getRes.add(er);
					  System.out.println(getList); 
							}

				}
			});
			
			return new ResponseEntity(getRes,HttpStatus.OK);
		}
		else {
			return new ResponseEntity("Nodue",HttpStatus.OK);
		}
	}

	public double calculateDueAmount(String id)
	{
		String url="http://paymentService/payment/getCountOfPaymentAmount/";
	    double dueAmount=0;			
		PaymentRemainderData data=template.getForObject(url+id,PaymentRemainderData.class);
		double amountPaidCount=data.getTotalAmountPaid();
		double refundAmountCount=data.getTotalRefundAmount();
		
		//getGuest detailes by guestid
		Guest getGuest=repository.findById(id);
		if(getGuest.getGuestStatus().equalsIgnoreCase("Active"))
		{
			//get current date
			LocalDate now=LocalDate.now();
			System.out.println("current"+now);

			//convert checkin date type to util date to compare dates=>converted sql date to local date 
			Date  s=getGuest.getCheckInDate();
			LocalDate localDate1 = s.toLocalDate();
			System.out.println("date"+s);

//			LocalDate local = s.toInstant()
//	                  .atZone(ZoneId.systemDefault())
//	                  .toLocalDate();
//			System.out.println("Local"+local);
			//compare 2 dates
//			Period p=Period.between(now, local);
//			System.out.println("period"+p);
//			int diff=p.getDays();
//			System.out.println("diff"+diff);
//			LocalDate date = LocalDate.ofInstant(getGuest.getCheckInDate().toInstant(), ZoneId.systemDefault());
			
			double  c=(int) ChronoUnit.DAYS.between(localDate1, now)+1;
			System.out.println("c"+c);

			if(c>30)
			{
				 double calcDays=Math.ceil(c/30);
					System.out.println("calcDays"+calcDays);
				 int round_up =  (int) calcDays ;				 
					System.out.println("round_up  😁😁"+round_up);

				 double countdueAmount=((round_up*getGuest.getDefaultRent()+getGuest.getSecurityDeposit()))-amountPaidCount+refundAmountCount;	
				 double totalAmount =  Math.ceil(countdueAmount);
				 dueAmount=totalAmount;
				 return dueAmount;
			}
			else {
				return dueAmount;
			}
		}
		else if(getGuest.getGuestStatus().equalsIgnoreCase("inNotice")){
			
			java.util.Date s=getGuest.getCheckInDate();
			java.util.Date m=getGuest.getPlannedCheckOutDate();
			//m  = date.toInstant();
			System.out.println("date"+s);
			System.out.println("m"+m);


//			LocalDate checkIn = s.toInstant()
//	                  .atZone(ZoneId.systemDefault())
//	                  .toLocalDate();
//			System.out.println("checkIn"+checkIn);
			LocalDate now=LocalDate.now();
			Date  checkIn=getGuest.getCheckInDate();
			LocalDate localDate1 = checkIn.toLocalDate();

			LocalDate plannedCheckOut = m.toInstant()
	                  .atZone(ZoneId.systemDefault())
	                  .toLocalDate();
			System.out.println("plannedCheckOut"+plannedCheckOut);

			double  diff=(int) ChronoUnit.DAYS.between(localDate1, plannedCheckOut);
			System.out.println("diff"+diff);		
				 double perDayCharge=(getGuest.getDefaultRent()/30);
					System.out.println("perDayCharge"+perDayCharge);
				 //int round_up =  (int) calcDays ;
				 
					//System.out.println("round_up  😁😁"+round_up);

				 double countdueAmount=((diff*perDayCharge))-amountPaidCount+refundAmountCount;	
				 double totalAmount =  Math.round(countdueAmount);
				 dueAmount=totalAmount;
					System.out.println("dueAmount"+dueAmount);

				 return dueAmount;
			}
		return dueAmount;

		}

	public ResponseEntity duesGuestsList(int buildingId) {

		// String url="http://emailService/mail/sendPaymentRemainder/";
		List<DueGuestsList> getList = new ArrayList();

		if (buildingId == 0) {
			List<Guest> getGuest = repository.findAll();
			System.out.println("List:" + getGuest);

			if (!getGuest.isEmpty()) {
				getGuest.forEach(g -> {
					String ss = g.getOccupancyType();
					boolean s = "Regular".contentEquals(ss);
					System.out.println("s" + s);
					if (s == true) {
						DueGuestsList pr = new DueGuestsList();

						double dueAmount = calculateDueAmount(g.getId());
						System.out.println(dueAmount);
						if ((dueAmount) > 0) {
							pr.setDueAmount(dueAmount);
							pr.setEmail(g.getEmail());
							pr.setGuestId(g.getId());
							pr.setGuestName(g.getFirstName() + g.getLastName());
							pr.setPhoneNumber(g.getPersonalNumber());
							pr.setBedId(g.getBedId());
							String name = template.getForObject(
									"http://bedService/bed/getBuildingNameByBuildingId/" + g.getBuildingId(),
									String.class);

							pr.setBuildingName(name);

							// PaymentRemainder parRes = template.postForObject(url, pr,
							// PaymentRemainder.class);
							getList.add(pr);

							System.out.println(getList);
						}

					}
				});

				return new ResponseEntity(getList, HttpStatus.OK);
			} else {
				return new ResponseEntity(getList, HttpStatus.OK);
			}
		} else {
			List<Guest> getGuest = repository.getByBuildingId(buildingId);
			System.out.println("List:" + getGuest);

			if (!getGuest.isEmpty()) {
				getGuest.forEach(g -> {
					String ss = g.getOccupancyType();
					boolean s = "Regular".contentEquals(ss);
					System.out.println("s" + s);
					if (s == true) {
						DueGuestsList pr = new DueGuestsList();

						double dueAmount = calculateDueAmount(g.getId());
						System.out.println(dueAmount);
						if ((dueAmount) > 0) {
							pr.setDueAmount(dueAmount);
							pr.setEmail(g.getEmail());
							pr.setGuestId(g.getId());
							pr.setGuestName(g.getFirstName() + g.getLastName());
							pr.setPhoneNumber(g.getPersonalNumber());
							pr.setBedId(g.getBedId());
							String name = template.getForObject(
									"http://bedService/bed/getBuildingNameByBuildingId/" + g.getBuildingId(),
									String.class);

							pr.setBuildingName(name);

							// PaymentRemainder parRes = template.postForObject(url, pr,
							// PaymentRemainder.class);
							getList.add(pr);

							System.out.println(getList);
						}

					}
				});

				return new ResponseEntity(getList, HttpStatus.OK);
			} else {
				return new ResponseEntity(getList, HttpStatus.OK);

			}
		}

	}

	@Override
	public ResponseEntity getGuestData(int buildingId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<RatesConfig> getByBuildingId(int buildingId) {
		// TODO Auto-generated method stub
		return rconfig.findByBuildingId(buildingId);
	}

//	@Override
//	public double updateRoomRent(RatedDto Rdto, int id) {
//		// TODO Auto-generated method stub
//		try {
//			RatesConfig r = rconfig.getById(id);
//			r.setPrice(Rdto.getPrice());
//			RatesConfig rc=rconfig.save(r);
//			Guest guest=repository.findByPackageId(id);
//			guest.setDefaultRent(r.getPrice());
//			return rconfig.save(guest.getDefaultRent());
//		}catch(Exception e)
//		{
//			return null;
//		}
	

//	}

	@Override
	public List<RatesConfig> findByBuildingIdAndOccupancyType(int buildingId, String occupancyType) {
		// TODO Auto-generated method stub
		return rconfig.findByBuildingIdAndOccupancyType(buildingId, occupancyType);
	}

	@Override
	public List<RatesConfig> findByOccupancyType(String occupancyType) {
		// TODO Auto-generated method stub
		return rconfig.findByOccupancyType(occupancyType);
	}

	@Override
    public ResponseEntity updateGuestDetails(UpdateGuestDetails editGuest, String id) {
        // TODO Auto-generated method stub
        Guest guest = repository.findById(id);
//        if(guest.getAadharNumber()== null || guest.getEmail()== null || guest.getPersonalNumber()==null || guest.getCity()==null || guest.getState()==null ) {
//            if(guest.getAddressLine1()==null || guest.getAddressLine2()==null || guest.getBloodGroup() ==null || guest.getPincode()==null || guest.getFatherNumber()==null) {


             {
                guest.setId(id);

            guest.setFirstName(editGuest.getLastName());
            guest.setLastName(editGuest.getLastName());
            guest.setEmail(editGuest.getEmail());
            guest.setPersonalNumber(editGuest.getPersonalNumber());
            guest.setAadharNumber(editGuest.getAadharNumber());
            guest.setAddressLine1(editGuest.getAddressLine1());
            guest.setDateOfBirth(editGuest.getDateOfBirth());
            guest.setGender(editGuest.getGender());

            guest.setPincode(editGuest.getPincode());
            guest.setState(editGuest.getState());
            guest.setCity(editGuest.getCity());

            return new ResponseEntity(repository.save(guest), HttpStatus.OK);
        }
           
//        return new ResponseEntity( "Cant update", HttpStatus.OK);      
    }
	
	@Override
	public ResponseEntity GuestCheckoutBody(InitiateCheckoutByGuestId gcb ,String id) {
		 String mailUri="http://emailService/mail/sentInitiatingCheckOutRemainder/";
		
		try {
			Guest guest = repository.findById(id);	
			guest.setId(id);
			guest.setNoticeDate(gcb.getNoticeDate());
			guest.setPlannedCheckOutDate(gcb.getPlannedCheckOutDate());
			guest.setOccupancyType(gcb.getOccupancyType());
			guest.setGuestStatus("InNotice");
		//	guest.setCheckOutDate(gcb.getPlannedCheckOutDate());
			repository.save(guest);
			
			//dueService.calculateDueForInNotice(id);
			
			InitiatingCheckOut mail= new InitiatingCheckOut();
	           mail.setName(guest.getFirstName()+guest.getLastName());
	           mail.setNoticeDate(guest.getNoticeDate());
	           mail.setPlannedCheckOutDate(guest.getPlannedCheckOutDate());
	           String name=template.getForObject("http://bedService/bed/getBuildingNameByBuildingId/"+ guest.getBuildingId(), String.class);
	           mail.setBuildingName(name);
	           mail.setBedId(guest.getBedId());
	           mail.setEmail(guest.getEmail());
	           InitiatingCheckOut res = template.postForObject(mailUri, mail, InitiatingCheckOut.class);


		return new ResponseEntity ("Checkout intiated successfully" , HttpStatus.OK);
		}
		catch(Exception e)
		{
			return new ResponseEntity (e.getMessage() , HttpStatus.OK);

		}
		
		
//		UpdateGuestStatusAfterInitiateCheckout upGstStatus = new UpdateGuestStatusAfterInitiateCheckout();
//		
//		guest.setId(id);
//		upGstStatus.setGuestStatus("InNotice");
		
		
		
		
		
	}

	@Override
	public RatesConfig updateRoomRent(RatedDto Rdto, int id) {
		// TODO Auto-generated method stub
		return null;
	}

	
	
}
