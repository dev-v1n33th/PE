package com.arshaa.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.arshaa.entity.GuestProfile;

@Repository
public interface GuestProfileRepo extends JpaRepository<GuestProfile, String>{

	//GuestProfile findByEmployeeId(String id);

	GuestProfile findByGuestId(String id);
	boolean existsByGuestId(String id);
}
