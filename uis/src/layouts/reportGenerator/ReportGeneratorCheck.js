import React, { useState } from 'react';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';


import MDBox from 'components/MDBox';

import { Grid } from '@mui/material';
import DateTimePicker from './Components/DataTimePicker';


import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MDButton from 'components/MDButton';

const INITIAL_FORM_STATE = {
	branch: '',
	reportType: '',
	status: '',
	guestStatus: '',
	checkoutDate: '',
	arrivalDate: ''
};

const FORM_VALIDATION = Yup.object().shape({
	branch: Yup.number().required('Required'),
	reportType: Yup.string().required('Required'),
	status: Yup.number().required('Required'),
	guestStatus: Yup.number().required('Required'),
	checkoutDate: Yup.date().required('Required'),
	arrivalDate: Yup.date().required('Required')
});

const ReportGeneratorForm = () => {
	

	const [ guestStatus, setGuestStatus ] = React.useState('');

	const handleChangeOption = (event) => {
		setGuestStatus(event.target.value);
	};
	const [ branch, setBranch ] = React.useState('');

	const handleChangeRoomType = (event) => {
		setBranch(event.target.value);
	};

	const [ reportType, setReportType ] = React.useState('');

	const handleChangeSharing = (event) => {
		setReportType(event.target.value);
	};

	const [ status, setStatus ] = React.useState('');

	const handleChangeRoomNo = (event) => {
		setStatus(event.target.value);
	};

	const submitField = () => {
		alert('Confirm to Add Fields');
	};

	return (
		<MDBox ml={-30}>
			<div>
				<Formik
					initialValues={INITIAL_FORM_STATE}
					validationSchema={FORM_VALIDATION}
					onSubmit={(values) => {
						//console.log(values);
					}}
				>
					<Form>
						<Grid container spacing={3} pt={1}>
							<Grid item xs={3} mt={1}>
								<h6>Report Type</h6>
								<FormControl fullWidth>
									<Select
										sx={{ minHeight: 44 }}
										labelId="demo-simple-select-label"
										id="demo-simple-select"
										value={branch}
										label="Filter by Branch"
										name="branch"
										onChange={handleChangeRoomType}
									>
										<MenuItem value={11}>Transactions</MenuItem>
										<MenuItem value={12}>Check-In</MenuItem>
										<MenuItem value={13}>Check-Out</MenuItem>
										<MenuItem value={14}>Available Beds</MenuItem>
										<MenuItem value={15}>Available Rooms</MenuItem>
									</Select>
								</FormControl>
							</Grid>
							
							<Grid item xs={3} mt={1}>
								<h6>Select Report Duration</h6>
								<DateTimePicker name="arrivalDate" label="From" />
							</Grid>
							<Grid item xs={3} mt={3.5}>
								<DateTimePicker name="checkoutDate" label="To" />
							</Grid>
							<Grid item xs={3} mt={3.5} justifyContent="center">
								<MDButton variant="outlined" color="info" size="medium" onClick={submitField}>
									Download Report
								</MDButton>
							</Grid>
						</Grid>
					</Form>
				</Formik>
			</div>
		</MDBox>
	);
};
export default ReportGeneratorForm;
