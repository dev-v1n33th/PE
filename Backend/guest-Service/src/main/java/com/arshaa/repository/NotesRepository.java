package com.arshaa.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.arshaa.entity.Notes;

public interface NotesRepository extends JpaRepository<Notes, String>
{

	Notes getNotesByGuestId(String guestId);

	Notes getByGuestId(String guestId);
}
