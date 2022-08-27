package com.arshaa.service;

import org.springframework.http.ResponseEntity;

import com.arshaa.entity.Notes;

import antlr.collections.List;

public interface NotesService 
{
 public ResponseEntity addData(Notes notes);
 public ResponseEntity<List> getData();
 public ResponseEntity getNoteById(String GuestId);
 
// public ResponseEntity updateDataById(int id,Notes notes);
// public ResponseEntity deleteDataById(int id);
}
