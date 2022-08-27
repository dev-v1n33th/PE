package Models;

import java.util.List;

import common.Guest;
import common.Response;

public class BedsInfo<E> {
	private boolean bedStatus;
	private String guestId;
	private double defaultRent;
	private boolean ac;
	private int roomId;
	private int floorId;
	private int buildingId;
	private String bedName;
	private String bedId;
	private String buildingName;
	private int bedNum;
	private String name;
    private double dueAmount;
	  private byte[] url;
	  private String type;
	  private long size;
		private String guestName;
	private Guest guest;
    private String guestStatus;
    private int sharing;
    private List<E> guestDue;
    
    
    
    private Object data;
    
    
    
    
	public List<E> getGuestDue() {
		return guestDue;
	}
	public void setGuestDue(List<E> guestDue) {
		this.guestDue = guestDue;
	}
	public double getDueAmount() {
		return dueAmount;
	}
	public void setDueAmount(double dueAmount) {
		this.dueAmount = dueAmount;
	}
	public int getSharing() {
		return sharing;
	}
	public void setSharing(int sharing) {
		this.sharing = sharing;
	}
	public boolean isBedStatus() {
		return bedStatus;
	}
	public void setBedStatus(boolean bedStatus) {
		this.bedStatus = bedStatus;
	}
	public String getGuestId() {
		return guestId;
	}
	public void setGuestId(String guestId) {
		this.guestId = guestId;
	}
	public double getDefaultRent() {
		return defaultRent;
	}
	public void setDefaultRent(double defaultRent) {
		this.defaultRent = defaultRent;
	}
	public boolean isAc() {
		return ac;
	}
	public void setAc(boolean ac) {
		this.ac = ac;
	}
	public int getRoomId() {
		return roomId;
	}
	public void setRoomId(int roomId) {
		this.roomId = roomId;
	}
	public int getFloorId() {
		return floorId;
	}
	public void setFloorId(int floorId) {
		this.floorId = floorId;
	}
	public int getBuildingId() {
		return buildingId;
	}
	public void setBuildingId(int buildingId) {
		this.buildingId = buildingId;
	}
	public String getBedName() {
		return bedName;
	}
	public void setBedName(String bedName) {
		this.bedName = bedName;
	}
	public String getBedId() {
		return bedId;
	}
	public void setBedId(String bedId) {
		this.bedId = bedId;
	}
	public String getBuildingName() {
		return buildingName;
	}
	public void setBuildingName(String buildingName) {
		this.buildingName = buildingName;
	}
	public int getBedNum() {
		return bedNum;
	}
	public void setBedNum(int bedNum) {
		this.bedNum = bedNum;
	}
	
	public String getGuestName() {
		return guestName;
	}
	public void setGuestName(String guestName) {
		this.guestName = guestName;
	}
	public Guest getGuest() {
		return guest;
	}
	public void setGuest(Guest guest) {
		this.guest = guest;
	}
	public String getGuestStatus() {
		return guestStatus;
	}
	public void setGuestStatus(String guestStatus) {
		this.guestStatus = guestStatus;
	}
	
	
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public byte[] getUrl() {
		return url;
	}
	public void setUrl(byte[] bs) {
		this.url = bs;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public long getSize() {
		return size;
	}
	public void setSize(long size) {
		this.size = size;
	}
	public BedsInfo() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Object getData() {
		return data;
	}
	public void setData(Object object) {
		this.data = object;
	}

	 
	
}
