package net.arshaa.rat.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import Models.AvailableBeds;

import Models.BedsCount;
import Models.BedsInfo;
import Models.BuildingId;
import Models.BuildingInfo;
import Models.BuildingModel;
import Models.BuildingSummary;
import Models.FloorNameAndId;
import Models.FloorsInfo;
import Models.NewBuildModel;
import Models.Response;
import Models.RoomDto;
import Models.RoomsInfo;
import Models.UpdateBedDto;
import common.Guest;
import common.GuestProfile;
import common.MonthluSumResponse;
import common.MonthlySummary;
import common.User;
import net.arshaa.rat.entity.Bed;
import net.arshaa.rat.entity.Buildings;
import net.arshaa.rat.entity.Floors;
import net.arshaa.rat.entity.Rooms;
import net.arshaa.rat.entity.UsersMaster;
import net.arshaa.rat.repository.BedRepository;
import net.arshaa.rat.repository.BedSummaryRepo;
import net.arshaa.rat.repository.FloorRepository;
import net.arshaa.rat.repository.BuildingRepository;
import net.arshaa.rat.repository.RoomRepository;
import net.arshaa.rat.repository.UsersMasterRepo;
import net.arshaa.rat.service.ratService;

import org.springframework.web.client.RestTemplate;


@CrossOrigin("*")
@RestController
@RequestMapping("/bed")
public class BedController {

	@Autowired
	private BedRepository bedrepo;

	@Autowired
	private BuildingRepository buildingRepo;

	@Autowired
	private FloorRepository floorRepo;

	@Autowired
	private RoomRepository roomRepo;
	
	@Autowired
	private ratService rservice ;
	
	
	

	@Autowired
	private BedSummaryRepo bedsumRepo;

	@Autowired(required = true)
	private UsersMasterRepo uMaster;
	// @Autowired
//	private NewBedRepository newBedRepo;

	@Autowired
	@Lazy
	private RestTemplate template;

	 @Autowired
		@PersistenceContext
		private EntityManager em;

	
//Api for test
	 
	 @DeleteMapping("/deleteBedsAndUpdatesharing/{id}")
	 public ResponseEntity<String> deleteBedsById(@RequestBody RoomDto kamra,@PathVariable  int id) {
		  rservice.deleteBedsById(kamra, id);
		  return new ResponseEntity<String>( "BedDeleted" , HttpStatus.OK) ;
	 }
	 
	 @PutMapping("/updateRoomShare/{id}")
	 public Rooms updateSharing(@RequestBody RoomDto roomDto ,@PathVariable int id) {
		  return  this.rservice.updateRoomsSharing(roomDto, id); 
	 }

	@GetMapping(path = "/test")
	public ResponseEntity<String> test() {
		return new ResponseEntity<>("hello", HttpStatus.OK);
	}
// POST API TO ADD MASTER DATA
	@SuppressWarnings({ "unchecked", "rawtypes" })
	@PostMapping(path = "/addBuilding")
	public ResponseEntity<UsersMaster> addBuilding(@RequestBody UsersMaster newMaster) {
		try {
			boolean check=uMaster.existsByEmail(newMaster.getEmail());
			if(check==true)
			{
				System.out.println(check);
				return new ResponseEntity("Email already exist", HttpStatus.OK);
			}
			else {
				@SuppressWarnings("unused")
				UsersMaster usersMaster = uMaster.save(newMaster);
			    //CommonBuildings buildings=new CommonBuildings();
			    Buildings builds = new Buildings();
			    builds.setBuildingName(newMaster.getBuildingName());
			    builds.setCreatedBy(newMaster.getCreatedBy());
			    java.sql.Date tSqlDate = new java.sql.Date(newMaster.getCreatedOn().getTime());
			    builds.setCreatedOn(tSqlDate);
			    Buildings building = buildingRepo.save(builds);
			    for(int i=0;i<7;i++)
			    {
					/*
					 * System.out.println("hi");
					 * template.postForObject("http://bedService/bed/addFloor" +
					 * building.getBuilding_id(), i, Floors.class);
					 */
			    	//System.out.println("hi");
			    	
			    	Floors floors=new Floors();
					
					floors.setBuildingId(building.getBuildingId());
			        floors.setFloorNumber("FLOOR"+"-"+ i);
					Floors floor = floorRepo.save(floors);
			    	
			    }
			    User user=new User();
			    user.setEmail(newMaster.getEmail());
			    user.setPassword(newMaster.getPassword());
			    user.setUserName(newMaster.getUserName());
			    user.setUserType(newMaster.getUserType());
			    user.setBuildingId(builds.getBuildingId());
			    user.setUserPhoneNumber(newMaster.getUserPhoneNumber());
			    
			    template.postForObject("http://loginService/login/addUsers", user, User.class);
			    return new ResponseEntity("Added Sucessfull", HttpStatus.OK);
			}
		}
		
	    catch (Exception e) {
		    return new ResponseEntity("Something went wrong", HttpStatus.OK);
		}

	}
	// GET API TO GET ALL MASTER DATA
	@SuppressWarnings({ "unchecked", "rawtypes" })
	@GetMapping("/getAllMasterData")
	public ResponseEntity<List<UsersMaster>> getAllData() {
	    try {
	        List<UsersMaster> usersMasterList = uMaster.findAll();
	        return new ResponseEntity(usersMasterList, HttpStatus.OK);
	    } catch (Exception e) {
	        return new ResponseEntity("Something went wrong", HttpStatus.OK);
	    }
	}
	// DELETE API TO DELETE MASTER DATA
	@DeleteMapping("/deleteMasterData/{id}")
	public ResponseEntity<String> deleteMasterData(@PathVariable int id) {

		try {
			uMaster.deleteById(id);
			return new ResponseEntity<String>("Deleted Successfully", HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<String>("Something went wrong", HttpStatus.OK);
		}
	}
	
	//UPDATE API TO UPDATE ALL MASTER DATA
	
	/*
	 * @PutMapping("/updateMasterDataById/{id}") public ResponseEntity<Bed>
	 * updateMasterData(@PathVariable int id, @RequestBody UsersMaster newMaster) {
	 * try { UsersMaster master = uMaster.getById(id);
	 * 
	 * master.setBuilding_name(newMaster.getBuilding_name());
	 * master.setEmail(newMaster.getEmail());
	 * master.setUserName(newMaster.getUserName());
	 * master.setUserType(newMaster.getUserType());
	 * master.setUserPhoneNumber(newMaster.getUserPhoneNumber()); UsersMaster
	 * updatedMaster = uMaster.save(master); Buildings builds = new Buildings();
	 * builds.setBuilding_name(newMaster.getBuilding_name()); Buildings building =
	 * buildingRepo.save(builds); User user=new User();
	 * user.setUserName(newMaster.getUserName());
	 * user.setEmail(newMaster.getEmail());
	 * user.setUserPhoneNumber(newMaster.getUserPhoneNumber()); return new
	 * ResponseEntity("Updated Successfully", HttpStatus.OK); } catch (Exception e)
	 * { return new ResponseEntity("Something went wrong can't able to update",
	 * HttpStatus.ALREADY_REPORTED);
	 * 
	 * } }
	 */
	@PostMapping(path = "/addRoom")
	public ResponseEntity<String> addRoom(@RequestBody Rooms newRoom) {
		try {
			java.sql.Date tSqlDate = new java.sql.Date(newRoom.getCreatedOn().getTime());
			newRoom.setCreatedOn(tSqlDate);
			/*
			 * boolean check1=roomRepo.existsByRoomNumber(newRoom.getRoomId()); boolean
			 * check2=roomRepo.existsByFloorId(newRoom.getFloorId());
			 * 
			 * if(check1==true && check2==true) { return new
			 * ResponseEntity("Room already exists in that floor",
			 * HttpStatus.ALREADY_REPORTED); }
			 */	
			
Rooms room = roomRepo.save(newRoom);
			
			return new ResponseEntity<>("Room Added Successfully", HttpStatus.OK);

		} catch (Exception e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.OK);
		}
	}

	// Api to add Floor
	
	@PostMapping(path = "/addFloor/{buildingId}")
	public ResponseEntity<String> addFloor(@PathVariable Integer i, @PathVariable Integer buildingId) {
		try {
			/*
			 * java.sql.Date tSqlDate = new
			 * java.sql.Date(newFloor.getCreatedOn().getTime());
			 * newFloor.setCreatedOn(tSqlDate);
			 */			
			Floors floors=new Floors();
			
				floors.setBuildingId(buildingId);
		        floors.setFloorNumber("FLOOR"+ i);
				Floors floor = floorRepo.save(floors);
				
			return new ResponseEntity<>("Floor Added Successfully", HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Something Went Wrong", HttpStatus.OK);
		}
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	@GetMapping("/getAllFloors")
	public ResponseEntity<List<Floors>> getAllFloors() {
		try {
			List<Floors> floor = floorRepo.findAll();
			return new ResponseEntity<>(floor, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity("Something went wrong", HttpStatus.OK);
		}
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	@GetMapping("/getAllRooms")
	public ResponseEntity<List<Rooms>> getAllRooms() {
		try {
			List<Rooms> room = roomRepo.findAll();
			return new ResponseEntity(room, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity("Something went wrong", HttpStatus.OK);
		}
	}

	
// Post API to add Bed by id

	@SuppressWarnings({ "unchecked", "rawtypes" })
	@PostMapping(path = "/addBed")
	public ResponseEntity<Bed> addBed(@RequestBody Bed newBed) {
		Bed bed1=new Bed();
		try {
			java.sql.Date tSqlDate = new java.sql.Date(newBed.getCreatedOn().getTime());
			newBed.setCreatedOn(tSqlDate);
			System.out.println(newBed.getBedId());
//			boolean check=bedrepo.existsByBedId(newBed.getBedId());
//			if(check==true)
//			{
//				System.out.println(check);
//				return new ResponseEntity("BedId already exist", HttpStatus.OK);
//			}
			//String roomNumber=roomRepo.getRoomNumberByRoomId(newBed.getRoomId());
			/*
			 * Floors floors=floorRepo.getFloorNumberByFloorId(newBed.getFloorId()); //
			 * Finding string length int n = floors.getFloorNumber().length();
			 * 
			 * // First character of a string char first =
			 * floors.getFloorNumber().charAt(0);
			 * 
			 * // Last character of a string char last = floors.getFloorNumber().charAt(n -
			 * 1);
			 */			System.out.println("HI");
			Rooms rooms=roomRepo.getRoomNumberByRoomId(newBed.getRoomId());
			
			bed1.setAc(newBed.isAc());
			bed1.setBedName(newBed.getBedName());
			bed1.setBedStatus(true);
			bed1.setBuildingId(newBed.getBuildingId());
			System.out.println(newBed.getBuildingId());
			bed1.setDefaultRent(newBed.getDefaultRent());
			bed1.setRoomId(newBed.getRoomId());
			bed1.setFloorId(newBed.getFloorId());
			bed1.setCreatedBy(newBed.getCreatedBy());
			bed1.setCreatedOn(newBed.getCreatedOn());
			Bed bed = bedrepo.save(bed1);
			bed1.setBedId(bed1.getId()+"-"+ rooms.getRoomNumber()+"-"+newBed.getBedName()+"-"+(newBed.isAc()==true ? "AC":"NonAC"));
			Bed bed2 = bedrepo.save(bed1);
			

			return new ResponseEntity("Bed Added Successfully", HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity(e.getMessage(), HttpStatus.OK);
		}
	}

// APi to update bed by id
	
	//@Modifying
	//@Query("update Customer u set u.phone = :phone where u.id = :id")
	//void updatePhone(@Param(value = "id") long id, @Param(value = "phone") String phone);

	@PutMapping("/updateBedById/{id}")
	public ResponseEntity<Bed> updateBed(@PathVariable int id, @RequestBody UpdateBedDto bedDetails) {
		try {
			Bed bed = bedrepo.getById(id);

			bed.setAc(bedDetails.isAc());
			bed.setDefaultRent(bedDetails.getDefaultRent());
			
			Bed updatedBed = bedrepo.save(bed);
			Rooms rooms=roomRepo.getRoomNumberByRoomId(bed.getRoomId());
			bed.setBedId(bed.getId()+"-"+ rooms.getRoomNumber()+"-"+bed.getBedName()+"-"+(updatedBed.isAc()==true ? "AC":"NonAC"));
			bedrepo.save(bed);
			return new ResponseEntity("Bed Updated Successfully", HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity("Something went wrong can't able to update", HttpStatus.ALREADY_REPORTED);

		}
	}
	// APi to update Room by id

		@PutMapping("/updateRoomById/{id}")
		public ResponseEntity<Bed> updateRoom(@PathVariable int id, @RequestBody Rooms roomDetails) {
			try {
                Rooms rooms=roomRepo.getById(id);
                rooms.setBuildingId(roomDetails.getBuildingId());
                if((rooms.getRoomNumber().equals(roomDetails.getRoomNumber()) && (rooms.getFloorId()==roomDetails.getFloorId())))               		
                		{
    				return new ResponseEntity("Room already exists in that floor", HttpStatus.ALREADY_REPORTED);
                		}
                rooms.setFloorId(roomDetails.getFloorId());
                rooms.setRoomNumber(roomDetails.getRoomNumber());
                Rooms updatedRooms = roomRepo.save(rooms);
				return new ResponseEntity("Updated Successfully", HttpStatus.OK);
			} catch (Exception e) {
				return new ResponseEntity("Something went wrong can't able to update", HttpStatus.ALREADY_REPORTED);

			}
		}
		// APi to update Floor by id

		@PutMapping("/updateFlooById/{id}")
		public ResponseEntity<Bed> updateFloor(@PathVariable int id, @RequestBody Floors floorDetails) {
			try {
                Floors floors=floorRepo.getById(id);
                
                floors.setBuildingId(floorDetails.getBuildingId());
                floors.setFloorId(floorDetails.getFloorId());
                Floors updatedFloors = floorRepo.save(floors);
				return new ResponseEntity("Updated Successfully", HttpStatus.OK);
			} catch (Exception e) {
				return new ResponseEntity("Something went wrong can't able to update", HttpStatus.ALREADY_REPORTED);

			}
		}

	// Update api to update building data
	@PutMapping("updateBuildingById/{id}")
	public ResponseEntity<Buildings> updateBuilding(@PathVariable int id, @RequestBody Buildings buildingDetils) {
		try {
			Buildings building = buildingRepo.getById(id);
			building.setBuildingName(buildingDetils.getBuildingName());
			Buildings updatedBuilding = buildingRepo.save(building);
			return new ResponseEntity("Building Updated Successfully", HttpStatus.OK);

		} catch (Exception e) {
			return new ResponseEntity("Something went wrong can't able to update", HttpStatus.ALREADY_REPORTED);
		}

	}

// Api  to delete bed by id

	@DeleteMapping("/deleteBuilding/{id}")
	public ResponseEntity<String> deleteBuilding(@PathVariable int id) {

		try {
			buildingRepo.deleteById(id);
			return new ResponseEntity<String>("Deleted Successfully", HttpStatus.OK);
			
		} catch (Exception e) {
			return new ResponseEntity<String>("Something went wrong", HttpStatus.OK);

		}

	}

// Api  to delete Room by id

	@DeleteMapping("/deleteRoom/{id}")
	public ResponseEntity<String> deleteRoom(@PathVariable int id) {

		try {
			List<Bed> getBeds=bedrepo.getBedsByRoomId(id);
			if(getBeds.isEmpty())
			{
				roomRepo.deleteById(id);
				return new ResponseEntity<String>("Deleted Successfully", HttpStatus.OK);
			}
			else {
				return new ResponseEntity<String>("Action Failed:This Room Contains Beds", HttpStatus.OK);
			}
		} catch (Exception e) {
			return new ResponseEntity<String>("Something went wrong", HttpStatus.OK);

		}

	}
	// Api  to delete Floor by id

		@DeleteMapping("/deleteFloor/{id}")
		public ResponseEntity<String> deleteFloor(@PathVariable int id) {

			try {
				floorRepo.deleteById(id);
				return new ResponseEntity<String>("Deleted Successfully", HttpStatus.OK);
			} catch (Exception e) {
				return new ResponseEntity<String>("Something went wrong", HttpStatus.OK);

			}

		}
	// Api  to delete bed by id

		@DeleteMapping("/deleteBed/{id}")
		public ResponseEntity<String> deletebed(@PathVariable int id) {

			try {
				if((bedrepo.getById(id).isBedStatus()==true))
				{
					bedrepo.deleteById(id);
					return new ResponseEntity<String>("Deleted Successfully", HttpStatus.OK);
				}
				else {
					return new ResponseEntity<String>("Action Failed: Bed contains Guest", HttpStatus.OK);
				}
			} catch (Exception e) {
				return new ResponseEntity<String>("Something went wrong", HttpStatus.OK);

			}

		}

	// Api to get beddata
	@GetMapping("/getAllBeds")
	public ResponseEntity<List<Bed>> getAllBeds() {
		try {
			List<Bed> bed = bedrepo.findAll();

			return new ResponseEntity<>(bed, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity("Something went wrong", HttpStatus.OK);

		}
	}

	// Api to get Building data
	@GetMapping("/getAllBuildings")
	public ResponseEntity<List<Buildings>> getAllBuildings() {
		try {
			List<Buildings> buildings = buildingRepo.findAll();

			return new ResponseEntity<>(buildings, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity("Something went wrong", HttpStatus.OK);

		}
	}
	// Api to get Building By ID
		@GetMapping("/getBuildingsById/{building_id}")
		public ResponseEntity<List<Buildings>> getBuildingsById(@PathVariable int building_id) {
			try {
				Optional<Buildings> buildings = buildingRepo.findById(building_id);

				return new ResponseEntity(buildings, HttpStatus.OK);
			} catch (Exception e) {
				return new ResponseEntity("Something went wrong", HttpStatus.OK);

			}
		}


	// Api to get the count of all beds
	@GetMapping("/getAllBedsCount")
	public ResponseEntity<Integer> getAllBedsCount() {
		List<Bed> bed = bedrepo.findAll();
		List<Bed> bedsCount = bedrepo.findByBedStatus(true);
		int bedCount = bed.size();
		int availableBedsCount = bedsCount.size();
		BedsCount bs = new BedsCount();
		bs.setTotalBeds(bedCount);
		bs.setTotalAvailbleBeds(availableBedsCount);
		return new ResponseEntity(bs, HttpStatus.OK);
	}

//	@GetMapping("/getAvailableBeds")
//	public ResponseEntity<List<Bed>> getAllAvailableBeds() {
//		try {
//			List<Bed> bedList = bedrepo.findByBedStatus(true);
//			// Bed bed=new Bed();
//
//			return new ResponseEntity<>(bedList, HttpStatus.OK);
//		} catch (Exception e) {
//			return new ResponseEntity("Something went wrong", HttpStatus.OK);
//		}
//	}

// GET ALL BUILDINGS

	@GetMapping(path = "/getBedsByAllBuildings")
	public ResponseEntity<List<BuildingInfo>> getBedsByBuildings() {
		try {
			List<BuildingInfo> info = new ArrayList<>();
			List<Buildings> getBuildings = buildingRepo.findAll();
			if (!getBuildings.isEmpty()) {
				getBuildings.forEach(building -> {
					BuildingInfo newBuild = new BuildingInfo();
					Optional<Buildings> getBuilding = buildingRepo.findById(building.getBuildingId());
					if (getBuilding.isPresent()) {
						newBuild.setBuildingName(getBuilding.get().getBuildingName());
						List<FloorsInfo> floorsList = new ArrayList<>();
						Optional<List<Floors>> getFloors = floorRepo
								.findByBuildingId(getBuilding.get().getBuildingId());
						if (getFloors.isPresent()) {
							getFloors.get().forEach(floor -> {
								FloorsInfo newFloor = new FloorsInfo();
								newFloor.setFloorName(floor.getFloorNumber());
								List<RoomsInfo> roomList = new ArrayList<>();
								Optional<List<Rooms>> getRooms = roomRepo.findByFloorId(floor.getFloorId());
								if (getRooms.isPresent()) {
									getRooms.get().forEach(room -> {
										RoomsInfo newRoom = new RoomsInfo();
										newRoom.setRoomNumber(room.getRoomNumber());
										List<BedsInfo> bedsList = new ArrayList<>();
										Optional<List<Bed>> getBeds = bedrepo.findByroomId(room.getRoomId());
										if (getBeds.isPresent()) {
											getBeds.get().forEach(bed -> {
												BedsInfo newBed = new BedsInfo();
												newBed.setBedId(bed.getBedId());
												newBed.setBedStatus(bed.isBedStatus());
												newBed.setBuildingId(bed.getBuildingId());
												newBed.setDefaultRent(bed.getDefaultRent());
												newBed.setRoomId(bed.getRoomId());
												newBed.setAc(bed.isAc());
												newBed.setBedName(bed.getBedName());
												newBed.setBedNum(bed.getId());
//												newBed.setSharing(count);
												newBed.setBuildingName(getBuilding.get().getBuildingName());
//												if(bed.isBedStatus()==false)
//												{
//													Guest listOfGuests=template.getForObject("http://guestService/guest/getGuestByBedId/" + newBed.getBedId(),Guest.class);
//													//newBed.setGuest(listOfGuests);
//													newBed.setGuestId(listOfGuests.getId());
//													newBed.setGuestName(listOfGuests.getFirstName());
//													bedsList.add(newBed);
//												}
//												else {
//													bedsList.add(newBed);
//												}
												bedsList.add(newBed);

											});
										}
										newRoom.setBeds(bedsList);
										roomList.add(newRoom);
									});
								}
								newFloor.setRooms(roomList);
								floorsList.add(newFloor);
							});
						}
						newBuild.setFloors(floorsList);
					}
					info.add(newBuild);
				});
			}
			return new ResponseEntity<>(info, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity(e.getMessage(), HttpStatus.OK);
		}
	}

// Get beds by building Id

	@GetMapping(path = "/getBedsByBuildingId/{id}")
	public ResponseEntity<BuildingInfo> getByBuildingId(@PathVariable Integer id) {
		List<BuildingInfo> infoList = new ArrayList<>();
  
		BuildingInfo info = new BuildingInfo();
		Optional<Buildings> getBuilding = buildingRepo.findById(id);
		if (getBuilding.isPresent()) {
			info.setBuildingName(getBuilding.get().getBuildingName());
			List<FloorsInfo> floorsList = new ArrayList<>();
			Optional<List<Floors>> getFloors = floorRepo.findByBuildingId(getBuilding.get().getBuildingId());
			if (getFloors.isPresent()) {
				getFloors.get().forEach(floor -> {
					FloorsInfo newFloor = new FloorsInfo();
					newFloor.setFloorName(floor.getFloorNumber());
					List<RoomsInfo> roomList = new ArrayList<>();
					Optional<List<Rooms>> getRooms = roomRepo.findByFloorId(floor.getFloorId());
					if (getRooms.isPresent()) {
						getRooms.get().forEach(room -> {
							RoomsInfo newRoom = new RoomsInfo();
							newRoom.setRoomNumber(room.getRoomNumber());
							List<BedsInfo> bedsList = new ArrayList<>();
							Optional<List<Bed>> getBeds = bedrepo.findByroomId(room.getRoomId());
							if (getBeds.isPresent()) {
								getBeds.get().forEach(bed -> {
									BedsInfo newBed = new BedsInfo();
									newBed.setBuildingId(bed.getBuildingId());
									newBed.setRoomId(bed.getRoomId());
									newBed.setBedId(bed.getBedId());
									newBed.setBedName(bed.getBedName());
									newBed.setBedStatus(bed.isBedStatus());
									newBed.setDefaultRent(bed.getDefaultRent());
									newBed.setAc(bed.isAc());
									newBed.setBedNum(bed.getId());
									newBed.setGuestId(bed.getGuestId());
									//newBed.setGuestStatus("active");
									//String guestStatus="active";
									if(bed.isBedStatus()==false)
									{
										
										Guest listOfGuests=template.getForObject("http://guestService/guest/getGuestByGuestId/" + newBed.getGuestId(),Guest.class);
										//newBed.setGuest(listOfGuests);
										newBed.setGuestName(listOfGuests.getFirstName());
										newBed.setGuestStatus(listOfGuests.getGuestStatus());
										newBed.setDueAmount(listOfGuests.getDueAmount());
										GuestProfile getProfile=template.getForObject("http://guestService/guest/files/" + newBed.getGuestId(),GuestProfile.class);										
                                        newBed.setName(getProfile.getName());
                                        newBed.setType(getProfile.getType());
                                        newBed.setUrl(getProfile.getData());
                                        newBed.setGuestDue(em.createNamedStoredProcedureQuery("onlyDues").setParameter("GUEST__ID",newBed.getGuestId()).getResultList());
										
										bedsList.add(newBed);

									}
									else {
										bedsList.add(newBed);
									}
								});
							}
							newRoom.setBeds(bedsList);
							roomList.add(newRoom);
						});
					}
					newFloor.setRooms(roomList);
					floorsList.add(newFloor);
				});
			}
			info.setFloors(floorsList);
		}
		infoList.add(info);
		return new ResponseEntity(infoList, HttpStatus.OK);
	}

	// GET MAPPING API FOR AVAILABLE BEDS BY BUILDING ID

	@GetMapping(path = "/getAvailableBedsByBuildingId/{id}")
	public ResponseEntity<java.util.List<BedsInfo>> buildingId(@PathVariable Integer id) {
		List<BedsInfo> bedsList = new ArrayList<>();
		Optional<Buildings> getBuilding = buildingRepo.findById(id);
		if (getBuilding.isPresent()) {
			List<FloorsInfo> floorsList = new ArrayList<>();
			Optional<List<Floors>> getFloors = floorRepo.findByBuildingId(getBuilding.get().getBuildingId());
			if (getFloors.isPresent()) {
				getFloors.get().forEach(floor -> {
					Optional<List<Rooms>> getRooms = roomRepo.findByFloorId(floor.getFloorId());
					if (getRooms.isPresent()) {
						getRooms.get().forEach(room -> {
						Optional<List<Bed>> getBeds = bedrepo.findByroomIdAndBedStatus(room.getRoomId(), true);
						//	Optional<List<Bed>> getBeds = bedrepo.findByRoomIdAndBedStatusAndSharing(room.getRoomId(), true,sharing);
							if (getBeds.isPresent()) {
								getBeds.get().forEach(bed -> {
									BedsInfo newBed = new BedsInfo();
									newBed.setBedId(bed.getBedId());
									newBed.setBedName(bed.getBedName());
									newBed.setBedStatus(bed.isBedStatus());
									newBed.setRoomId(bed.getRoomId());
									newBed.setBedNum(bed.getId());
									newBed.setBuildingId(bed.getBuildingId());
									newBed.setAc(bed.isAc());
									newBed.setDefaultRent(bed.getDefaultRent());
									newBed.setBuildingName(getBuilding.get().getBuildingName());
									bedsList.add(newBed);
								});
							}
//							listbed.add( bedsList);
						});
					}
				});
			}
		}
		return new ResponseEntity<List<BedsInfo>>(bedsList, HttpStatus.OK);
	}
	
//	@GetMapping("/getByRoomAndSharing/{roomId}/{b}/{sharing}")
//	public Optional<List<Bed>> findByRoomIdAndBedStatusAndSharing(@PathVariable int roomId ,@PathVariable boolean b , @PathVariable int sharing){
//							Optional<List<Bed>> getBeds = bedrepo.findByRoomIdAndBedStatusAndSharing(roomId, true,sharing);
//							return getBeds ;
//
//	}

// GET MAPPING API FOR NOT AVAILABLE BEDS BY BUILDING ID

	@GetMapping(path = "/getNotAvailableBedsByBuildingId/{id}")
	public ResponseEntity<java.util.List<Bed>> getNotAvailableBedsByBuildingId(@PathVariable Integer id) {
		List<Bed> listbed = new ArrayList<>();
		Optional<Buildings> getBuilding = buildingRepo.findById(id);
		if (getBuilding.isPresent()) {
			List<FloorsInfo> floorsList = new ArrayList<>();
			Optional<List<Floors>> getFloors = floorRepo.findByBuildingId(getBuilding.get().getBuildingId());
			if (getFloors.isPresent()) {
				getFloors.get().forEach(floor -> {
					Optional<List<Rooms>> getRooms = roomRepo.findByFloorId(floor.getFloorId());
					if (getRooms.isPresent()) {
						getRooms.get().forEach(room -> {
							List<BedsInfo> bedsList = new ArrayList<>();
							Optional<List<Bed>> getBeds = bedrepo.findByroomIdAndBedStatus(room.getRoomId(), false);
							if (getBeds.isPresent()) {
								getBeds.get().forEach(bed -> {
									BedsInfo newBed = new BedsInfo();
									newBed.setBedId(bed.getBedId());
									newBed.setBedName(bed.getBedName());
									newBed.setBedStatus(bed.isBedStatus());
									newBed.setRoomId(bed.getRoomId());
									newBed.setBedNum(bed.getId());
									newBed.setBuildingId(bed.getBuildingId());
									newBed.setAc(bed.isAc());
									newBed.setDefaultRent(bed.getDefaultRent());
									newBed.setBuildingName(getBuilding.get().getBuildingName());
									bedsList.add(newBed);
								});
							}
						});
					}
				});
			}
		}
		return new ResponseEntity<List<Bed>>(listbed, HttpStatus.OK);
	}

//    getApi for all buldings available beds

	@GetMapping(path = "/getAvailableBedsByBuildings")
	public ResponseEntity<List<BuildingModel>> getAvailableBedsByBuildings() {
		List<BuildingModel> info = new ArrayList<>();
		List<Buildings> getBuildings = buildingRepo.findAll();
		if (!getBuildings.isEmpty()) {
			getBuildings.forEach(building -> {
				BuildingModel newBuild = new BuildingModel();
				Optional<Buildings> getBuilding = buildingRepo.findById(building.getBuildingId());
				if (getBuilding.isPresent()) {
					newBuild.setBuildingId(getBuilding.get().getBuildingId());
					newBuild.setBuildingName(getBuilding.get().getBuildingName());
					List<BedsInfo> bedsList = new ArrayList<>();
					Optional<List<Bed>> getBeds = bedrepo
						.findBybuildingIdAndBedStatus(getBuilding.get().getBuildingId(), true);
			//		Optional<List<Bed>> getBeds =bedrepo.findByRoomIdAndBedStatusAndSharing(getBuilding.get().getBuildingId(), true,sharing);
					if (getBeds.isPresent()) {
						getBeds.get().forEach(bed -> {
							BedsInfo newBed = new BedsInfo();
							newBed.setBedId(bed.getBedId());
							newBed.setBedName(bed.getBedName());
							newBed.setBedStatus(bed.isBedStatus());
							int count=bedrepo.getBedsByRoomId(bed.getRoomId()).size();
							newBed.setRoomId(bed.getRoomId());
							newBed.setBedNum(bed.getId());
							newBed.setBuildingId(bed.getBuildingId());
							newBed.setAc(bed.isAc());
							newBed.setDefaultRent(bed.getDefaultRent());
							newBed.setBuildingName(getBuilding.get().getBuildingName());
							newBed.setSharing(count);
							bedsList.add(newBed);
						});
					}
					newBuild.setBeds(bedsList);
					info.add(newBuild);
				}
			});
		}
		return new ResponseEntity<>(info, HttpStatus.OK);
	}

//UPDATE API FOR BED STATUS AND GUEST ID BY BEDID

	@PutMapping("/updateBedStatusBydBedId")
	public void updateBedStatusByBedId(@RequestBody Bed bed) {
		Bed getBed = bedrepo.findByBedId(bed.getBedId());
		getBed.setGuestId(bed.getGuestId());
		getBed.setBedId(bed.getBedId());
		getBed.setBedStatus(false);
		bedrepo.save(getBed);
	}

//GET API FOR GETTING THE COUNT OF TOTAL BEDS AND OCCUPIED BEDS FOR RAT PIE CHART FOR ALL BUILDINGS

	@GetMapping(path = "/getBedSummaryForPieChartByAllBuildings")
	public ResponseEntity<List<NewBuildModel>> getAvailableBedsByBuilding() {
		List<NewBuildModel> info = new ArrayList<NewBuildModel>();
		List<Buildings> getBuildings = buildingRepo.findAll();
		if (!getBuildings.isEmpty()) {
			getBuildings.forEach(building -> {
				NewBuildModel newBuild = new NewBuildModel();
				Optional<Buildings> getBuilding = buildingRepo.findById(building.getBuildingId());
				if (getBuilding.isPresent()) {
					newBuild.setBuildingId(getBuilding.get().getBuildingId());
					newBuild.setBuildingName(getBuilding.get().getBuildingName());
					List<Bed> bedsList = bedrepo.findAllByBuildingId(building.getBuildingId());
					List<Bed> listbeds = bedsumRepo.findByBuildingIdAndBedStatus(building.getBuildingId(), false);
					List<Bed> listOfAvailablebeds = bedsumRepo.findByBuildingIdAndBedStatus(building.getBuildingId(),
							true);
					
					//int count=buildingRepo.getBuilding(building.getBuilding_id());
					int bedsCount = bedsList.size();
					int occupiedBedsCount = listbeds.size();
					int totalAvailableBeds = listOfAvailablebeds.size();
					newBuild.setTotalBeds(bedsCount);
					newBuild.setOccupiedBeds(occupiedBedsCount);
					newBuild.setAvailableBeds(totalAvailableBeds);
					info.add(newBuild);
				}
			});
		}
		return new ResponseEntity<>(info, HttpStatus.OK);
	}

//GET API FOR GETTING THE COUNT OF TOTAL BEDS AND OCCUPIED BEDS FOR RAT PIE CHART BY BUILDING ID

	@GetMapping(path = "/getBedSummaryForPieChartByBuildingId/{buildingId}")
	public ResponseEntity<List<NewBuildModel>> getAvailableBedsByBuildingId(@PathVariable int buildingId) {
		List<NewBuildModel> info = new ArrayList<>();
		NewBuildModel newBuild = new NewBuildModel();
		Optional<Buildings> getBuilding = buildingRepo.findById(buildingId);
		if (getBuilding.isPresent()) {
			newBuild.setBuildingId(getBuilding.get().getBuildingId());
			newBuild.setBuildingName(getBuilding.get().getBuildingName());
			List<Bed> bedsList = bedrepo.findAllByBuildingId(buildingId);
			List<Bed> listbeds = bedsumRepo.findByBuildingIdAndBedStatus(buildingId, false);
			List<Bed> listOfAvailablebeds = bedsumRepo.findByBuildingIdAndBedStatus(buildingId, true);
			//int count=buildingRepo.getBuilding(buildingId);
			//em.createNamedStoredProcedureQuery("firstProcedure").setParameter("BUILDING_ID", buildingId).getResultList();
 

			int bedsCount = bedsList.size();
			int occupiedBedsCount = listbeds.size();
			int totalAvailableBeds = listOfAvailablebeds.size();
			newBuild.setTotalBeds(bedsCount);
						newBuild.setOccupiedBeds(occupiedBedsCount);
			newBuild.setAvailableBeds(totalAvailableBeds);
			info.add(newBuild);
			//info.addAll(em.createNamedStoredProcedureQuery("firstProcedure").setParameter("BUILDING_ID", buildingId).getResultList());

		}
		return new ResponseEntity<>(info,
 HttpStatus.OK);
	}
	
	//GET API FOR GETTING THE COUNT OF TOTAL BEDS AND OCCUPIED BEDS FOR RAT PIE CHART BY BUILDING ID

		@GetMapping(path = "/getBuildingSummaryForPieChartByBuildingId/{buildingId}")
		public ResponseEntity<List<BuildingSummary>> getAvailableBsByBuildingId(@PathVariable int buildingId) {
			List<BuildingSummary> info = new ArrayList<>();
			BuildingSummary newBuild = new BuildingSummary();
			Optional<Buildings> getBuilding = buildingRepo.findById(buildingId);
			if (getBuilding.isPresent()) {
				newBuild.setBuildingId(getBuilding.get().getBuildingId());
				newBuild.setBuildingName(getBuilding.get().getBuildingName());
				List<Bed> bedsList = bedrepo.findAllByBuildingId(buildingId);
				List<Bed> listbeds = bedsumRepo.findByBuildingIdAndBedStatus(buildingId, false);
				List<Bed> listOfAvailablebeds = bedsumRepo.findByBuildingIdAndBedStatus(buildingId, true);
				//int count=buildingRepo.getBuilding(buildingId);
				//em.createNamedStoredProcedureQuery("firstProcedure").setParameter("BUILDING_ID", buildingId).getResultList();
	 

				int bedsCount = bedsList.size();
				int occupiedBedsCount = listbeds.size();
				int totalAvailableBeds = listOfAvailablebeds.size();
				newBuild.setTotalBeds(bedsCount);
				newBuild.setGuestsInNotice(em.createNamedStoredProcedureQuery("firstProcedure").setParameter("BUILDING_ID", buildingId).getResultList());
				newBuild.setGuestsOnDue(em.createNamedStoredProcedureQuery("Procedure2").setParameter("BUILDING__ID", buildingId).getResultList());
				newBuild.setTotalDueAmount(em.createNamedStoredProcedureQuery("Procedure3").setParameter("BUILDING__ID", buildingId).getResultList());
				newBuild.setOccupiedBeds(occupiedBedsCount);
				newBuild.setAvailableBeds(totalAvailableBeds);
				info.add(newBuild);
				//info.addAll(em.createNamedStoredProcedureQuery("firstProcedure").setParameter("BUILDING_ID", buildingId).getResultList());

			}
			return new ResponseEntity<>(info,
	 HttpStatus.OK);
		}


	@GetMapping("/getBedByBedId/{bedId}")
	public Bed getBedByBuildingId(@PathVariable String bedId) {
		Bed getBed = bedrepo.findByBedId(bedId);
		return getBed;
	}

	
	// Get api to get buildingid and buildingname
	
	@GetMapping(path="/getBuildingIdAndName")
	public ResponseEntity<List<BuildingId>> getBuildingIdAndName() {
		try {
			List<BuildingId> info = new ArrayList<BuildingId>();
			List<Buildings> getBuildings = buildingRepo.findAll();
			if (!getBuildings.isEmpty()) {
				getBuildings.forEach(building -> {
					BuildingId newBuild = new BuildingId();
					Optional<Buildings> getBuilding = buildingRepo.findById(building.getBuildingId());
					if (getBuilding.isPresent()) {
						newBuild.setBuildingId(getBuilding.get().getBuildingId());
						newBuild.setBuildingName(getBuilding.get().getBuildingName());
						info.add(newBuild);
					}
				});
			}
			return new ResponseEntity<>(info, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity("Something went wrong", HttpStatus.OK);

		}
	}
	
	
	
	@GetMapping(path = "/getFloorIdAndNameByBuildingId/{buildingId}")
	public ResponseEntity<List<Floors>> getFloorIdAndNameByBuildingId(@PathVariable int buildingId) {
	{
		try {
			List<FloorNameAndId> floorList=new ArrayList<>();
			FloorNameAndId f=new FloorNameAndId();
			List<Floors> getfloors=floorRepo.getFloorsByBuildingId(buildingId);
			if(!getfloors.isEmpty())
			{
				getfloors.forEach(floor->{
					f.setFloorId(floor.getFloorId());
					f.setFloorNumber(floor.getFloorNumber());
					
				});
				floorList.add(f);
			}
			return new ResponseEntity(getfloors, HttpStatus.OK);
		}
		catch (Exception e) {
			// TODO: handle exception
			return new ResponseEntity(e.getMessage(), HttpStatus.OK);
		}
		
	}
	}
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	@GetMapping(path = "/getRoomIdAndNameByFloorId/{floorId}")
	public ResponseEntity<List<Floors>> getRoomIdAndNameByFloorId(@PathVariable int floorId) {
	{
		try {
			List<FloorNameAndId> floorList=new ArrayList<>();
			FloorNameAndId f=new FloorNameAndId();
			List<Rooms> getRooms=roomRepo.getRoomsByFloorId(floorId);
			
			return new ResponseEntity(getRooms, HttpStatus.OK);

		}
		catch (Exception e) {
			// TODO: handle exception
			return new ResponseEntity(e.getMessage(), HttpStatus.OK);

		}
		
	}
	}
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	@GetMapping(path = "/getBedsByRoomId/{roomId}")
	public ResponseEntity<List<Floors>> getBedsByRoomId(@PathVariable int roomId) {
	{
		try {
			List<FloorNameAndId> floorList=new ArrayList<>();
			FloorNameAndId f=new FloorNameAndId();
			List<Bed> getBeds=bedrepo.getBedsByRoomId(roomId);
			
			return new ResponseEntity(getBeds, HttpStatus.OK);

		}
		catch (Exception e) {
			// TODO: handle exception
			return new ResponseEntity(e.getMessage(), HttpStatus.OK);

		}		
	}
	}
	
	@GetMapping("/getBuildingNameByBuildingId/{buildingId}")
	public ResponseEntity getBuildingNameByBuildingId(@PathVariable int buildingId) {
		
			Buildings buildingName=buildingRepo.getBuildingNameByBuildingId(buildingId);
			return new ResponseEntity(buildingName.getBuildingName(),HttpStatus.OK);

	}
	
	@GetMapping("getRoomName/{roomId}")
	public ResponseEntity getRoomNameByRoomId(@PathVariable int roomId) {
		Rooms room = roomRepo.getRoomNameByRoomId(roomId);
		return new ResponseEntity(room.getRoomNumber(), HttpStatus.OK);
	}
	
	@GetMapping("/getFloorName/{floorId}")
	public ResponseEntity getFloorName(@PathVariable int floorId) {
		Floors flr = floorRepo.getFloorNumberByFloorId(floorId);
		return new ResponseEntity(flr.getFloorNumber(),HttpStatus.OK);
	}
	
	@GetMapping("/getAvailableBeds")
	public List<AvailableBeds> getAllAvailableBeds() {
		
		try {
			List<Bed> bedList = bedrepo.findByBedStatus(true);
		
				List<AvailableBeds> abs=new ArrayList<>();
				// getList = bedList ; // gs = ab ;  gin = abs
				//GuestsInNotice gs=new GuestsInNotice();
				bedList.forEach(b->{
					AvailableBeds ab=new AvailableBeds();
		            ab.setBuildingId(b.getBuildingId());
		            ab.setDefaultRent(b.getDefaultRent());
		            ab.setFloorId(b.getFloorId());
		            ab.setRoomId(b.getRoomId());
		            ab.setBedName(b.getBedName());
		            ab.setbId(b.getId());
		            ab.setBedId(b.getBedId());
		            ab.setBedStatus(true);         
		            String roomName=template.getForObject("http://bedService/bed/getRoomName/"+ b.getRoomId(), String.class);
		            ab.setRoomNumber(roomName);	          
		
		            String fn = template.getForObject("http://bedService/bed/getFloorName/"+ b.getFloorId(), String.class); 
		 ab.setFloorNumber(fn);
	       String bName=template.getForObject("http://bedService/bed/getBuildingNameByBuildingId/"+ b.getBuildingId(), String.class);
           ab.setBuildingName(bName);
		            abs.add(ab);
				});
				return abs;
				
		}catch (Exception e) {
					System.out.println(e.getMessage());	}
		return null;		

		   	}
	
//Get Api to get monthly summary by buildingwise
    @GetMapping("getMonthlySummaryForAdmin/{month}/{year}")	
	public ResponseEntity getMonthlySummary(@PathVariable int month,@PathVariable int year)
	{ 
    	MonthluSumResponse msRes=new MonthluSumResponse();
		String getIncomeRefURL="http://paymentService/payment/getMonthlySummary/";
		List<MonthlySummary> getList=new ArrayList<>();
		try {
			List<Buildings> getBuildings = buildingRepo.findAll();
			
				getBuildings.forEach(building -> {
					MonthlySummary ms=new MonthlySummary();

					Response getMonthlySum=template.getForObject(getIncomeRefURL+month+"/"+year+"/"+building.getBuildingId(), Response.class);
					if(!(getMonthlySum.getData()).equals(null))
					{
						ms.setBuildingName(building.getBuildingName());
						ms.setIncomeAmount(getMonthlySum.getData().getIncomeAmount());
						ms.setRefundAmount(getMonthlySum.getData().getRefundAmount());
						double actualIncome=getMonthlySum.getData().getIncomeAmount()-getMonthlySum.getData().getRefundAmount();
						ms.setActualIncome(actualIncome);
						getList.add(ms);
						msRes.setStatus(true);
						msRes.setData(getList);
					}
					else {
						msRes.setStatus(false);
						msRes.setData(null);
					}
				});
				return new ResponseEntity<>(msRes, HttpStatus.OK);
		}
		catch (Exception e){
			msRes.setStatus(false);
			return new ResponseEntity<>(msRes, HttpStatus.OK);
		}
	}
	
    @GetMapping("/getStatusByGuestId/{guestId}")
    public ResponseEntity getStatusByGuestId(@PathVariable String guestId) {
    	Bed b=bedrepo.findByGuestId(guestId);
    	if(!b.equals(null))
    	{
    		String bedStatus="";
        	if(b.isAc()==true)
        	{
        		bedStatus="AC";
        	}
        	else {
        		bedStatus="NonAC";
        	}
        	return new ResponseEntity(bedStatus,HttpStatus.OK);
    	}
    	else {
        	return new ResponseEntity(null,HttpStatus.OK);

    	}
    	
    }
    

}
