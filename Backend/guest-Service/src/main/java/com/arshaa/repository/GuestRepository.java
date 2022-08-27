package com.arshaa.repository;

import com.arshaa.entity.Guest;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface GuestRepository extends JpaRepository<Guest, Integer> {
    Guest findById(String guestId);

	Guest getGuestBybedId(String bedId);

	Guest getGuestBybedIdAndGuestStatus(String bedId, String guestStatus);

	Optional<Guest> findByBuildingId(int buildingId);
	
	
	List<Guest> getByBuildingId(int buildingId);

	Optional<List<Guest>> findByBuildingIdAndGuestStatus(int buildingId, String guestStatus);

	List<Guest> findByGuestStatus(String guestStatus);

	Guest getPersonalNumberById(String id);

	Guest getBedIdById(String id );

	Guest getNameById(String id);

		// Find Guest Who are About to checkOut(Regular + Monthly + Daily) .
	@Query(value = "select * from guest where planned_check_out_date IS NOT NULL and guest_status ='InNotice' and occupancy_type ='Regular'\r\n"
			+ "UNION\r\n"
			+ "select * from guest where planned_check_out_date IS NOT NULL and guest_status ='Active' and occupancy_type IN ('Daily','OneMonth'); ", nativeQuery = true)
	List<Guest> findByCheckOut();


	
	
	Guest getEmailById(String id);

	Guest findByPackageId(int id);

//	@Query(value = "CALL PAYMENTS_REMAINDER(:building_id);", nativeQuery = true)
//	List<Guest> findGuestsByBuildingId(@Param("building_id") int buildingId);
}