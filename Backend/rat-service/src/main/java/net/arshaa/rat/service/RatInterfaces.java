package net.arshaa.rat.service;

import org.springframework.http.ResponseEntity;

import Models.RoomDto;
import net.arshaa.rat.entity.Bed;
import net.arshaa.rat.entity.Rooms;

public interface RatInterfaces {


	public Rooms updateRoomsSharing(RoomDto roomDto , int id);
	
	public ResponseEntity<String> deleteBedsById(RoomDto kamra ,int id);
	
}
