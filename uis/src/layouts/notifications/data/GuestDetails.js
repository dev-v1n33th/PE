import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
	{ field: 'id', headerName: 'SLNO', width: 70 },
	{ field: 'bedId', headerName: 'BED ID', width: 130 },
	{ field: 'name', headerName: 'NAME', width: 130 },
	{
		field: 'phone',
		headerName: 'PHONE NO.',
		width: 130
	},
	{ field: 'doj', headerName: 'DOJ', width: 130 },
	{ field: 'sd', headerName: 'SD', type: 'number', width: 130 },
	{ field: 'mrent', headerName: 'MONTHLY RENT', type: 'number', width: 150 },
	{ field: 'due', headerName: 'DUE', type: 'number', width: 130 },
	{ field: 'rent', headerName: 'JAN 22 RENT', type: 'number', width: 130 },
	{ field: 'recvRent', headerName: 'RECV RENT', type: 'number', width: 130 },
	{ field: 'txnno', headerName: 'TXN NO.', width: 130 },
	{ field: 'recvDate', headerName: 'RECEIVED DATE', width: 130 },
	{ field: 'due2', headerName: 'DUE', type: 'number', width: 130 },
	{ field: 'doNotice', headerName: 'DATE OF NOTICES', width: 180 },
	{ field: 'checkOut', headerName: 'CHECK OUT', width: 130 },
	{ field: 'remarks', headerName: 'REMARKS', width: 130 }
];

const rows = [
	{
		id: 1,
		bedId: 'G1A',
		name: 'Prashanth',
		phone: '9473848373',
		doj: '25-Nov-21',
		sd: 5000,
		mrent: 7500,
		due: 0,
		rent: 7500,
		recvRent: '',
		txnno: '',
		recvDate: '',
		due2: 7500,
		doNotice: '',
		checkOut: '',
		remarks: ''
	},
	{
		id: 2,
		bedId: 'G1B',
		name: 'Avinash. M',
		phone: '8858488383',
		doj: '09-Sep-21',
		sd: 5000,
		mrent: 7500,
		due: 0,
		rent: 7500,
		recvRent: '',
		txnno: '',
		recvDate: '',
		due2: 7500,
		doNotice: '',
		checkOut: '',
		remarks: ''
	},
	{
		id: 3,
		bedId: 'G2A',
		name: 'Rahul. p',
		phone: '7694858393',
		doj: '05-Jun-21',
		sd: 5000,
		mrent: 7500,
		due: 0,
		rent: 7500,
		recvRent: '',
		txnno: '',
		recvDate: '',
		due2: 7500,
		doNotice: '',
		checkOut: '',
		remarks: ''
	},
	{
		id: 4,
		bedId: 'G2B',
		name: 'G. Ravi Shankar',
		phone: '9384883284',
		doj: '06-Sep-21',
		sd: 0,
		mrent: 7500,
		due: 0,
		rent: 7500,
		recvRent: '',
		txnno: '',
		recvDate: '',
		due2: 7500,
		doNotice: '',
		checkOut: '',
		remarks: ''
	},
	{
		id: 5,
		bedId: 'G2C',
		name: 'J. Vinay Kumar Reddy',
		phone: '7939292948',
		doj: '12-Dec-21',
		sd: 0,
		mrent: 8000,
		due: 0,
		rent: 0,
		recvRent: '',
		txnno: '',
		recvDate: '',
		due2: 0,
		doNotice: '',
		checkOut: '',
		remarks: ''
	},
	{
		id: 6,
		bedId: 'G3B A/C',
		name: 'N. nageswar Rao',
		phone: '9658685939',
		doj: '30-Mar-21',
		sd: 5000,
		mrent: 8500,
		due: 0,
		rent: 8500,
		recvRent: '8500',
		txnno: 'UPI-200308071604',
		recvDate: '03-01-22',
		due2: 0,
		doNotice: '',
		checkOut: '',
		remarks: ''
	},
	{
		id: 7,
		bedId: 'G3C A/C',
		name: 'Aravind. Y',
		phone: '7849394959',
		doj: '14-Sep-21',
		sd: 4000,
		mrent: 8500,
		due: 0,
		rent: 8500,
		recvRent: '',
		txnno: '',
		recvDate: '',
		due2: 8500,
		doNotice: '',
		checkOut: '',
		remarks: ''
	}
];

export default function DataTable() {
	return (
		<div style={{ height: 400, width: '100%' }}>
			<DataGrid rows={rows} columns={columns} pageSize={5} rowsPerPageOptions={[ 5 ]} />
		</div>
	);
}
