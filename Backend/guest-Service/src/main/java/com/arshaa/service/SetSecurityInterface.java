package com.arshaa.service;

import java.util.List;
import java.util.Optional;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.arshaa.entity.SecurityDeposit;


public interface SetSecurityInterface {

	
	public SecurityDeposit saveSecurityDeposit(SecurityDeposit security);
	
	public List<SecurityDeposit> getallSecuritydeposit();
	
	
	 public SecurityDeposit  updateSecurityDeposit( Integer id, SecurityDeposit sd);  
	    

	     
	 
}
