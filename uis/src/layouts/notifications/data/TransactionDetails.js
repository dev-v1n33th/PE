import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
	{ field: 'id', headerName: 'SLNO', width: 130 },
	{ field: 'bedId', headerName: 'BED ID', width: 130 },
	{ field: 'name', headerName: 'NAME', width: 130 },
	{
		field: 'doj',
		headerName: 'DOJ',
		width: 90
	},
	{
		field: 'sd',
		headerName: 'SD',
		type: 'number',
		width: 160
	},
	{ field: 'for', headerName: 'FOR', width: 130 },
	{ field: 'tid', headerName: 'TXN ID', width: 130 },
	{ field: 'paid', headerName: 'PAID ON', width: 130 },
	{ field: 'type', headerName: 'RECEIVED VIA', width: 130 },
	{ field: 'rent', headerName: 'RENT', width: 130 },
	{ field: 'received', headerName: 'RECEIVED', width: 130 },
	{ field: 'due', headerName: 'DUE', width: 130 }
];

const rows = [
	{
		id: 1,
		name: 'Vinay Mhatre',
		bedId: '203A',
		doj: '01-oct-2021',
		sd: 5000,
		for: 'Oct-21',
		tid: '127405589819',
		paid: '01-Oct-21',
		type: 'UPI',
		rent: '10000',
		received: '10000',
		due: '0'
	},
	{
		id: 2,
		name: 'Om Pandey',
		bedId: '307A',
		doj: '26-July-21',
		sd: 5000,
		for: 'Oct-21',
		tid: '127484811024',
		paid: '01-Oct-21',
		type: 'UPI',
		rent: '7000',
		received: '7000',
		due: '0'
	},
	{
		id: 3,
		name: 'Nelson George',
		bedId: '206B',
		doj: '31-July-21',
		sd: 5000,
		for: 'Oct-21',
		tid: '127420522486',
		paid: '01-Oct-21',
		type: 'UPI',
		rent: '7500',
		received: '7500',
		due: '0'
	},
	{
		id: 4,
		name: 'V. Charan',
		bedId: '108A',
		doj: '10-July-21',
		sd: 5000,
		for: 'Oct-21',
		tid: '127594104240',
		paid: '02-Oct-21',
		type: 'UPI',
		rent: '8500',
		received: '8500',
		due: '0'
	},
	{
		id: 5,
		name: 'Kishore Reddy',
		bedId: '109C',
		doj: '30-Sep-21',
		sd: 0,
		for: 'Oct-21',
		tid: '127300389246',
		paid: '02-Oct-21',
		type: 'UPI',
		rent: '9000',
		received: '9000',
		due: '0'
	},
	{
		id: 6,
		name: 'Ashish Onkala',
		bedId: '305C',
		doj: '02-Oct-21',
		sd: 5000,
		for: 'Oct-21',
		tid: '127530333375',
		paid: '02-Oct-21',
		type: 'UPI',
		rent: '7500',
		received: '5000',
		due: '2500'
	},
	{
		id: 7,
		name: 'A.Shanmukh Rao',
		bedId: 'P3A',
		doj: '04-Jul-21',
		sd: 4000,
		for: 'Oct-21',
		tid: '127518728731',
		paid: '02-Oct-21',
		type: 'UPI',
		rent: '6500',
		received: '6500',
		due: '0'
	},
	{
		id: 8,
		name: 'D. Vasram Naik',
		bedId: 'P4B',
		doj: '18-Sep-21',
		sd: 5000,
		for: 'Oct-21',
		tid: '127561072512',
		paid: '02-Oct-21',
		type: 'UPI',
		rent: '7500',
		received: '5000',
		due: '5500'
	},
	{
		id: 9,
		name: 'N. Srinivas Rao',
		bedId: 'G6C',
		doj: '07-Aug-21',
		sd: 5000,
		for: 'Oct-21',
		tid: '127547957444',
		paid: '02-Oct-21',
		type: 'UPI',
		rent: '7500',
		received: '1000',
		due: '1000'
	}
];

export default function DataTable() {
	return (
		<div style={{ height: 400, width: '100%' }}>
			<DataGrid rows={rows} columns={columns} pageSize={5} rowsPerPageOptions={[ 9 ]} />
		</div>
	);
}
