package com.arshaa.entity;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.fasterxml.jackson.annotation.JsonFormat;
@Entity
public class Notes {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	private String guestId;
	private String notes;
	
    private String createdBy;
    @JsonFormat(pattern="dd-MM-yyyy HH:mm:ss", timezone="IST")
    @Temporal(TemporalType.TIMESTAMP)
    private java.util.Date createdOn = new java.util.Date(System.currentTimeMillis());
	
    
    public Notes() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Notes(int id, String guestId, String notes, String createdBy, Date createdOn) {
		super();
		this.id = id;
		this.guestId = guestId;
		this.notes = notes;
		this.createdBy = createdBy;
		this.createdOn = createdOn;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getGuestId() {
		return guestId;
	}
	public void setGuestId(String guestId) {
		this.guestId = guestId;
	}
	public String getNotes() {
		return notes;
	}
	public void setNotes(String notes) {
		this.notes = notes;
	}
	public String getCreatedBy() {
		return createdBy;
	}
	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}
	public java.util.Date getCreatedOn() {
		return createdOn;
	}
	public void setCreatedOn(java.util.Date createdOn) {
		this.createdOn = createdOn;
	}
    
    
}
