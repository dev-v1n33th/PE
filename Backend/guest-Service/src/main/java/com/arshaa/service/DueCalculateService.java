package com.arshaa.service;

import java.sql.Date;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.arshaa.common.CheckoutResponse;
import com.arshaa.common.InitiatingCheckOut;
import com.arshaa.common.PaymentRemainderData;
import com.arshaa.dtos.CheckOutConfirmation;
import com.arshaa.entity.Defaults;
import com.arshaa.entity.Guest;
import com.arshaa.model.DueResponse;
import com.arshaa.model.EmailResponse;
import com.arshaa.model.PaymentRemainder;
import com.arshaa.repository.GuestRepository;
import com.arshaa.repository.RatesConfigRepository;
import com.arshaa.repository.SecurityDepositRepo;

@Service
public class DueCalculateService {

	@Autowired
	@Lazy
	private RestTemplate template;
	
	@Autowired(required = true)
	private GuestRepository repository;
	
	@Autowired
	private SecurityDepositRepo sceurityR ;
	
	@Autowired
	private RatesConfigRepository rcr;
	public double calculateDueGuest(String guestId)
	{
		//getGuest detailes by guestid
		    Guest getGuest=repository.findById(guestId);
		    // take amount paid or refund from the LBGD
//			String url="http://paymentService/payment/getCountOfPaymentAmount/";
			
			
			//Global Variables
			double previousDue=getGuest.getDueAmount();
			
		    double dueAmount;			
//			PaymentRemainderData data=template.getForObject(url+getGuest.getLastBillGenerationDate()+"/"+guestId,PaymentRemainderData.class);
//			double amountPaidCount=data.getTotalAmountPaid();
//			double refundAmountCount=data.getTotalRefundAmount();
			double securityDeposit;
			double amountPaid;
			double guestDue;
			double refundAmount;

			
			if((getGuest.getLastBillGenerationDate()).compareTo(getGuest.getCheckInDate())==0)
			{
				 securityDeposit=getGuest.getSecurityDeposit();
				 amountPaid=getGuest.getAmountPaid();
			}
			else {
				 securityDeposit=0;
				 amountPaid=0;
			}

			if(getGuest.getGuestStatus().equalsIgnoreCase("Active"))
			{		
				/*    ======= Normal Due Calculation ===============
				 step1: take last bill generation date and securityDeposit at oneTime
				 step2: take current date
				 step3: get difference of those two dates
				 step4: if(diff==30) take multiple of 30 as dueDays
				 step5: calculateRent=dueDays* defaultRent  | NOTE: update defaultRent whenever new Rent Updated By uniq rentId  |
				 step6:countdueAmount=(calculateRent+securityDeposit)-amountPaidCount+refundAmountCount 
				                                        | NOTE: take amountPaidSum and refundAmountSum from (LBGD TO NOW) |
				 step7:ceil it and assign it to dueAmount
				 step8:update dueAmount column, generate LBGD and update it in guest table and payments table                                       
				 */
				
				Date  lastBillGenerationDate=getGuest.getLastBillGenerationDate();
				//Sql Date to Local date .
//				LocalDate local = lastBillGenerationDate.toInstant()
//	                  .atZone(ZoneId.systemDefault())
//		                  .toLocalDate();
//				System.out.println("Local"+local);
				
				//Commented on 28 july
			LocalDate currentDate=LocalDate.now();
				
				//Dont Examine my patience here please	👏🤲🤝.
			
//			LocalDate currentDate =LocalDate.of(2022, 8, 29); 
			//Local Date to Sql Date .
				Date date = Date.valueOf(currentDate); // Magic happens here!
			
				// converting sql date to local date for calculation
				LocalDate convertedLBGD = lastBillGenerationDate.toLocalDate();
				System.out.println("convertedLBGD"+convertedLBGD);
				double  differeneceDays=(int) ChronoUnit.DAYS.between(convertedLBGD, currentDate)+1;
				//Have patience
				
				if(differeneceDays>=30)
				{
					 double multipleOf30Days=Math.ceil(differeneceDays/30);
					 System.out.println(  "multipleOf30Days"+ multipleOf30Days);
					 int dueDays =  (int) multipleOf30Days ;
					 System.out.println(  "dueDays"+ dueDays);
					 
					 //Generating last bill generation date   and bill generated till according to the cycles
			           	java.util.Date lastBillGen = lastBillGenerationDate;
			               Calendar cal = Calendar.getInstance();  
			               cal.setTime(lastBillGen);  
			               cal.add(Calendar.MONTH,dueDays-1 ); 
			               lastBillGen = cal.getTime();   
			               System.out.println(lastBillGen);
			              //Converting Java Util to Java Sql Date .
			              java.sql.Date convertedlastBillGen =new java.sql.Date(lastBillGen.getTime())	;
			              
			           	java.util.Date billGeneratedTill = lastBillGenerationDate;
			               Calendar cal2 = Calendar.getInstance();  
			               cal.setTime(billGeneratedTill);  
			               cal.add(Calendar.MONTH,dueDays ); 
			               billGeneratedTill = cal.getTime();   
			              //Converting Java Util to Java Sql Date .
			              java.sql.Date convertedbillGeneratedTill =new java.sql.Date(billGeneratedTill.getTime())	;
			              
			              
			              
                     double calculateRent=dueDays*getGuest.getDefaultRent();
                     System.out.println(calculateRent);
					 double countdueAmount=calculateRent+securityDeposit-amountPaid;	
					 double totalAmount =  Math.ceil(countdueAmount);
				//	 dueAmount=previousDue + totalAmount;
					 dueAmount = previousDue + totalAmount ;
					 getGuest.setDueAmount(dueAmount);
					 getGuest.setLastBillGenerationDate(convertedlastBillGen);
					 getGuest.setBillGeneratedTill(convertedbillGeneratedTill);
					 repository.save(getGuest);
					 return dueAmount;
				}
				else  {
					return previousDue;
				}
			}
//			else if(getGuest.getGuestStatus().equalsIgnoreCase("InNotice")){
//				
//				/* ===========InNotice Due Calculation ===============
//				 step1: take dueAmount and Assign it to previousDue
//				 step2: take lastBillGenerationDate and plannedCheckoutDate
//				 step3: get difference of those two dates  dayDiffer
//				 step4: if(dayDiffer>30)=>calculate GuestDue Amount	| Guest need to pay |
//				             step1: take remaining days
//				             
//				             step2: calculate per day charge
//				             step3: calculate remaining days charge==>	calculateDue
//				             step4:	calculateGuestDue==> ((previousDue+calculateDue)-getGuest.getSecurityDeposit())-amountPaidCount+refundAmountCount;
//	                                                                    | NOTE: take amountPaidSum and refundAmountSum from (LBGD TO NOW) |        
//	                          step5:  if guestDue in negative that means we need to refund 
//	                          step6: finally returning value is refund send it in negative format for UI or send it to positive
//	                step5:if(dayDiffer<30) ==>calculate Refund amount     | Guest need to refund  |   
//	                step6:if(  dayDiffer==30  )==> find is there any due or else refund                                              
//				 
//				 */
//				
//				//Step 2:
//				Date lastBillGenerationDate=getGuest.getLastBillGenerationDate();
//				java.util.Date plannedCheckoutDate=getGuest.getPlannedCheckOutDate();
//				
//				// converting sql date to local date for calculation
//				LocalDate convertedLBGD = lastBillGenerationDate.toLocalDate();
//				
//				LocalDate plannedCheckOut = plannedCheckoutDate.toInstant()
//		                  .atZone(ZoneId.systemDefault())
//		                  .toLocalDate();
//				
//				//Step 3:
//                //Get difference
//				double  dayDiffer=(int) ChronoUnit.DAYS.between(convertedLBGD, plannedCheckOut);
//				
//				//Step 4:
//				if(dayDiffer>30)
//				{
//					guestDue=0;
//					double getRemainDays=dayDiffer-30;
//					//to get perday charge
//					double perDayCharge=(getGuest.getDefaultRent()/30);
//					// calculate remaining days charge
//					double calculateDue=getRemainDays*perDayCharge;
//					 double calculateGuestDue=(previousDue+calculateDue)-getGuest.getSecurityDeposit();
//					 if(calculateGuestDue<0)
//					 {
//						 //if guest due in negative we need to refund
//						 refundAmount=-1* (calculateGuestDue);
//						 dueAmount=-refundAmount;
//							getGuest.setDueAmount(dueAmount);
//							 repository.save(getGuest);
//						 return dueAmount;
//					 }else {
//						 guestDue=calculateGuestDue;
//						 dueAmount=guestDue;
//							getGuest.setDueAmount(dueAmount);
//							 repository.save(getGuest);
//						 return dueAmount;
//					 }
//                     
//				}
//				else if(dayDiffer<30)//         Refund amount calculation
//				{
//					double getRemainDays=30-dayDiffer;
//					//to get perday charge
//					double perDayCharge=(getGuest.getDefaultRent()/30);
//					// calculate remaining days charge
//					double calculateRefund=getRemainDays*perDayCharge;
//					double calculateGuestRefund=((calculateRefund-previousDue)+getGuest.getSecurityDeposit());
//					if(calculateGuestRefund<0)
//					{
//						//if refund amount in negative guest need to pay
//						guestDue=-1*(calculateGuestRefund);
//						dueAmount=guestDue;
//						getGuest.setDueAmount(dueAmount);
//						 repository.save(getGuest);
//						return dueAmount;
//					}
//					else {
//						refundAmount=calculateGuestRefund;
//						dueAmount=-refundAmount;    //  -------while returning this if it refund amount converting into negative format else if it is due sending i  positive for UI
//						getGuest.setDueAmount(dueAmount);
//						 repository.save(getGuest);
//						return dueAmount;
//					}
//						
//				}
//				else                      //         Find Due which is guest need to pay or we need to refund
//				{
//					double calculateDue=previousDue;
//					if(calculateDue<0)
//					{
//						refundAmount=-1*(calculateDue);
//						dueAmount=-refundAmount;
//						getGuest.setDueAmount(dueAmount);
//						 repository.save(getGuest);
//						return dueAmount;
//					}
//					else {
//						guestDue=calculateDue;
//						dueAmount=guestDue;
//						getGuest.setDueAmount(dueAmount);
//						 repository.save(getGuest);
//						return dueAmount;
//					}
//				}
//			}
			return previousDue;	
		
	}
	
	
	// Update Due
	
	public ResponseEntity updateGuestDue()
	{
		{
		//	String url="http://emailService/mail/sendPaymentRemainder/";
			List<PaymentRemainder> getList=new ArrayList();
			List<EmailResponse> getRes=new ArrayList<>();
			List<Guest> getGuest=repository.findAll();
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

						double dueAmount=calculateDueGuest(g.getId());
						System.out.println(dueAmount);
						if((dueAmount)>0)
								{
//							pr.setDueAmount(dueAmount);
//							pr.setEmail(g.getEmail());
//							pr.setGuestId(g.getId());
//							pr.setName(g.getFirstName());
//							EmailResponse parRes = template.postForObject(url, pr, EmailResponse.class);
//							EmailResponse er=new EmailResponse();
//							er.setStatus(parRes.isStatus()) ;
//							er.setMessage(parRes.getMessage());
							
				 			getList.add(pr);
//							getRes.add(er);
						  System.out.println(getList); 
								}
					}
				});
				
				return new ResponseEntity(getList,HttpStatus.OK);
			}
			else {
				return new ResponseEntity("Nodue",HttpStatus.OK);
			}
		}
	}
	
	/*
	 cron=(" *                  *            *           *            *                 *  ")
	           seconds   minutes  hours    days    months       years
	           
	          -------- while running this cron job please be patience----------
	 */	
//	  @Scheduled(cron = "30 * * * * *")  
//	     public void addDue() {	    	
//		  updateGuestDue();
//	    	System.out.println("updating due....");
//	  }
	
	
	public ResponseEntity updateDueAmount(double amountPaid, double refundAmount,String guestId)
	{			
		DueResponse dRes=new DueResponse();
		try {
			Guest getGuest=repository.findById(guestId);
			double previousDue=getGuest.getDueAmount();
			double updateDue=previousDue-amountPaid+refundAmount;
			if(getGuest.getCheckInDate().equals(getGuest.getLastBillGenerationDate())) {
				dRes.setStatus(false);
				dRes.setMessage("Not needed");
				return new ResponseEntity(dRes,HttpStatus.OK);
		}
			else {
				getGuest.setDueAmount(updateDue);
				repository.save(getGuest);
						dRes.setStatus(true);
						dRes.setMessage("Due updated Successfully");
						return new ResponseEntity(dRes,HttpStatus.OK);
			}
		}
		catch(Exception e)
		{
			dRes.setStatus(false);
			dRes.setMessage("Something went wrong");
			return new ResponseEntity(dRes,HttpStatus.OK);
		}
	
	}
	
	//Dont Examine my patience here please	
	
	public ResponseEntity calculateDueForInNotice(String id) {
		
//		String url="http://paymentService/payment/getCountOfPaymentAmount/";
	    double dueAmount=0;	
	    double refundAmount=0;
//		PaymentRemainderData data=template.getForObject(url+id,PaymentRemainderData.class);
//		double amountPaidCount=data.getTotalAmountPaid();
//		double refundAmountCount=data.getTotalRefundAmount();
		Guest guest  = repository.findById(id);	
		
		Defaults def=  sceurityR.findByOccupancyType(guest.getOccupancyType());
		if(guest.getGuestStatus().equalsIgnoreCase("InNotice")  &&  guest.getOccupancyType().equalsIgnoreCase("Regular")) {
		
			java.util.Date plannedCheckedDate = guest.getPlannedCheckOutDate();
			java.util.Date billGeneratedTillDate=guest.getBillGeneratedTill();
			
			 java.sql.Date sqlBillGeneratedTill = new java.sql.Date(billGeneratedTillDate.getTime());
			
			//Commented on 28 july
			LocalDate datePlanned = plannedCheckedDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
		LocalDate currentDate=LocalDate.now();	
			//Dont Examine my patience here please	.
		 java.sql.Date sqlPlannedCheckOut = new java.sql.Date(plannedCheckedDate.getTime());
		//LocalDate currentDate =LocalDate.of(2022, 8, 29);        //Local Date to Sql Date .
			Date date = Date.valueOf(currentDate); // Magic happens here!
			// converting sql date to local date for calculation
		//	LocalDate convertedPaidTill=paidTillDate.toLocalDate();
			
			LocalDate convertedBillGeneratedTillDate=sqlBillGeneratedTill.toLocalDate();
		double differeneceDays;
			double  differenece=(int) ChronoUnit.DAYS.between(convertedBillGeneratedTillDate, datePlanned);
			if(differenece<0)
			{
				differeneceDays=-1*differenece;
			}
			else {
				differeneceDays=differenece;
			}
			System.out.println("Days"+differeneceDays);
			if(convertedBillGeneratedTillDate.isBefore(datePlanned)) {
				
				//Guest should pay or Refund will see later
				double  perDayCharge = (guest.getDefaultRent()/30);
				double thenDues = ((differeneceDays*perDayCharge));
				double dueCalculation=(thenDues+guest.getDueAmount())-guest.getSecurityDeposit()+def.getMaintainanceCharge();
				if(dueCalculation<0)
				{
					refundAmount=-1*dueCalculation;
					dueAmount=-refundAmount;
				}
				else {
					dueAmount=dueCalculation;
				}			
				Guest g=repository.findById(id);	;
				g.setDueAmount(dueAmount);
				g.setInNoticeDue(dueAmount);
		
				repository.save(g);
				return new ResponseEntity(dueAmount,HttpStatus.OK);
				
			}else if(convertedBillGeneratedTillDate.isAfter(datePlanned)) {
				double  perDayCharge = (guest.getDefaultRent()/30);
				//Definitely Refund 
				double thoDues =  ((differeneceDays*perDayCharge));
				System.out.println(thoDues);
				double refundCalculation=(thoDues-def.getMaintainanceCharge()+guest.getSecurityDeposit())-guest.getDueAmount();
				System.out.println( "Maintenance charge"+def.getMaintainanceCharge());
				System.out.println(refundCalculation);
				if(refundCalculation<0)
				{
					dueAmount=-1*refundCalculation;
				}
				else {
					refundAmount=refundCalculation;
					dueAmount=-refundAmount;
				}
				Guest g=repository.findById(id);	;
				g.setDueAmount(dueAmount);
				g.setInNoticeDue(dueAmount);

				repository.save(g);
				return new ResponseEntity(dueAmount,HttpStatus.OK);
				
			}else if(convertedBillGeneratedTillDate.isEqual(datePlanned)) {
				//Definietly Refund
				
				double refundCalculation=guest.getSecurityDeposit()-guest.getDueAmount()-def.getMaintainanceCharge();
				if(refundCalculation<0)
				{
					dueAmount=-1*refundCalculation;
				}
				else {
					refundAmount=refundCalculation;
					dueAmount=-refundAmount;
				}
				Guest g=repository.findById(id);	;
				g.setDueAmount(dueAmount);
				g.setInNoticeDue(dueAmount);
				repository.save(g);
				return new ResponseEntity(dueAmount,HttpStatus.OK);
//				if(guest.getDueAmount()==0) {
//					double  perDayCharge = (guest.getDefaultRent()/30);
//					//Definitely Refund 
//					double thoDues =  ((differeneceDays*perDayCharge))-guest.getDueAmount()+guest.getSecurityDeposit() ;
//					return new ResponseEntity(thoDues,HttpStatus.OK);
//					
//				}
				
			}
		}
		return null;
	}
	
	
	public ResponseEntity finishCheckOutClick(String guestId)
	{
		String bedURL="http://bedService/bed/updateCheckOutBed/";
		String maila ="http://emailService/mail/guestCheckOutNotification/";
		CheckoutResponse checkoutRes=new CheckoutResponse();
		try {
			Guest getGuest=repository.findById(guestId);
			Date currentDate = Date.valueOf(LocalDate.now());
            System.out.println("local date"+currentDate);
            String vacatedStatus="VACATED";
            getGuest.setGuestStatus(vacatedStatus);
            getGuest.setCheckOutDate(currentDate);
            CheckoutResponse cRes= template.getForObject(bedURL+getGuest.getBedId(), CheckoutResponse.class);
            if(cRes.isStatus()==true)
            {
            	repository.save(getGuest);
            	
           // 	Guest getGuest=repository.findById(guestId);
            	CheckOutConfirmation mail= new CheckOutConfirmation();
 	           mail.setName(getGuest.getFirstName()+getGuest.getLastName());
 	           mail.setNoticeDate(getGuest.getNoticeDate());
 	           mail.setCheckOutDate(getGuest.getCheckOutDate());
 	           String name=template.getForObject("http://bedService/bed/getBuildingNameByBuildingId/"+ getGuest.getBuildingId(), String.class);
 	           mail.setBuildingName(name);
 	           mail.setBedId(getGuest.getBedId());
 	           mail.setEmail(getGuest.getEmail());
 	          CheckOutConfirmation res = template.postForObject(maila, mail, CheckOutConfirmation.class);



            	
         
            	return new ResponseEntity(checkoutRes,HttpStatus.OK);
            }
            else if(cRes.isStatus()==false) {
            	checkoutRes.setStatus(false);
            	checkoutRes.setMessage(cRes.getMessage());
            	return new ResponseEntity(checkoutRes,HttpStatus.OK);
            }
            else {
            	checkoutRes.setStatus(false);
            	checkoutRes.setMessage("Something went wrong");
            	return new ResponseEntity(checkoutRes,HttpStatus.OK);
            }
		}
		catch (Exception e) {
			checkoutRes.setStatus(false);
        	checkoutRes.setMessage("Something went wrong");
        	return new ResponseEntity(checkoutRes,HttpStatus.OK);
		}
	}
	
	
	public ResponseEntity clearDueAmount()
	{
		String url="http://paymentService/payment/getCountOfPaymentAmount/";
		
		List<Guest> getGuest=repository.findAll();
		  System.out.println("List:"+getGuest); 

		if(!getGuest.isEmpty())
		{
			getGuest.forEach(g->{
				String ss = g.getOccupancyType() ;
			boolean s=	"Regular".contentEquals(ss);
			System.out.println("s"  + s);
				if(g.getGuestStatus().equalsIgnoreCase("Regular") && g.getOccupancyType().equalsIgnoreCase("active"))
				{

					PaymentRemainderData data=template.getForObject(url+g.getId(),PaymentRemainderData.class);
					double amountPaidCount=data.getTotalAmountPaid();
					double refundAmountCount=data.getTotalRefundAmount();
					double dueAmount=g.getDueAmount();
					double calculateDue=dueAmount+g.getAmountPaid()-amountPaidCount+refundAmountCount;
					Guest guest=repository.findById(g.getId());
					guest.setDueAmount(calculateDue);
					repository.save(guest);
					
				}
			});
			
			return new ResponseEntity("Success",HttpStatus.OK);
		}
		else {
			return new ResponseEntity("No due",HttpStatus.OK);
		}
		}
	
	
	public ResponseEntity updatePackageIdInGuest()
	{
		String bURL="http://bedService/bed/getStatusByGuestId/";
		try {
			List<Guest>getAll=repository.findAll();
			if(!getAll.isEmpty())
			{
				getAll.forEach(g->{
					if(g.getGuestStatus().equalsIgnoreCase("Regular") && g.getOccupancyType().equalsIgnoreCase("active"))
					{
						Guest guest=repository.findById(g.getId());
						String bedStatus=template.getForObject(bURL+g.getId(),String.class);
						int packageId=rcr.findByBuildingIdAndOccupancyTypeAndPriceAndRoomType(g.getBuildingId(),g.getOccupancyType(),g.getDefaultRent(),bedStatus).getId();
						guest.setPackageId(packageId);
						repository.save(guest);
					}
					
				});
				return new ResponseEntity("Success",HttpStatus.OK);
			}
			else {
				return new ResponseEntity("DATA NOT FOUND",HttpStatus.OK);
			}
		}
		catch(Exception e)
		{
			return new ResponseEntity(e.getMessage(),HttpStatus.OK);
		}
	}
	
}
