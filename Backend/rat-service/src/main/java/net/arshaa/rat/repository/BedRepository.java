package net.arshaa.rat.repository;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import net.arshaa.rat.entity.Bed;

public interface BedRepository extends JpaRepository<Bed, Integer>{

    Optional<List<Bed>> findByroomId(Integer id);
    //List<Bed> findBybuildingId(Integer id);
    List<Bed> findByBedStatus(Boolean status);
    //List<Bed> findByBedStatusandId(int id, Boolean status);
    Optional<List<Bed>> findByroomIdAndBedStatus(int roomId, boolean b);
    Optional<List<Bed>> findBybuildingIdAndBedStatus(int building_id, boolean b);
    //List<Bed> findByBedStatusAndbuildingId(boolean b, int building_id);
    Bed findByBedId(String bedId);
    Bed findByGuestId(String guestId);
     boolean findBedStatusByRoomId(int roomId);
    //Bed getBedByBuildingId(int buildingId);

    List<Bed> findAllByBuildingId(int buildingId);
	boolean existsByBedId(String bedId);
	List<Bed> getBedsByRoomId(int roomId);
	//Optional<List<Bed>> findByRoomIdAndBedStatusAndSharing(int roomId, boolean b, int sharing);

	@Query(
			 value="select count(sharing)  from  beds  where  room_id= ?1  and bed_status=true " , nativeQuery = true)
	        int countSharing(@Param("a")  int a);
	
	
//	@Query(value="select  count(sharing) from  beds  where room_id=?1  and bed_status=true " , nativeQuery = true)
//	 int  CalculateSharingByRoomId(@Param("roomId") int  roomId);
/*
 *  @Query(value="select count(employee_id) from employeeleaves where employee_id=?1 and leave_status = 'approved'", nativeQuery=true)
     int findcountByapproveleavestatus(@Param("empid") String empid);
 */
}
