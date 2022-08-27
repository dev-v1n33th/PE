package com.arshaa.model;

import java.util.List;

import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.fasterxml.jackson.annotation.JsonFormat;

public class GuestsInNotice {

    private String firstName;
    private String id;
    private String BuildingName;
    private String bedId;
    private String personalNumber;
    private String email;
    private double dueAmount  ;
    private String occupancyType ;
    // private List<E> totalDueAmount;
    
    @JsonFormat(pattern="dd-MM-yyyy HH:mm:ss", timezone="IST")
    private java.util.Date plannedCheckOutDate;

    
    public java.util.Date getPlannedCheckOutDate() {
		return plannedCheckOutDate;
	}
	public void setPlannedCheckOutDate(java.util.Date plannedCheckOutDate) {
		this.plannedCheckOutDate = plannedCheckOutDate;
	}
	public String getOccupancyType() {
		return occupancyType;
	}
	public void setOccupancyType(String occupancyType) {
		this.occupancyType = occupancyType;
	}
	@JsonFormat(pattern="dd-MM-yyyy HH:mm:ss", timezone="IST")
	//@Temporal(TemporalType.TIMESTAMP)
    private java.util.Date checkInDate = new java.util.Date(System.currentTimeMillis());
    @JsonFormat(pattern="dd-MM-yyyy HH:mm:ss", timezone="IST")
    private java.util.Date checkOutDate;
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
//	public List<E> getDueAmount() {
//		return dueAmount;
//	}
//	public void setDueAmount(List<E> dueAmount) {
//		this.dueAmount = dueAmount;
//	}
	public String getId() {
		return id;
	}
	public double getDueAmount() {
		return dueAmount;
	}
	public void setDueAmount(double dueAmount) {
		this.dueAmount = dueAmount;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getBuildingName() {
		return BuildingName;
	}
	public void setBuildingName(String buildingName) {
		BuildingName = buildingName;
	}
	public String getBedId() {
		return bedId;
	}
	public void setBedId(String bedId) {
		this.bedId = bedId;
	}
	public String getPersonalNumber() {
		return personalNumber;
	}
	public void setPersonalNumber(String personalNumber) {
		this.personalNumber = personalNumber;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	
	public java.util.Date getCheckInDate() {
		return checkInDate;
	}
	public void setCheckInDate(java.util.Date checkInDate) {
		this.checkInDate = checkInDate;
	}
	public java.util.Date getCheckOutDate() {
		return checkOutDate;
	}
	public void setCheckOutDate(java.util.Date checkOutDate) {
		this.checkOutDate = checkOutDate;
	}
    
    
    
    }