package com.arshaa.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.arshaa.entity.Notes;
import com.arshaa.repository.NotesRepository;

import antlr.collections.List;

@Service
public class NotesServiceImpl implements NotesService{

	@Autowired
	private NotesRepository nRepo;
	
	
	@Override
	public ResponseEntity addData(Notes notes) {
		
		try {
			Notes  notes1= nRepo.save(notes);
			return new ResponseEntity<>("data posted successfull",HttpStatus.OK);		
		}
		catch(Exception e)
		{
			return new ResponseEntity("something went wrong", HttpStatus.OK);
		}
	}

	@Override
	public ResponseEntity<List> getData() {
		
		try {
			java.util.List<Notes> notes= nRepo.findAll();
			return new ResponseEntity(notes,HttpStatus.OK);
		}
		catch(Exception e)
		{
			return new ResponseEntity("Something went wrong",HttpStatus.OK);
		}
	}

	@Override
	public ResponseEntity getNoteById(String GuestId) {

		try {
			Notes getNote=nRepo.getNotesByGuestId(GuestId);
		    if(getNote.equals(null))
		    {
		    	return new ResponseEntity(getNote,HttpStatus.OK);
		    }
		    else {
		    	return new ResponseEntity(getNote,HttpStatus.OK);

		    }
		}
		catch(Exception e)
		{
			
	    	return new ResponseEntity(e.getMessage(),HttpStatus.OK);
		}
	}

//	@Override
//	public ResponseEntity updateDataById(int id, Notes notes) {
//		try
//		{
//			Notes notes1 = repo.findById(notes1.getId().orElse(null))
//		}
//		catch(Exception e)
//		{
//			
//		}
//	}

//	@Override
//	public ResponseEntity deleteDataById(int id) {
//		// TODO Auto-generated method stub
//		return null;
//	}

}
