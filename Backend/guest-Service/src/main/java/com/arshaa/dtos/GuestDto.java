package com.arshaa.dtos;

import java.sql.Date;

import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;


public class GuestDto {
	
	
	private String id;
    private String guestName ;
    private String email;
    @JsonFormat(pattern = "dd-mm-yyyy")
    private Date dateOfBirth;
    private String personalNumber;
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    @JsonFormat(pattern="dd-MM-yyyy HH:mm:ss", timezone="IST")
	@Temporal(TemporalType.TIMESTAMP)
    private java.util.Date checkInDate = new java.util.Date(System.currentTimeMillis());
    
    @JsonFormat(pattern="dd-MM-yyyy HH:mm:ss", timezone="IST")
    private java.util.Date checkOutDate;
    
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
	private String guestStatus;
    private double defaultRent;
    private double amountPaid;
    private String occupancyType;
    private String gender;
    private String aadharNumber;
    private String buildingName ;
    private int buildingId;
    private String bedId;
    private int duration;
    private double dueAmount;
    private String addressLine1;
    private String addressLine2;
    private String pincode;
    private String city;
    private String state;
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	
	public String getBuildingName() {
		return buildingName;
	}
	public void setBuildingName(String buildingName) {
		this.buildingName = buildingName;
	}
public String getGuestName () {
	return guestName ;
}
public void setGuestName(String guestName) {
	this.guestName= guestName ;
}
	
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public Date getDateOfBirth() {
		return dateOfBirth;
	}
	public void setDateOfBirth(Date dateOfBirth) {
		this.dateOfBirth = dateOfBirth;
	}
	public String getPersonalNumber() {
		return personalNumber;
	}
	public void setPersonalNumber(String personalNumber) {
		this.personalNumber = personalNumber;
	}
	public String getGuestStatus() {
		return guestStatus;
	}
	public void setGuestStatus(String guestStatus) {
		this.guestStatus = guestStatus;
	}
	public double getDefaultRent() {
		return defaultRent;
	}
	public void setDefaultRent(double defaultRent) {
		this.defaultRent = defaultRent;
	}
	public double getAmountPaid() {
		return amountPaid;
	}
	public void setAmountPaid(double amountPaid) {
		this.amountPaid = amountPaid;
	}
	public String getOccupancyType() {
		return occupancyType;
	}
	public void setOccupancyType(String occupancyType) {
		this.occupancyType = occupancyType;
	}
	public String getGender() {
		return gender;
	}
	public void setGender(String gender) {
		this.gender = gender;
	}
	public String getAadharNumber() {
		return aadharNumber;
	}
	public void setAadharNumber(String aadharNumber) {
		this.aadharNumber = aadharNumber;
	}
	public int getBuildingId() {
		return buildingId;
	}
	public void setBuildingId(int buildingId) {
		this.buildingId = buildingId;
	}
	public String getBedId() {
		return bedId;
	}
	public void setBedId(String bedId) {
		this.bedId = bedId;
	}
	public int getDuration() {
		return duration;
	}
	public void setDuration(int duration) {
		this.duration = duration;
	}
	public double getDueAmount() {
		return dueAmount;
	}
	public void setDueAmount(double dueAmount) {
		this.dueAmount = dueAmount;
	}
	public String getAddressLine1() {
		return addressLine1;
	}
	public void setAddressLine1(String addressLine1) {
		this.addressLine1 = addressLine1;
	}
	public String getAddressLine2() {
		return addressLine2;
	}
	public void setAddressLine2(String addressLine2) {
		this.addressLine2 = addressLine2;
	}
	public String getPincode() {
		return pincode;
	}
	public void setPincode(String pincode) {
		this.pincode = pincode;
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}
	public GuestDto(String id,  String email, Date dateOfBirth, String personalNumber,
			String guestStatus, double defaultRent, double amountPaid, String occupancyType, String gender,
			String aadharNumber, int buildingId, String bedId, int duration, double dueAmount, String addressLine1,
			String addressLine2,String buildingName ,String guestName , String pincode, String city, String state) {
		super();
		this.id = id;
		this.guestName=guestName ;
		this.email = email;
		this.buildingName=buildingName ;
		this.dateOfBirth = dateOfBirth;
		this.personalNumber = personalNumber;
		this.guestStatus = guestStatus;
		this.defaultRent = defaultRent;
		this.amountPaid = amountPaid;
		this.occupancyType = occupancyType;
		this.gender = gender;
		this.aadharNumber = aadharNumber;
		this.buildingId = buildingId;
		this.bedId = bedId;
		this.duration = duration;
		this.dueAmount = dueAmount;
		this.addressLine1 = addressLine1;
		this.addressLine2 = addressLine2;
		this.pincode = pincode;
		this.city = city;
		this.state = state;
	}
	public GuestDto() {
		super();
		// TODO Auto-generated constructor stub
	}
    
    
    
    

    

}
