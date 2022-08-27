package common;


import java.io.Serializable;
import java.sql.Date;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Parameter;
import org.springframework.format.annotation.DateTimeFormat;

public class Guest {


	
	private String id;
    private String firstName;
    private String lastName;
    private String email;
    @JsonFormat(pattern = "dd-mm-yyyy")
    private Date dateOfBirth;
    private String personalNumber;
    private String secondaryPhoneNumber;
    private String fatherName;
    private String fatherNumber;
    private String bloodGroup;
    private String occupation;
    private String occupancyType;
    private String gender;
    private String aadharNumber;
    private int buildingId;
    private String bedId;
    private int duration;
    private double dueAmount;
    private String addressLine1;
    private String addressLine2;
    private String pincode;
    private String city;
    private String state;
    private String workPhone;
    private String workAddressLine1;
    private String workAddressLine2;
    private String transactionId;
    private String paymentPurpose;
    private double amountToBePaid;
    private double securityDeposit;
    private String guestStatus;
  
    private Date noticeDate;
     private double amountPaid;
    private String checkinNotes;
    @JsonFormat(pattern="dd-MM-yyyy HH:mm:ss", timezone="IST")
    @Temporal(TemporalType.TIMESTAMP)
    private java.util.Date transactionDate = new java.util.Date(System.currentTimeMillis());
    //@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
    @JsonFormat(pattern="yyyy-MM-dd")
    private Date checkInDate ;
    
    
    
   // @DateTimeFormat(pattern = "dd-MM-yyyy")
    @JsonFormat(pattern="yyyy-MM-dd")
    private java.util.Date plannedCheckOutDate;
   // @DateTimeFormat(pattern = "dd-MM-yyyy")
    
    private Date checkOutDate;
    private double defaultRent;


    
    
    
   
	public java.util.Date getNoticeDate() {
		return noticeDate;
	}
	public void setNoticeDate(Date noticeDate) {
		this.noticeDate = noticeDate;
	}
	
	public double getDefaultRent() {
		return defaultRent;
	}
	public void setDefaultRent(double defaultRent) {
		this.defaultRent = defaultRent;
	}

	public java.util.Date getPlannedCheckOutDate() {
		return plannedCheckOutDate;
	}
	public void setPlannedCheckOutDate(java.util.Date plannedCheckOutDate) {
		this.plannedCheckOutDate = plannedCheckOutDate;
	}
	public String getGuestStatus() {
		return guestStatus;
	}
	public java.util.Date getCheckOutDate() {
		return checkOutDate;
	}
	public void setCheckOutDate(Date checkOutDate) {
		this.checkOutDate = checkOutDate;
	}
	
		
		public String isGuestStatus() {
		return guestStatus;
	}
	public void setGuestStatus(String guestStatus) {
		this.guestStatus = guestStatus;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public String getEmail() {
		return email;
	}
		public Guest(String id, String firstName, String lastName, String email, Date dateOfBirth, String personalNumber,
			String secondaryPhoneNumber, String fatherName, String fatherNumber, String bloodGroup, String occupation,
			String occupancyType, String gender, String aadharNumber, int buildingId, String bedId, int duration,
			double dueAmount, String addressLine1, String addressLine2, String pincode, String city, String state,
			String workPhone, String workAddressLine1, String workAddressLine2, String transactionId,
			String paymentPurpose, double amountToBePaid, double securityDeposit, String guestStatus, Date noticeDate,
			double amountPaid, String checkinNotes, java.util.Date transactionDate, Date checkInDate,
			Date plannedCheckOutDate,Date checkOutDate,
			double defaultRent) {
		super();
		this.id = id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.dateOfBirth = dateOfBirth;
		this.personalNumber = personalNumber;
		this.secondaryPhoneNumber = secondaryPhoneNumber;
		this.fatherName = fatherName;
		this.fatherNumber = fatherNumber;
		this.bloodGroup = bloodGroup;
		this.occupation = occupation;
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
		this.workPhone = workPhone;
		this.workAddressLine1 = workAddressLine1;
		this.workAddressLine2 = workAddressLine2;
		this.transactionId = transactionId;
		this.paymentPurpose = paymentPurpose;
		this.amountToBePaid = amountToBePaid;
		this.securityDeposit = securityDeposit;
		this.guestStatus = guestStatus;
		this.noticeDate = noticeDate;
		this.amountPaid = amountPaid;
		this.checkinNotes = checkinNotes;
		this.transactionDate = transactionDate;
		this.checkInDate = checkInDate;
	
		this.plannedCheckOutDate = plannedCheckOutDate;
		this.checkOutDate = checkOutDate;
		this.defaultRent = defaultRent;
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
	public String getSecondaryPhoneNumber() {
		return secondaryPhoneNumber;
	}
	public void setSecondaryPhoneNumber(String secondaryPhoneNumber) {
		this.secondaryPhoneNumber = secondaryPhoneNumber;
	}
	public String getFatherName() {
		return fatherName;
	}
	public void setFatherName(String fatherName) {
		this.fatherName = fatherName;
	}
	public String getFatherNumber() {
		return fatherNumber;
	}
	public void setFatherNumber(String fatherNumber) {
		this.fatherNumber = fatherNumber;
	}
	public String getBloodGroup() {
		return bloodGroup;
	}
	public void setBloodGroup(String bloodGroup) {
		this.bloodGroup = bloodGroup;
	}
	public String getOccupation() {
		return occupation;
	}
	public void setOccupation(String occupation) {
		this.occupation = occupation;
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
	public String getWorkPhone() {
		return workPhone;
	}
	public void setWorkPhone(String workPhone) {
		this.workPhone = workPhone;
	}
	public String getWorkAddressLine1() {
		return workAddressLine1;
	}
	public void setWorkAddressLine1(String workAddressLine1) {
		this.workAddressLine1 = workAddressLine1;
	}
	public String getWorkAddressLine2() {
		return workAddressLine2;
	}
	public void setWorkAddressLine2(String workAddressLine2) {
		this.workAddressLine2 = workAddressLine2;
	}
	public String getTransactionId() {
		return transactionId;
	}
	public void setTransactionId(String transactionId) {
		this.transactionId = transactionId;
	}
	public String getPaymentPurpose() {
		return paymentPurpose;
	}
	public void setPaymentPurpose(String paymentPurpose) {
		this.paymentPurpose = paymentPurpose;
	}
	public double getAmountToBePaid() {
		return amountToBePaid;
	}
	public void setAmountToBePaid(double amountToBePaid) {
		this.amountToBePaid = amountToBePaid;
	}

	public double getSecurityDeposit() {
		return securityDeposit;
	}
	public void setSecurityDeposit(double securityDeposit) {
		this.securityDeposit = securityDeposit;
	}
	public double getAmountPaid() {
		return amountPaid;
	}
	public void setAmountPaid(double amountPaid) {
		this.amountPaid = amountPaid;
	}
	public String getCheckinNotes() {
		return checkinNotes;
	}
	public void setCheckinNotes(String checkinNotes) {
		this.checkinNotes = checkinNotes;
	}
	public java.util.Date getTransactionDate() {
		return transactionDate;
	}
	public void setTransactionDate(java.util.Date transactionDate) {
		this.transactionDate = transactionDate;
	}
	public Date getCheckInDate() {
		return checkInDate;
	}
	public void setCheckInDate(Date checkInDate) {
		this.checkInDate = checkInDate;
	}
		
	public Guest() {
		super();
		// TODO Auto-generated constructor stub
	}
	public int getDuration() {
		return duration;
	}
	public void setDuration(int duration) {
		this.duration = duration;
	}	

    }
