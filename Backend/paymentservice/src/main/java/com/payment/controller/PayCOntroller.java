package com.payment.controller;

import java.sql.Date;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

import javax.ws.rs.GET;


import com.payment.common.PaymentHistory;
import com.payment.common.PendingPayments;
import com.payment.common.PostPayments;
import com.payment.common.RecentTransactions;
import com.payment.common.THistory;
import com.payment.repos.PayRepos;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import com.payment.entity.Payments;
import com.payment.service.PaymentService;

@RestController
@CrossOrigin("*")
@RequestMapping("/payment")
public class PayCOntroller {

	@Autowired
	private PaymentService serve;
	
	@Autowired
	@Lazy
	private RestTemplate template;	

	@Autowired
	private PayRepos repos;

	// http://localhost:8989/payment/addPaymentAtOnBoarding
	// ADDING PAYMENT AT ONBOARDING TIME .
	@PostMapping("/addPaymentAtOnBoarding")
	public Payments addPayment(@RequestBody Payments payment) {
		return this.serve.addPayment(payment);
	}
	{
	
	}

	// http://localhost:8989/payment/updatePaymentByPaymentId/{paymentId}
	// UPDATING PAYMENT BASED ON PAYMENT ID.
	@PutMapping("/updatePaymentByPaymentId/{paymentId}")
	public Payments updatePayment(@RequestBody Payments payment) {
		return this.serve.updatePayment(payment);
	}

	// http://localhost:8989/payment/getPaymentDetail/{paymentId}
	// RETRIEVE PAYMENT DETAILS BASED ON PAYMENT ID .
	@GetMapping("/getPaymentDetail/{paymentId}")
	public Payments getPaymentById(@PathVariable int paymentId) {
		return this.serve.getPaymentById(paymentId);
	}

	// GET THE TRANSACTION HISTORY BASED ON GUESTID .
	@GetMapping("/getPaymentByGuestId/{guestId}")
	public Payments findByGuestId(@PathVariable String guestId) {
		return this.serve.getPaymentByGuestId(guestId);
	}

	// POSTING INFORMATION OF PAYMENT BASED ON GUEST TYPE .
	@PostMapping("/addAfterOnBoard")
	public String addPaymentAfterOnBoar(@RequestBody PostPayments payment) {
		return this.serve.addPaymentAfterOnBoard(payment);
	}

	@GetMapping("/getTrasactionHistoryByGuestId/{guestId}")
	public List<Payments> findTransactionsByGuestId(@PathVariable String guestId) {
		return repos.findAllPaymentsByGuestId(guestId);
	}
	//#############Get All Transaction *************************
	@GetMapping("/getAllTransactions")
	public List<THistory> getAllTransaction(){
	return this.serve.getAllTransactions();
	}

	// GET RECENT TRANSACTIONS .
	@GetMapping("/getRecentPayments")
	public List<RecentTransactions> getResentTransactions(@RequestParam String field) {
		List<RecentTransactions> recent = new ArrayList<>();
		
		if (field.equals("date")) {
			Optional<List<Payments>> pay = repos.findTop30AllByOrderByTransactionDateDesc();
			if (pay.isPresent()) {
				pay.get().forEach(payment -> {
					RecentTransactions rt = new RecentTransactions();
					rt.setAmountPaid(payment.getAmountPaid());
					rt.setGuestId(payment.getGuestId());
					String name = template.getForObject("http://guestService/guest/getNameByGuestId/" + payment.getGuestId(),
							String.class);
					rt.setGuestName(name);
					// rt.setPaymentId(payment.getPaymentId());
					rt.setId(payment.getPaymentId());
					rt.setPaymentPurpose(payment.getPaymentPurpose());
					SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss");
					rt.setTransactionDate(payment.getTransactionDate());
					rt.setTransactionId(payment.getTransactionId());
					rt.setBuildingId(payment.getBuildingId());
					recent.add(rt);
				});
			}	}
		return recent;   }
	
	
	
	
	//API FOR GET RECENT TRANSACTION BASED ON BUILDING ID ;
	
		@GetMapping("/getBuildingwisePaymentSummary/{buildingId}")
	public List<PaymentHistory> getPaymentsByBuildingId(@PathVariable int buildingId) {
		List<PaymentHistory>  hist = new ArrayList<>();
		Optional<List<Payments>>  pay = repos.findPaymentsByBuildingId(buildingId);
		//pay.setBuildingId(buildingId);
		if(pay.isPresent()) {
		pay.get().forEach(pays -> {  
			PaymentHistory ph = new PaymentHistory ();
			ph.setId(pays.getId());
			ph.setAmountPaid(pays.getAmountPaid());
		ph.setGuestId(pays.getGuestId());
			ph.setTransactionId(pays.getTransactionId());
			ph.setBuildingId(pays.getBuildingId());
			hist.add(ph);
		});
		
		}
		
		return  hist ;
	}
		// API CALL FOR FETCHING OVERALL DUE AMOUNT
		@GetMapping("/fetchingOverAllDueAmount")
		public List<Payments> getOverAllDues() {
			return serve.getOverAllDues();
		}

		@GetMapping("/getpendingPayment")
		List<Payments> getPaymentPendings() {
			return serve.getPaymentPending();
		}
		
		@GetMapping("/getBuildingwiseSummary")
		public List<Payments> getBuildingwiseSummary(){
			return this.serve.getBuildingwiseSummary();
		}
		


//    @GetMapping("/getLastDueAmount/{guestId}")
//    public void getLastDueAmount(@PathVariable String guestId){
//       List<Payments> allPayments =  repos.findPaymentsByGuestId(guestId);
//        System.out.println(allPayments);
//       Date max  = (Date) allPayments.stream().map(Payments::getTransactionDate).max(Date::compareTo).get();
//    }

	/*
	 * @GetMapping("/pendingPayments") public PendingPayments getPendingPayments() {
	 * // TODO Auto-generated method stub // Payment
	 * getpayment=repos.findAllGuests(); Payments payments = new Payments(); //
	 * Payment getGuests=repos.findByGuestId(payments.getGuestId()); PendingPayments
	 * pp = new PendingPayments(); // List<Payment>
	 * pay=repos.findPaymentByGuestId(payments.getGuestId()); List<Payments> p =
	 * repos.getDueAmountByGuestId(payments.getGuestId());
	 * 
	  if (p.isEmpty()) { p.forEach(pay -> { int count = p.size(); if
	 * (pay.getDueAmount() > 0) { int c = p.size(); pp.setPendingPayments(c); } else
	 * if (pay.getDueAmount() < 0) { int f = p.size(); } }); } //
	 * pp.setPendingPayments(c); return pp;
	 * 
	 * }
	 */
		
//		@GetMapping("/getTrasactionHistoryByGuestId/{guestId}")
//		public List<PaymentHistory> findTransactionsByGuestId(@PathVariable String guestId) {
//			List<PaymentHistory> recent = new ArrayList<>();
//		Optional<List<Payments>> p=repos.findAllPaymentsByGuestId(guestId);
//		if(p.isPresent())
//		{
//			p.get().forEach(pay->{
//				PaymentHistory ph=new PaymentHistory();
//				ph.setAmountPaid(pay.getAmountPaid());
//				ph.setBuildingId(pay.getBuildingId());
//				ph.setGuestId(pay.getGuestId());
//				SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss");
//				ph.setTransactionDate(formatter.format(pay.getTransactionDate()));
//				ph.setTransactionId(pay.getTransactionId());
//				recent.add(ph);
//
//			});		
//		}
//		 return recent; 
//		}


		@GetMapping("/getCountOfPaymentAmount/{guestId}")
		public ResponseEntity getCountOfPaymentAmount(@PathVariable String guestId) {
           return serve.getCountOfPaymentAmount(guestId);
		}
		
		@GetMapping("/getMonthlySummary/{month}/{year}/{buildingId}")
		public ResponseEntity getMonthlySummary(@PathVariable int month,@PathVariable int year,@PathVariable int buildingId) {
			return serve.getMonthlySummary(month, year,buildingId);
		}
		
}
