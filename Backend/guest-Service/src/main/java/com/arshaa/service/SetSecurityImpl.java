package com.arshaa.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.arshaa.entity.SecurityDeposit;
import com.arshaa.repository.SetSecurityDepositRepo;


@Service
public class SetSecurityImpl implements SetSecurityInterface {

	@Autowired
	private SetSecurityDepositRepo setRepos ;

	@Override
	public SecurityDeposit saveSecurityDeposit(SecurityDeposit security) {
		// TODO Auto-generated method stub
		try {
		 return setRepos.save(security);
		}catch(Exception e) {
			System.out.println(e.getMessage());
		}
		return security;
	}

	@Override
	public List<SecurityDeposit> getallSecuritydeposit() {
		// TODO Auto-generated method stub
	try {
		return setRepos.findAll();
	}catch(Exception e) {
		System.out.println("cant give Result " + e.getLocalizedMessage());
	}
	return null;

	}

	@Override
	public SecurityDeposit updateSecurityDeposit(Integer id, SecurityDeposit sd) {
		Optional<SecurityDeposit> s =  setRepos.findById(id);

	     if (s.isPresent()) {
	    	 SecurityDeposit securities  = setRepos.getById(id);
	      
	    	 securities.setSecuritydeposit(sd.getSecuritydeposit());
	        
	         return setRepos.save(securities);
	     } else
	         return null;
	}
}
