import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
	{ field: 'id', headerName: 'SLNO', width: 70 },
	{ field: 'bedId', headerName: 'BED ID', width: 70 },
	{ field: 'name', headerName: 'NAME', width: 180 },
	{
		field: 'noticeGiven',
		headerName: 'NOTICE GIVEN ON',
		width: 90
	},
	{ field: 'checkoutOn', headerName: 'CHECKEDOUT ON', width: 180 },
	{ field: 'lastPaid', headerName: 'LAST PAID ON', width: 180 },
	{ field: 'sd', headerName: 'SD', type: 'number', width: 80 },
	{ field: 'mc', headerName: 'MC', type: 'number', width: 80 },
	{ field: 'due', headerName: 'DUE', type: 'number', width: 80 },
	{ field: 'returnedSD', headerName: 'SD RETURNED', type: 'number', width: 180 }
];

const rows = [
	{
		id: 1,
		bedId: '106C',
		name: 'J. Vishnu Vardhan Reddy',
		noticeGiven: '07-Sep-21',
		checkoutOn: '01-Oct-21',
		lastPaid: '07-Sep-21',
		sd: 5000,
		mc: 1000,
		due: 0,
		returnedSD: 4000
	},
	{
		id: 2,
		bedId: '102C',
		name: 'K. Ravindranath Reddy',
		noticeGiven: '14-Sep-21',
		checkoutOn: '04-Oct-21',
		lastPaid: '14-Sep-21',
		sd: 5000,
		mc: 1000,
		due: 0,
		returnedSD: 4000
	},
	{
		id: 3,
		bedId: '201B',
		name: 'M. Rakesh',
		noticeGiven: '21-Sep-21',
		checkoutOn: '06-Oct-21',
		lastPaid: '13-Sep-21',
		sd: 3000,
		mc: 1000,
		due: 0,
		returnedSD: 700
	},
	{
		id: 4,
		bedId: '201A',
		name: 'M. Sai Kiran',
		noticeGiven: '21-Sep-21',
		checkoutOn: '06-Oct-21',
		lastPaid: '13-Sep-21',
		sd: 3000,
		mc: 1000,
		due: 0,
		returnedSD: 700
	},
	{
		id: 5,
		bedId: '204C',
		name: 'C.H.N.V Syam Kumar',
		noticeGiven: '30-Nov-21',
		checkoutOn: '06-Oct-21',
		lastPaid: '03-Oct-21',
		sd: 5000,
		mc: 1000,
		due: 0,
		returnedSD: 0
	},
	{
		id: 6,
		bedId: '201D',
		name: 'V. Pavan Kumar',
		noticeGiven: '21-Sep-21',
		checkoutOn: '06-Oct-21',
		lastPaid: '30-sep-21',
		sd: 3000,
		mc: 1000,
		due: 0,
		returnedSD: 700
	},
	{
		id: 7,
		bedId: '201C',
		name: 'T. Mohan Krishna',
		noticeGiven: '21-Sep-21',
		checkoutOn: '06-Oct-21',
		lastPaid: '13-sep-21',
		sd: 3000,
		mc: 1000,
		due: 0,
		returnedSD: 700
	}
];

export default function DataTable() {
	return (
		<div style={{ height: 400, width: '100%' }}>
			<DataGrid rows={rows} columns={columns} pageSize={5} rowsPerPageOptions={[ 5 ]} />
		</div>
	);
}
