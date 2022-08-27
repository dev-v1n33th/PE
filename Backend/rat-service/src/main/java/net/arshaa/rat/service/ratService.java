package net.arshaa.rat.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import Models.RoomDto;
import net.arshaa.rat.entity.Bed;
import net.arshaa.rat.entity.Rooms;
import net.arshaa.rat.repository.BedRepository;
import net.arshaa.rat.repository.BedSummaryRepo;
import net.arshaa.rat.repository.BuildingRepository;
import net.arshaa.rat.repository.FloorRepository;
import net.arshaa.rat.repository.RoomRepository;

@Service
public class ratService implements RatInterfaces {

	@Autowired
	private BedRepository bedrepo;
	@Autowired
	private BuildingRepository buildingRepo;
	@SuppressWarnings("unused")
	@Autowired
	private FloorRepository floorRepo;
	@Autowired
	private RoomRepository roomRepo;
	@SuppressWarnings("unused")
	@Autowired
	private BedSummaryRepo bedsumRepo;

	@Autowired
	@Lazy
	private RestTemplate template;

	@Override
	public Rooms updateRoomsSharing(RoomDto roomDto, int id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ResponseEntity<String> deleteBedsById(RoomDto kamra, int id) {
		// TODO Auto-generated method stub
		return null;
	}

//	@Override
//	public Rooms updateRoomsSharing(RoomDto roomDto, int id) {
//		try {
//			int b = bedrepo.countSharing(id);
//			Rooms rooms = roomRepo.getById(id);
//			rooms.setRoomId(id);
//			rooms.setSharing(b);
//
//			return roomRepo.save(rooms);
//
//		} catch (Exception e) {
//			System.out.println(e.getLocalizedMessage());
//		}
//		return null;
//
//	}

//	@Override
//	public ResponseEntity<String> deleteBedsById(RoomDto kamra, int id) {
//	
//		try {
//			if ((bedrepo.getById(id).isBedStatus() == true)) {
//				bedrepo.deleteById(id);
//
//				int b = bedrepo.countSharing(id);
//				Rooms rooms = roomRepo.getById(id);
//				//Rooms room = new Rooms();
//			//	rooms.setRoomId(kamra.getRoomId());
//				rooms.setSharing(b);
//
//				updateRoomsSharing(kamra, rooms.getRoomId());
//				roomRepo.save(rooms);
//
//				return new ResponseEntity<String>("Deleted Successfully", HttpStatus.OK);
//			} else {
//				return new ResponseEntity<String>("Action Failed: Bed contains Guest", HttpStatus.OK);
//			}
//		} catch (Exception e) {
//			return new ResponseEntity<String>("😣😏 Cant Update Room", HttpStatus.OK);
//		}
//	}

}
