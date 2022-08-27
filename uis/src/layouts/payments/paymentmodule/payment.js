import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Container, Grid, Typography } from '@mui/material';
import Textfield from '../Components/Textfield';
import Button from '../Components/Button';
import moment from 'moment';
import Divider from '@mui/material/Divider';
import DateTimePicker from '../Components/DataTimePicker';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MDButton from 'components/MDButton';
import MDTypography from 'components/MDTypography';

function createData(name, calories, fat, carbs, protein) {
	return { name, calories, fat, carbs, protein };
}

const rows = [
	createData(1, '1 Sharing', 18000, 20000),
	createData(2, '2 Sharing', 10000, 11500),
	createData(3, '3 Sharing', 7500, 8500),
	createData(4, '4 Sharing', 6500, 7500)
];

const INITIAL_FORM_STATE = {
	paymentAmount: '',
	guestId: '',
	PaymentTowards: '',
	paymentMethod: '',
	transactionId: '',
	transactionDate: '',
	checkinNotes: ''
};

const FORM_VALIDATION = Yup.object().shape({
	paymentAmount: Yup.number().required('Required'),
	guestId: Yup.number().required('Required'),
	PaymentTowards: Yup.string().required('Required'),
	paymentMethod: Yup.string().required('Required'),
	transactionId: Yup.number().required('Required'),
	transactionDate: Yup.date().required('Required'),
	checkinNotes: Yup.string().required('Required')
});

const Payments = () => {
	//const classes = useStyles();

	const [ property, setProperty ] = React.useState('');

	const handleChangeOption = (event) => {
		setProperty(event.target.value);
	};
	const [ roomType, setRoomType ] = React.useState('');

	const handleChangeRoomType = (event) => {
		setRoomType(event.target.value);
	};

	const [ sharing, setSharing ] = React.useState('');

	const handleChangeSharing = (event) => {
		setSharing(event.target.value);
	};

	const [ roomNo, setRoomNo ] = React.useState('');

	const handleChangeRoomNo = (event) => {
		setRoomNo(event.target.value);
	};

	const [ bedNo, setBedNo ] = React.useState('');

	const handleChangeBedNo = (event) => {
		setBedNo(event.target.value);
	};

	const [ shelfNo, setShelfNo ] = React.useState('');

	const handleChangeShelfNo = (event) => {
		setShelfNo(event.target.value);
	};

	const submitField = () => {
		alert('Conirm to Add Fields');
	};

	return (
		<Grid container>
			<Grid item xs={12}>
				<Container maxWidth="md">
					<MDTypography>
						<h4>Record a Payment</h4>
					</MDTypography>

					<br />
					<div>
						<Formik
							initialValues={INITIAL_FORM_STATE}
							validationSchema={FORM_VALIDATION}
							onSubmit={(values) => {
								//console.log(values);
							}}
						>
							<Form>
								<Grid container spacing={2}>
									<Grid item xs={4}>
										<FormControl fullWidth>
											<InputLabel id="demo-simple-select-label">Guest Id</InputLabel>
											<Select
												sx={{ minHeight: 44 }}
												labelId="demo-simple-select-label"
												id="demo-simple-select"
												value={sharing}
												label="Sharing"
												onChange={handleChangeSharing}
											>
												<MenuItem value={13}>01</MenuItem>
												<MenuItem value={14}>02</MenuItem>
												<MenuItem value={15}>03 </MenuItem>
												<MenuItem value={16}>04</MenuItem>
											</Select>
										</FormControl>
									</Grid>
									<Grid item xs={4}>
										<FormControl fullWidth>
											<InputLabel id="demo-simple-select-label">Payment Towards</InputLabel>
											<Select
												sx={{ minHeight: 41 }}
												labelId="demo-simple-select-label"
												id="demo-simple-select"
												value={roomType}
												label="Payment Towards"
												name="PaymentTowards"
												onChange={handleChangeRoomType}
											>
												<MenuItem value={11}>Monthly Rent</MenuItem>
												<MenuItem value={12}>Daily Rent</MenuItem>
												<MenuItem value={12}>Security Deposit</MenuItem>
												<MenuItem value={12}>Maintenence Charge</MenuItem>
											</Select>
										</FormControl>
									</Grid>
									<Grid item xs={4}>
										<Textfield name="Payment Amount" label="Payment Amount" />
									</Grid>
									<Grid item xs={4}>
										<FormControl fullWidth>
											<InputLabel id="demo-simple-select-label">Payment Method</InputLabel>
											<Select
												sx={{ minHeight: 44 }}
												labelId="demo-simple-select-label"
												id="demo-simple-select"
												value={roomNo}
												name="paymentMethod"
												label="Payment Method"
												onChange={handleChangeRoomNo}
											>
												<MenuItem value={17}>Cash</MenuItem>
												<MenuItem value={18}>UPI</MenuItem>
												<MenuItem value={19}>PAYTM</MenuItem>
											</Select>
										</FormControl>
									</Grid>
									<Grid item xs={4}>
										<Textfield name="transactionId" label="Transaction Id" />
									</Grid>
									<Grid item xs={4}>
										<DateTimePicker name="transactionDate" label="Transaction Date" />
									</Grid>

									<Grid item xs={12}>
										<Textfield name="checkinNotes" label="Remarks" multiline={true} rows={4} />
									</Grid>

									<Divider variant="middle" />
									<Grid item xs={2} justifyContent="center">
										<MDButton variant="outlined" color="info" size="large" onClick={submitField}>
											Submit
										</MDButton>{' '}
									</Grid>
									<Grid item xs={2} justifyContent="center" color="white">
										<MDButton variant="outlined" color="info" size="large">
											Cancel
										</MDButton>{' '}
									</Grid>
								</Grid>
							</Form>
						</Formik>
						<br />
					</div>
				</Container>
			</Grid>
		</Grid>
	);
};
export default Payments;
