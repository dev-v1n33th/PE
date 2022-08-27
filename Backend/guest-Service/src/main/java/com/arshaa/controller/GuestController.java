package com.arshaa.controller;

import com.arshaa.common.Bed;
import com.arshaa.common.GuestModel;
import com.arshaa.common.InitiateCheckoutByGuestId;
import com.arshaa.common.UpdateGuestDetails;
import com.arshaa.dtos.GuestDto;
import com.arshaa.dtos.RatedDto;
import com.arshaa.entity.Guest;
import com.arshaa.entity.GuestProfile;
import com.arshaa.entity.Notes;
import com.arshaa.entity.RatesConfig;
import com.arshaa.entity.SecurityDeposit;
import com.arshaa.entity.Defaults;
import com.arshaa.model.DueGuestsList;
import com.arshaa.model.EmailTempModel;
import com.arshaa.model.GuestImageDisplay;
import com.arshaa.model.GuestsInNotice;
import com.arshaa.model.PreviousGuests;
import com.arshaa.model.Response;
import com.arshaa.model.ResponseFile;
import com.arshaa.model.ResponseMessage;
import com.arshaa.model.VacatedGuests;
import com.arshaa.repository.GuestRepository;
import com.arshaa.repository.RatesConfigRepository;
import com.arshaa.service.DueCalculateService;
import com.arshaa.service.GuestInterface;
import com.arshaa.service.GuestProfileService;
import com.arshaa.service.NotesService;
import com.arshaa.service.SecurityDepositService;
import com.arshaa.service.SetSecurityInterface;
import com.google.common.net.HttpHeaders;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.util.StreamUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@CrossOrigin("*")
@RestController
@RequestMapping("/guest")
public class GuestController {

	@Autowired
	@PersistenceContext
	private EntityManager em;

	@Autowired(required = true)
	private GuestRepository repository;

	@Autowired
	@Lazy
	private RestTemplate template;

	@Autowired(required = true)
	private GuestInterface service;
	@Autowired
	private GuestProfileService gpServe;
	@Autowired
	private SecurityDepositService securityDepositService;
	@Autowired
	private NotesService nServ;
	
	@Autowired
	private SetSecurityInterface sint ;
	
	@Autowired
	 private RatesConfigRepository rcr ;
	
	@Autowired
	private    DueCalculateService dueService;
	
	@GetMapping("/getDuesCalc")
	public ResponseEntity checkDueOfGuest() {
	try {
		return new ResponseEntity(dueService.clearDueAmount(), HttpStatus.OK);
	}
	catch(Exception e) {
		return new ResponseEntity(e.getMessage(), HttpStatus.OK);
	}
	}
	
	
	@PostMapping("/initiatecheckoutbyguestid/{guestId}")
	public ResponseEntity initiateCheckOut(@RequestBody InitiateCheckoutByGuestId gcb , @PathVariable String guestId) {
		Guest guest = new Guest();
		try {
			if(guest.getId()!= null) {
				return new ResponseEntity(service.GuestCheckoutBody(gcb , guestId) , HttpStatus.OK);
			}
		}
		catch(Exception e) {
			System.out.println("id not available" + e.getLocalizedMessage());
		}
		return new ResponseEntity(service.GuestCheckoutBody(gcb , guestId) , HttpStatus.OK);
		
	}
	
	@PutMapping("/editGuestDetails/{guestId}")
	public ResponseEntity editGuest(@RequestBody UpdateGuestDetails ud , @PathVariable String guestId) {
		Guest guest = new Guest();
		try {
		if(guest.getId()!=null) {
			return new ResponseEntity( service.updateGuestDetails(ud, guestId), HttpStatus.OK);
		}
		
		}catch(Exception e) {
			System.out.println("id not available" + e.getLocalizedMessage());
		}
		return new ResponseEntity( service.updateGuestDetails(ud, guestId), HttpStatus.OK);
	}
	//Posting Rates based on sharing 
	@PostMapping("/postRates")
	public RatesConfig saveRates(@RequestBody RatesConfig rates) {
		try {
			return rcr.save(rates);
		}catch(Exception e) {
		System.out.println("cant config Rents"+ e.getLocalizedMessage());
		}
		return null ;
	}
	
	//delete rents ;
	@DeleteMapping("/deleteRents/{id}")
     public void deleteRents(@PathVariable int id) {
		 rcr.deleteById(id);
	}
	
	@GetMapping("/getRatesByOccupancyType/{occupancyType}")
	public List<RatesConfig> findByOccupancyType(@PathVariable String occupancyType)
	{
		return service.findByOccupancyType(occupancyType);
	}
	
	
	
	// Guest Reports Sorted .
	@GetMapping("/getAllGuests/{field}")
	public List<GuestDto> getAllGuests(@PathVariable String field) {
		return service.getGuests(field);
	}
	
	@GetMapping("/getRatesByBuildingId/{buildingId}")
	public List<RatesConfig> getByBuildingId(@PathVariable int buildingId){
		return service.getByBuildingId(buildingId);
	};

	@GetMapping("/getRatesByBuildingId/{buildingId}/{occupancyType}")
	public List<RatesConfig> getByBuildingId(@PathVariable int buildingId, @PathVariable String occupancyType){
		return service.findByBuildingIdAndOccupancyType(buildingId, occupancyType);
	}
//	@GetMapping("/getRatesByOccupancyType/{occupancyType}")
//	public List<RatesConfig> findByOccupancyType(@PathVariable String occupancyType)
//	{
//		return service.findByOccupancyType(occupancyType);
//	}
	@PostMapping("/addGuest")
	public Guest saveGuest(@RequestBody Guest guest) {

		return service.addGuest(guest);

	}
	
	@PutMapping("/updateRoomRent/{id}")
	public RatesConfig updateRoomRents(@RequestBody RatedDto rdto , @PathVariable int id) {
		return this.service.updateRoomRent(rdto, id);
	}

	@PostMapping("/addPastGuest")
	public Guest addPostGuest(@RequestBody PreviousGuests guest) {
		return service.addPostGuest(guest);

	}

	@GetMapping("/getGuestByGuestId/{id}")
	public Guest getOneGuest(@PathVariable("id") String id) {
		return service.getGuestById(id);
	}

	@DeleteMapping("/deleteGuestByGuestId/{id}")
	public void delete(@PathVariable("id") String id) {
		service.deleteGuest(id);
	}

	@PutMapping("/updateDueAmount")
	public double updateDueAmount(@RequestBody Guest guest) {
		return service.updateGuest(guest);
	}

	// http://localhost:7000/guest/findDueAmount/{guestId}
	// FETCHING DUE AMOUNT BASED ON GUESTID .
	@GetMapping("/findDueAmount/{guestId}")
	public List<Guest> getByGuestId(@PathVariable String guestId) {
		return service.getByGuestId(guestId);

	}

	// http://localhost:7000/guest/getDueAmountOnDashBoard.
	// FETCHING OverAllDUE AMOUNT. .
	@GetMapping("/getDueAmountOnDashBoard")
	public List<Guest> getTotalDue() {
		return service.getTotalDue();

	}

	@GetMapping("/getGuestByBedId/{guestStatus}/{bedId}")
	public ResponseEntity<GuestModel> getGuestByBedIdAndGuestStatus(@PathVariable String guestStatus, String bedId) {
		GuestModel gm = new GuestModel();
		try {
			Guest guest = repository.getGuestBybedIdAndGuestStatus(bedId, guestStatus);
			if (guest.isGuestStatus().equalsIgnoreCase("active")
					|| guest.isGuestStatus().equalsIgnoreCase("inNotice")) {
				gm.setFirstName(guest.getFirstName());
				gm.setId(guest.getId());
				return new ResponseEntity(guest, HttpStatus.OK);
			}
			return new ResponseEntity("Guest is Inactive", HttpStatus.OK);
		} catch (Exception e) {
			// TODO: handle exception
			return new ResponseEntity(e.getMessage(), HttpStatus.OK);

		}
	}

	@GetMapping("/getPendingAndCompletedById/{buildingId}")
	public List<Guest> getPendingByBuildingId(@PathVariable int buildingId) {
		return service.getPendingByBuildingId(buildingId);
	}

//   	@GetMapping("/getFinalDueAmountForCheckout/{id}")
//   	public List<Guest> getCheckOutAmountByGuestId(@PathVariable String id){
//   	return service.getCheckOutAmountByGuestId(id);
//   	}

	@GetMapping("/get/{id}")
	public List<Guest> getCheckOutDate(@PathVariable String id) {
		return service.getCheckOutAmountByGuestId(id);
	}

	@GetMapping("/getFinalCheckout/{id}")
	public ResponseEntity finalCheckOutGuest(@PathVariable String id) {
		return new ResponseEntity( service.getFinalDueAmountById(id), HttpStatus.OK);
	}

	@GetMapping("/onClickDues/{id}")
	public List<Guest> getOnlyDues(@PathVariable String id) {
		return service.getOnlyDues(id);
	}

	@GetMapping("/findGuestAreVacated/{guestStatus}")
	public List<VacatedGuests> findByGuestStatus(@PathVariable String guestStatus) {

		return service.findByGuestStatus(guestStatus);
	}

	@GetMapping("/getTotalPaid/{id}")
	public List<Guest> getTotalPaidByGuestId(@PathVariable String id) {
		return this.service.getTotalPaidByGuestId(id);
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	@GetMapping("/getBedIdByGuestId/{id}")
	public ResponseEntity geeGuestBedByGuestId(@PathVariable String id) {
		Guest guest = repository.getBedIdById(id);
		return new ResponseEntity(guest.getBedId(), HttpStatus.OK);
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	@GetMapping("/getPhoneNumberByGuestId/{id}")
	public ResponseEntity getPersonalNumberById(@PathVariable String id) {
		Guest guest = repository.getPersonalNumberById(id);
		return new ResponseEntity(guest.getPersonalNumber(), HttpStatus.OK);
	}

	@SuppressWarnings("unchecked")
	@GetMapping("/getNameByGuestId/{id}")
	public ResponseEntity getGuestNumberById(@PathVariable String id) {
		Guest guest = repository.getNameById(id);
		return new ResponseEntity(guest.getFirstName().concat(" ").concat(guest.getLastName()), HttpStatus.OK);
	}
	
//	@GetMapping("/getBedIdByGuestId/{id}")
//	public ResponseEntity getBedIdByGuestId(@PathVariable String id)
//	{
//		Guest g=repository.getBedIdById(id);
//		return new ResponseEntity(g.getBedId(),HttpStatus.OK);
//	}

	@GetMapping("/getcheckInByGuestId/{id}")
	public ResponseEntity getcheckInByGuestId(@PathVariable String id)
	{
		Guest g=repository.findById(id);
		EmailTempModel em=new EmailTempModel();
		em.setCheckInDate(g.getCheckInDate());
		return new ResponseEntity(em,HttpStatus.OK);
	}

//   	@GetMapping("/guestReport")
//   	public List<Guest> getAllGuest(){
//		return this.service.getAllGuest();   		   		
//   		
//   	}

	// GuestProfile API's

	@PostMapping("/upload/{guestId}")
	public ResponseEntity<ResponseMessage> uploadFile(@PathVariable String guestId,
			@RequestParam("file") MultipartFile file) {
		String message = "";
		try {
			gpServe.store(file, guestId);
			message = "Uploaded the file successfully: " + file.getOriginalFilename();
			return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage(message));
		} catch (Exception e) {
			message = "Can't able to upload file" + file.getOriginalFilename();
			return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new ResponseMessage(message));
		}
	}
//	  @GetMapping("/files")
//	  public ResponseEntity<List<ResponseFile>> getListFiles() {
//	    List<ResponseFile> files = gpServe.getAllFiles().map(dbFile -> {
//	      String fileDownloadUri = ServletUriComponentsBuilder
//	          .fromCurrentContextPath()
//	          .path("/guest/")
//	          .path("/files/")
//	          .path(dbFile.getGuestId())
//	          .toUriString();
//	      return new ResponseFile(
//	          dbFile.getName(),
//	          fileDownloadUri,
//	          dbFile.getType(),
//	          dbFile.getData().length);
//	    }).collect(Collectors.toList());
//	    return ResponseEntity.status(HttpStatus.OK).body(files);
//	  }

//	  @GetMapping("/files/{id}")
//	  public ResponseEntity<byte[]> getFile(@PathVariable String id) {
//		  UploadFile fileDB = storageService.getFile(id);
//	    return ResponseEntity.ok()
//	        .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileDB.getName() + "\"")
//	        .body(fileDB.getData);
//	  }

	@GetMapping("/files/{guestId}")
	public ResponseEntity<ResponseFile> getFilebyID(@PathVariable String guestId) {
		Response r = new Response();

		try {
			GuestProfile fileDB = gpServe.getFileByID(guestId);
//			  String fileDownloadUri = ServletUriComponentsBuilder
////	          .fromCurrentContextPath()
////			          
////			          .path("localhost:8989/guest/")
////			          .path("/getImage/")
////			          .path(fileDB.getGuestId())
////			          .toUriString();
			ResponseFile file = new ResponseFile();
			file.setData(fileDB.getData());
			// file.setUrl("localhost:8989/guest/getImage/"+fileDB.getGuestId());
			file.setName(fileDB.getName());
			file.setType(fileDB.getType());
			file.setSize(fileDB.getData().length);
			// r.setData(file);
			return new ResponseEntity(file, HttpStatus.OK);

		} catch (Exception e) {
			r.setData(null);
			return new ResponseEntity(r, HttpStatus.OK);
		}
	}

	@GetMapping("/getImage/{id}")
	public ResponseEntity<byte[]> getFile(@PathVariable String id) {
		Response r = new Response();

		try {
			GuestProfile fileDB = gpServe.getFileByID(id);

			// r.setData(fileDB.getData());
			// GuestImageDisplay image= new GuestImageDisplay();
			// image.setData(fileDB.getData());
			return ResponseEntity.ok()
					.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileDB.getName() + "\"")
					.body(fileDB.getData());

			// ResponseEntity url= new ResponseEntity(fileDB.getData(),HttpStatus.OK);
			// r.setData(url);
			// StreamUtils.copy(fileDB.)
//			  r.setData(fileDB);
//			return new ResponseEntity(r,HttpStatus.OK);
		} catch (Exception e) {
			r.setData(null);
			return new ResponseEntity(r, HttpStatus.OK);

		}
	}

//	private ResponseEntity<byte[]> ResponseEntity(byte[] bs, HttpStatus ok) {
//		// TODO Auto-generated method stub
//		return new ResponseEntity(bs,HttpStatus.OK);
//	}
//

//	  @GetMapping("/filesData")
//	    public ResponseEntity<String[]> getListofFiles() {
//	    	UploadFile f=new UploadFile();
//	    	f.setName(FileUtil.folderPath);
//	    	
//	        return new  ResponseEntity(f,HttpStatus.OK);
//	  
//	    }

	// SecurityDeposit API's
	@PostMapping("/addSecurityDeposit")
	public ResponseEntity<Defaults> addData(@RequestBody Defaults sdepo) {

		return securityDepositService.addData(sdepo);

	}

	@GetMapping("/getSecurityDeposit")
	public ResponseEntity<List<Defaults>> getData() {
		return securityDepositService.getData();
	}

	@PutMapping("/updateSecurityDeposit/{id}")
	public ResponseEntity updateDataById(@PathVariable int id, @RequestBody Defaults sdepo) {
		return securityDepositService.updateDataById(id, sdepo);
	}

	@DeleteMapping("deleteSecurityDeposit/{id}")
	public ResponseEntity deleteDataById(@PathVariable int id) {
		return securityDepositService.deleteDataById(id);
	}

	// Get Security Deposit By Occupency Type API
	@GetMapping("/getSecurityDepositByOccupancyType/{occupancyType}")
	public ResponseEntity getSecurityDepositByOccupancyType(@PathVariable String occupancyType) {
		return securityDepositService.getSecurityDepositByOccupancyType(occupancyType);

	}

	// Api for Showing guest About to check Out .

	@GetMapping("/getGuestAboutToCheckOut/RegulatInNotice/Daily-Monthly-Active")
	public List<GuestsInNotice> getAll() {
		List<Guest> getList = repository.findByCheckOut();
		List<GuestsInNotice> gin = new ArrayList<>();

		// GuestsInNotice gs=new GuestsInNotice();
		getList.forEach(g -> {
			GuestsInNotice gs = new GuestsInNotice();
			gs.setBedId(g.getBedId());
			String name = template.getForObject(
					"http://bedService/bed/getBuildingNameByBuildingId/" + g.getBuildingId(), String.class);
			gs.setBuildingName(name);
			gs.setOccupancyType(g.getOccupancyType());
			gs.setPlannedCheckOutDate(g.getPlannedCheckOutDate());
			gs.setCheckInDate(g.getCheckInDate());
			
//			double  due = template.getForObject("http://guestService/guest/onClickDues/"+g.getId(), double.class);
//System.out.println(due);
//gs.setDueAmount(due);
			gs.setCheckOutDate(g.getCheckOutDate());
			gs.setEmail(g.getEmail());
			gs.setBedId(g.getBedId());
			gs.setFirstName(g.getFirstName().concat(" ".concat(g.getLastName())));
			gs.setPersonalNumber(g.getPersonalNumber());
			gs.setId(g.getId());
			gin.add(gs);
		});

		return gin;
	}

//	@GetMapping("/getGuestData/{buildingId}")
//	public ResponseEntity getGuestData(@PathVariable int buildingId) {
//		return service.getGuestData(buildingId);
//	}

@GetMapping("/paymentRemainder/{buildingId}")
public ResponseEntity paymentRemainder(@PathVariable int buildingId)
{
	return service.paymentRemainder(buildingId);
}
@GetMapping("/calculateDueAmount/{id}")
public double calculateDueAmount(@PathVariable String id)
{
	return service.calculateDueAmount(id);
}


@GetMapping("/dueGuestsList/{buildingId}")
public ResponseEntity dueGuestsList(@PathVariable int buildingId)
{
	return service.duesGuestsList(buildingId);
}

//@GetMapping("/getdueAllbuildings")
//public List<DueGuestsList> getDueForAll() {
//	return  pservices.getAll();
//}

@GetMapping("/getGuestsAllbuildings")
public List<Guest> getGuestsForAll() {
	return  repository.findAll();
}

//new changes

@GetMapping("/getEmailByGuestId/{id}")
public ResponseEntity getEmailById(@PathVariable String id) {
	Guest guest = repository.getEmailById(id);
	return new ResponseEntity(guest.getEmail(), HttpStatus.OK);
	
	
}
//-------------------SecurityDepositSetting apis ------------------
  @PostMapping("/setSecurityDeposit")
  public SecurityDeposit saveSecurityDeposit(@RequestBody  SecurityDeposit security) {
	  return this.sint.saveSecurityDeposit(security);
  }
  
  
  @GetMapping("/getAllconfiguredSecurityDeposit")
  public List<SecurityDeposit> getallSecuritydeposit(){
	  return sint.getallSecuritydeposit();
  }
  
  @PutMapping("/postUpdateSecurityDeposit/{id}")
  public SecurityDeposit  updateSecurityDeposit( @PathVariable  int id, @RequestBody SecurityDeposit sd){
	  return this.sint.updateSecurityDeposit(id, sd);
  }


//June 30 .
//@GetMapping("/paymentRemainder/{buildingId}")
//public ResponseEntity paymentRemainder(@PathVariable int buildingId) {
//	return service.paymentRemainder(buildingId);
//}
//
//@GetMapping("/calculateDueAmount/{id}")
//public double calculateDueAmount(@PathVariable String id) {
//	return service.calculateDueAmount(id);
//}



/*=================Notes Api's==============*/

@PostMapping("/addNotes")
public ResponseEntity addData(@RequestBody Notes notes) {
   return 	nServ.addData(notes);
}

@GetMapping("/getNotesByGuestId/{guestId}")
public ResponseEntity getNoteById(@PathVariable String guestId) {
   return nServ.getNoteById(guestId);
}

@GetMapping("/getAllRents/{occupancyType}/{buildingId}/{sharing}")
public ResponseEntity getAllRents(@PathVariable String occupancyType,@PathVariable int buildingId,@PathVariable int sharing)
{
	try {
		
   return service.getAllRents(occupancyType, buildingId, sharing);
	}catch(Exception e) {
		System.out.println("ABCD");
	}
	return null;
}



// Due related Api

@GetMapping("/calculateGuestDueByGuestId/{guestId}")
public double calculateDueGuest(@PathVariable String guestId) {
 return dueService.calculateDueGuest(guestId);
}


@GetMapping("/updateDueAmount/{amountPaid}/{refundAmount}/{guestId}")
public ResponseEntity updateDueAmount(@PathVariable double amountPaid,@PathVariable double refundAmount,@PathVariable String guestId)
{
    return dueService.updateDueAmount(amountPaid, refundAmount, guestId);
}

@GetMapping("/calculationForInnotice/{id}")
    public ResponseEntity calculateDueOnlyForInNoticeguy(@PathVariable String id) {
        return dueService.calculateDueForInNotice(id);
    }

@GetMapping("/finishCheckoutClick/{guestId}")
public ResponseEntity finishCheckOutClick(@PathVariable String guestId)
{
    return dueService.finishCheckOutClick(guestId);
}

@GetMapping("/updatePackageIdInGuest")
public ResponseEntity updatePackageIdInGuest()
{
	return dueService.updatePackageIdInGuest();
}
@GetMapping("/getRate/{buildingId}/{occupancyType}/{price}/{roomType}")
public ResponseEntity getpackageIdByAllTypes(@PathVariable int buildingId,@PathVariable String occupancyType,@PathVariable double price,@PathVariable String roomType ) {
 return new ResponseEntity( rcr.findByBuildingIdAndOccupancyTypeAndPriceAndRoomType(buildingId,occupancyType,price,roomType), HttpStatus.OK);
}
}
//	@GetMapping("/getGuestAboutToCheckOut/RegulatInNotice/Daily-Monthly-Active/{id}")
//	public List<GuestsInNotice> getAll(@PathVariable String id) {
//		try
//		{
//			
//		
//		List<Guest> getList = repository.findByCheckOut(id);
//		List<GuestsInNotice> gin = new ArrayList<>();
//
//		// GuestsInNotice gs=new GuestsInNotice();
//		getList.forEach(g -> {
//			GuestsInNotice<E> gs = new GuestsInNotice();
//			gs.setBedId(g.getBedId());
//			 String
//			 name=template.getForObject("http://bedService/bed/getBuildingNameByBuildingId/"+
//			 g.getBuildingId(), String.class);
//			 gs.setBuildingName(name);
// 
//// List<E>  listOfDues =(List<E>) template.getForObject("http://guestService/guest/onClickDues/" + gs.getId(),Guest.class);
//		
// gs.setDueAmount(em.createNamedStoredProcedureQuery("onlyDues").setParameter("GUEST__ID" , id).getResultList());
//
//			gs.setCheckOutDate(g.getCheckOutDate());
//			gs.setEmail(g.getEmail());
//			gs.setBedId(g.getBedId());
//			gs.setFirstName(g.getFirstName().concat(" ".concat(g.getLastName())));
//			gs.setPersonalNumber(g.getPersonalNumber());
//			gs.setId(g.getId());
//			gin.add(gs);
//		});
//		
//
//		return gin;
//		}
//		catch(Exception e){
//		System.out.println(e.getLocalizedMessage().concat("something is fishy"));
//			
//		}
//		return null;
//	}  
