package Models;

import common.MonthlySummary;

public class Response<T> {

	private boolean status;
	private MonthlySummary data;
	public boolean isStatus() {
		return status;
	}
	public void setStatus(boolean status) {
		this.status = status;
	}
	public MonthlySummary getData() {
		return data;
	}
	public void setData(MonthlySummary data) {
		this.data = data;
	}
	
}
