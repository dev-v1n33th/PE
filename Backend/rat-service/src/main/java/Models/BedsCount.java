package Models;

public class BedsCount {

	private int totalBeds;
	private int totalAvailbleBeds;
	
	
	public int getTotalBeds() {
		return totalBeds;
	}

	public void setTotalBeds(int totalBeds) {
		this.totalBeds = totalBeds;
	}


	public int getTotalAvailbleBeds() {
		return totalAvailbleBeds;
	}


	public void setTotalAvailbleBeds(int totalAvailbleBeds) {
		this.totalAvailbleBeds = totalAvailbleBeds;
	}


	public BedsCount(int totalBeds, int totalAvailbleBeds) {
		super();
		this.totalBeds = totalBeds;
		this.totalAvailbleBeds = totalAvailbleBeds;
	}


	public BedsCount() {
		// TODO Auto-generated constructor stub
	}

}
