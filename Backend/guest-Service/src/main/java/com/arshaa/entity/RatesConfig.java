package com.arshaa.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="RatesConfig")
public class RatesConfig {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id ;
	private int buildingId ;
	
	private int sharing ;
	private String roomType ;
	private String occupancyType ;
	private  double price ;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getBuildingId() {
		return buildingId;
	}
	public void setBuildingId(int buildingId) {
		this.buildingId = buildingId;
	}
	public int getSharing() {
		return sharing;
	}
	public void setSharing(int sharing) {
		this.sharing = sharing;
	}
	public String getRoomType() {
		return roomType;
	}
	public void setRoomType(String roomType) {
		this.roomType = roomType;
	}
	public String getOccupancyType() {
		return occupancyType;
	}
	public void setOccupancyType(String occupancyType) {
		this.occupancyType = occupancyType;
	}
	public double getPrice() {
		return price;
	}
	public void setPrice(double price) {
		this.price = price;
	}
	public RatesConfig() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
	

	
	
	
}
