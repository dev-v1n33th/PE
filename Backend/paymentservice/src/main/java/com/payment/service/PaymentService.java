package com.payment.service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.payment.common.PostPayments;
import com.payment.common.THistory;

//import static java.text.NumberFormat.getCurrencyInstance;
//import javax.persistence.Enumerated;

import com.payment.entity.Payments;

public interface PaymentService {

	// 2. FETCHING PAYMENT DETAILS BY PARTICULAR GUESTID
	public Payments getPaymentByGuestId(String guestId);

	// 3.FETCHING PAYMENTS DETAILS BY PAYMENTID .
	public Payments getPaymentById(int paymentId);

	// 4. METHOD TO UPDATING DATA OF PAYMENT HISTORY BY MANAGER .
	public Payments updatePayment(Payments payment);

	// 5. METHOD TO CALL AT THE TIME WHEN USER IS ONBOARDING .
	public Payments addPayment(Payments payment);

    //7.POSTING THE DATA OF GUEST AFTER ONBOARDING .
	public String addPaymentAfterOnBoard(PostPayments payment);

	// GET ONLY PENDING PAYMENTS COUNTS .
	public List<Payments> getPaymentPending();

	// GET TOTAL DUE AMOUNTS VALUE FOR ADMIN .
	public List<Payments> getOverAllDues();
	
	public List<Payments> getBuildingwiseSummary();

	public List<THistory> getAllTransactions();
	
	public ResponseEntity getCountOfPaymentAmount(String guestId);
	
	public ResponseEntity getMonthlySummary(int month, int year, int buildingId);
	}
