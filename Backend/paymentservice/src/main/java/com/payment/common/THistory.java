package com.payment.common;

import java.util.Date;

import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.fasterxml.jackson.annotation.JsonFormat;

public class THistory {
	
	

	private int id ;
	private double amountPaid;
	private int buildingId ;
	private String transactionId;
	@JsonFormat(pattern="dd-MM-yyyy HH:mm:ss", timezone="IST")
	@Temporal(TemporalType.TIMESTAMP)
	private Date transactionDate = new Date(System.currentTimeMillis());
	//private Date checkinDate;
	private String paymentPurpose;
	private String occupancyType;
	private double refundAmount ;
	private String email ;
	private String GuestName ;
	// private String lastName ;
	private String buildingName ;
	private String personalNumber ;
	private String bedId ; private String GuestId ;

	public int getId() {
		return id;
	}



	public void setId(int id) {
		this.id = id;
	}



	public double getAmountPaid() {
		return amountPaid;
	}



	public void setAmountPaid(double amountPaid) {
		this.amountPaid = amountPaid;
	}



	public int getBuildingId() {
		return buildingId;
	}



	public void setBuildingId(int buildingId) {
		this.buildingId = buildingId;
	}



	public String getTransactionId() {
		return transactionId;
	}



	public void setTransactionId(String transactionId) {
		this.transactionId = transactionId;
	}



	public Date getTransactionDate() {
		return transactionDate;
	}



	public void setTransactionDate(Date transactionDate) {
		this.transactionDate = transactionDate;
	}



	public String getPaymentPurpose() {
		return paymentPurpose;
	}



	public void setPaymentPurpose(String paymentPurpose) {
		this.paymentPurpose = paymentPurpose;
	}



	public String getOccupancyType() {
		return occupancyType;
	}



	public void setOccupancyType(String occupancyType) {
		this.occupancyType = occupancyType;
	}



	public double getRefundAmount() {
		return refundAmount;
	}



	public void setRefundAmount(double refundAmount) {
		this.refundAmount = refundAmount;
	}



	public String getEmail() {
		return email;
	}



	public void setEmail(String email) {
		this.email = email;
	}



	public String getGuestName() {
		return GuestName;
	}



	public void setGuestName(String guestName) {
		GuestName = guestName;
	}



	public String getBuildingName() {
		return buildingName;
	}



	public void setBuildingName(String buildingName) {
		this.buildingName = buildingName;
	}



	public String getPersonalNumber() {
		return personalNumber;
	}



	public void setPersonalNumber(String personalNumber) {
		this.personalNumber = personalNumber;
	}



	public String getBedId() {
		return bedId;
	}



	public void setBedId(String bedId) {
		this.bedId = bedId;
	}



	public String getGuestId() {
		return GuestId;
	}



	public void setGuestId(String guestId) {
		GuestId = guestId;
	}




	

	public THistory(int id, double amountPaid, int buildingId, String transactionId, Date transactionDate,
			String paymentPurpose, String occupancyType, double refundAmount, String email, String guestName,
			String buildingName, String personalNumber, String bedId, String guestId) {
		super();
		this.id = id;
		this.amountPaid = amountPaid;
		this.buildingId = buildingId;
		this.transactionId = transactionId;
		this.transactionDate = transactionDate;
		this.paymentPurpose = paymentPurpose;
		this.occupancyType = occupancyType;
		this.refundAmount = refundAmount;
		this.email = email;
		GuestName = guestName;
		this.buildingName = buildingName;
		this.personalNumber = personalNumber;
		this.bedId = bedId;
		GuestId = guestId;
	}



	public THistory() {
		// TODO Auto-generated constructor stub
	}

}
