
package com.payment.service;

import com.payment.common.Guest;
import com.payment.common.PaymentRemainderData;
import com.payment.common.PostPayments;
import com.payment.common.Response;
import com.payment.common.THistory;
import com.payment.common.PaymentConfirmation;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.payment.entity.Payments;
import com.payment.model.DueResponse;
import com.payment.model.EmailResponse;
import com.payment.model.EmailTempModel;
import com.payment.model.MonthlySummary;
import com.payment.repos.PayRepos;
import org.springframework.web.client.RestTemplate;

@Service
public class PaymentImplement implements PaymentService {

	// Autowiring the Payment Repository extending JPA Repository .
	@Autowired
	private PayRepos repo;

	@Autowired
	@Lazy
	private RestTemplate template;

	@Autowired
	private EntityManager em;

	Logger log = LoggerFactory.getLogger(PaymentImplement.class);

	// 2.METHOD TO FETCH PAYMENT DETAILS OF ONE PARTICULAR GUEST BY PAYMENTID .
	@Override
	public Payments getPaymentById(int paymentId) {
		// TODO Auto-generated method stub

		return repo.findById(paymentId).orElse(null);
	}

	// 3.METHOD TO UPDATING DATA OF PAYMENT HISTORY BY MANAGER .
	@Override
	public Payments updatePayment(Payments payment) {
		// TODO Auto-generated method stub
		Payments pay = repo.findById(payment.getPaymentId()).orElse(null);
		pay.setAmountPaid(payment.getAmountPaid());
		// pay.setDueAmount(payment.getDueAmount());
		return repo.save(pay);
	}

	// 4.METHOD TO CALL AT THE TIME WHEN USER IS ONBOARDING .
	@Override
	public Payments addPayment(Payments payment) {
		// TODO Auto-generated method stub
		Payments firstPay = new Payments();
		try {
			firstPay.setTransactionId(payment.getTransactionId());
			firstPay.setGuestId(payment.getGuestId());
			firstPay.setOccupancyType(payment.getOccupancyType());
			firstPay.setTransactionDate(payment.getTransactionDate());
			firstPay.setAmountPaid(payment.getAmountPaid());
			firstPay.setPaymentPurpose(payment.getPaymentPurpose());
			firstPay.setBuildingId(payment.getBuildingId());
			// firstPay.setRefundAmount(payment.getRefundAmount());
			// firstPay.setDueAmount(payment.getDueAmount());
			java.sql.Date c = new java.sql.Date(payment.getCreatedOn().getTime());
			payment.setCreatedOn(c);
			firstPay.setCreatedBy(payment.getCreatedBy());
			// firstPay.setCheckinDate(payment.getCheckinDate());
			firstPay.setPaymentPurpose(payment.getPaymentPurpose());

			return repo.save(firstPay);
		} catch (Exception e) {
			e.printStackTrace();
		}
//		/* 1.first dueAmount will be calculated as   dueAmount = count = securityDeposit + roomRent;
//		 * If remainder days is less than 30 and greater than 1 then dueAmount will store as :dueAmount =(roomRent / 30) *remainder;
//		 */
//		if (remainder < 30 && remainder > 1) {
//
//			dueAmount = (defaultRent / 30) * remainder;
//			dueAmount = count + dueAmount;
//		} else if (remainder == 30) {
//			dueAmount = securityDeposit + defaultRent;
//		}	
		return null;
	}

	public Payments getPaymentByGuestId(String guestId) {
		Payments responsePay = repo.findByGuestId(guestId);
		return responsePay;
	}

	// 7.POSTING THE DATA OF GUEST AFTER ONBOARDING .
	@Override
	public String addPaymentAfterOnBoard(PostPayments payment) {
		// String uri = "http://guestService/guest/updateDueAmount";
		String eUri = "http://emailService/mail/sendPaymentConfirmation/";
		  String dueUrl="http://guestService/guest/updateDueAmount/";

		Guest guest = new Guest();
		Payments secondpay = new Payments();
		try {
			// Payments due = repo.findDueAmountByGuestId(payment.getGuestId());
			secondpay.setAmountPaid(payment.getAmountPaid());
			secondpay.setBuildingId(payment.getBuildingId());
			// secondpay.setDueAmount(due.getDueAmount() - payment.getAmountPaid());
			secondpay.setTransactionId(payment.getTransactionId());
			secondpay.setPaymentPurpose(payment.getPaymentPurpose());
			secondpay.setOccupancyType(payment.getOccupancyType());
			secondpay.setGuestId(payment.getGuestId());
//			java.sql.Date tSqlDate = new java.sql.Date(payment.getTransactionDate().getTime());
//			payment.setTransactionDate(tSqlDate);
			java.sql.Date c = new java.sql.Date(payment.getCreatedOn().getTime());
			payment.setCreatedOn(c);

			secondpay.setTransactionDate(secondpay.getTransactionDate());
			secondpay.setRefundAmount(payment.getRefundAmount());
			Payments p = repo.save(secondpay);
			PaymentConfirmation pc = new PaymentConfirmation();

			DueResponse dRes = template.getForObject(
					dueUrl + p.getAmountPaid() + "/" + p.getRefundAmount() + "/" + p.getGuestId(), DueResponse.class);

			String name = template.getForObject("http://guestService/guest/getNameByGuestId/" + secondpay.getGuestId(),
					String.class);
			String email = template.getForObject(
					"http://guestService/guest/getEmailByGuestId/" + secondpay.getGuestId(), String.class);
			String bedId = template.getForObject(
					"http://guestService/guest/getBedIdByGuestId/" + secondpay.getGuestId(), String.class);
			String buildingname = template.getForObject(
					"http://bedService/bed/getBuildingNameByBuildingId/" + secondpay.getBuildingId(), String.class);
			EmailTempModel checkInDate = template.getForObject(
					"http://guestService/guest/getcheckInByGuestId/" + secondpay.getGuestId(), EmailTempModel.class);
			pc.setAmountPaid(payment.getAmountPaid());
			// pc.setDate(tSqlDate);
			pc.setEmail(email);

			pc.setName(name);
			pc.setBedId(bedId);
			pc.setBuildingName(buildingname);
			pc.setTransactionId(payment.getTransactionId());
			pc.setPaymentId(p.getId());
			pc.setAmountPaid(p.getAmountPaid());
			pc.setRefundAmount(p.getRefundAmount());
			pc.setDate(secondpay.getTransactionDate());
			pc.setCheckInDate(checkInDate.getCheckInDate());
			pc.setPurpose(secondpay.getPaymentPurpose());
			EmailResponse pcEmail = template.postForObject(eUri, pc, EmailResponse.class);
//			guest.setId(secondpay.getGuestId());
//			// guest.setDueAmount(secondpay.getDueAmount());
//			// template.put(uri, guest, Guest.class);
			if (pcEmail.isStatus() == true && dRes.isStatus() == true) {
				return "Payment done, Due updated and email also sent successfully";
			} else if (dRes.isStatus() == true) {
				return "Payment done, Due updated";
			} else if (pcEmail.isStatus() == true) {
				return "Payment done, email  sent successfully";
			} else {
				return "Payment done";
			}

		} catch (Exception e) {
			e.printStackTrace();
			return e.getMessage();

		}
	}

	// GET ONLY PENDING PAYMENTS COUNTS .
	@SuppressWarnings("unchecked")
	@Override
	public List<Payments> getPaymentPending() {
		// TODO Auto-generated method stub
		return em.createNamedStoredProcedureQuery("secondProcedure").getResultList();
	}

	// GET TOTAL DUE AMOUNTS VALUE FOR ADMIN .
	@SuppressWarnings("unchecked")
	@Override
	public List<Payments> getOverAllDues() {
		// TODO Auto-generated method stub
		return em.createNamedStoredProcedureQuery("dueDashBoard").getResultList();
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Payments> getBuildingwiseSummary() {

		return em.createNamedStoredProcedureQuery("summary").getResultList();
	}

	@Override
	public List<THistory> getAllTransactions() {
		// TODO Auto-generated method stub
		List<Payments> payment = repo.findAll();
		List<THistory> thist = new ArrayList<>();

		// GuestsInNotice gs=new GuestsInNotice();
		payment.forEach(h -> {
			THistory th = new THistory();
			th.setAmountPaid(h.getAmountPaid());
			th.setGuestId(h.getGuestId());
			String name = template.getForObject("http://guestService/guest/getNameByGuestId/" + h.getGuestId(),
					String.class);
			th.setGuestName(name);
			String buildingName = template.getForObject(
					"http://bedService/bed/getBuildingNameByBuildingId/" + h.getBuildingId(), String.class);
			th.setBuildingName(buildingName);

			String BedName = template.getForObject("http://guestService/guest/getBedIdByGuestId/" + h.getGuestId(),
					String.class);
			th.setBedId(BedName);
			String phone = template.getForObject("http://guestService/guest/getPhoneNumberByGuestId/" + h.getGuestId(),
					String.class);
			th.setPersonalNumber(phone);
			th.setRefundAmount(h.getRefundAmount());
			th.setPaymentPurpose(h.getPaymentPurpose());
			th.setBuildingId(h.getBuildingId());
			th.setTransactionId(h.getTransactionId());
			th.setId(h.getId());

			th.setOccupancyType(h.getOccupancyType());
			thist.add(th);
		});
		return thist;
	}

	@Override
	public ResponseEntity getCountOfPaymentAmount(String guestId) {
		Response response = new Response();
		try {
			long amountPaidCount = repo.getCountOfAmount(guestId);
			long refundAmonutCount = repo.getCountOfRefundAmount(guestId);
			PaymentRemainderData count = new PaymentRemainderData();
			count.setTotalAmountPaid(amountPaidCount);

			count.setTotalRefundAmount(refundAmonutCount);

			return new ResponseEntity(count, HttpStatus.OK);
		} catch (Exception e) {
			response.setStatus(false);
			response.setMessage("something went wrong");

			return new ResponseEntity(response, HttpStatus.OK);

		}

	}

	@Override
	public ResponseEntity getMonthlySummary(int month, int year, int buildingId) {

		Response response = new Response();
		MonthlySummary ms = new MonthlySummary();
		try {
			double incomeAmount = repo.getCountOfAmountPaidByBuildingId(month, year, buildingId);
			double refundAmount = repo.getCountOfRefundByBuildingId(month, year, buildingId);
			ms.setIncomeAmount(incomeAmount);
			ms.setRefundAmount(refundAmount);
			response.setStatus(true);
			response.setData(ms);
			return new ResponseEntity<>(response, HttpStatus.OK);
		} catch (Exception e) {
			response.setStatus(true);
			response.setData(null);
			return new ResponseEntity<>(response, HttpStatus.OK);

		}

	}

}
