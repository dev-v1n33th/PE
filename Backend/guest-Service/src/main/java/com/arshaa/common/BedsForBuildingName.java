package com.arshaa.common;

import javax.persistence.Column;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.fasterxml.jackson.annotation.JsonFormat;

public class BedsForBuildingName {

	private int buildingId;
	@Column
	private String buildingName;
	@Column
	private String createdBy;
	@JsonFormat(pattern = "dd/MM/yyyy")
	@Temporal(TemporalType.TIMESTAMP)
	private java.util.Date createdOn = new java.util.Date(System.currentTimeMillis());
	public int getBuildingId() {
		return buildingId;
	}
	public void setBuildingId(int buildingId) {
		this.buildingId = buildingId;
	}
	public String getBuildingName() {
		return buildingName;
	}
	public void setBuildingName(String buildingName) {
		this.buildingName = buildingName;
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
