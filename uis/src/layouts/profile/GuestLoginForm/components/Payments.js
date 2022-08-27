import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import CheckBox from '@mui/material/Checkbox';
import MDButton from 'components/MDButton';
import Button from '@mui/material/Button';
import { Grid } from '@mui/material';
import Box from '@mui/material/Box';

const columns = [
	{
		field: 'firstName',
		headerName: 'Room Number',
		width: 150,
		editable: true,
		headerClassName: 'super-app-theme--header'
	},

	{
		field: 'age',
		headerName: 'A/c',
		type: 'number',
		width: 100,
		editable: true,
		headerClassName: 'super-app-theme--header'
	},
	{
		field: 'bed_id',
		headerName: 'Bed Number',
		description: 'This column has a value getter and is not sortable.',
		sortable: false,
		width: 150,
		headerClassName: 'super-app-theme--header'
	},

	
	{
		field: 'monthlyrent',
		headerName: 'Monthly Rent',
		type: 'number',
		width: 200,
		editable: true,
		headerClassName: 'super-app-theme--header'
	},
	{
		field: 'dailyrent',
		headerName: 'Daily Rent',
		type: 'number',
		width: 150,
		editable: true,
		headerClassName: 'super-app-theme--header'
	},
	{
		field: 'action',
		headerName: 'Action',
		sortable: false,
		width: 180,
		headerClassName: 'super-app-theme--header',
		renderCell: (params) => {
			const onClick = (e) => {
				e.stopPropagation();

				return alert('Booked');
			};

			return (
				<MDButton onClick={onClick} variant="outlined" color="info" size="small">
					Book
				</MDButton>
			);
		}
	}
];

const rows = [
	{
		id: 1,
		lastName: '18,000',
		firstName: 'B101',
		age: 'Yes',
		bed_id: 'G12',
	
		monthlyrent: '20000',
		dailyrent: 800
	},
	{
		id: 2,
		lastName: '10,000',
		firstName: 'A101',
		age: 'Yes',
		bed_id: 'P1C',
	
		monthlyrent: '11500',
		dailyrent: 600
	},
	{
		id: 3,
		lastName: '7,500',
		firstName: 'C102',
		age: 'Yes',
		bed_id: 'G1A',
	
		monthlyrent: '8500',
		dailyrent: 500
	},
	{
		id: 4,
		lastName: '6,500',
		firstName: 'D100',
		age: 'No',
		bed_id: 'B1A',
	
		monthlyrent: '7500',
		dailyrent: 400
	},
	{
		id: 5,
		lastName: '7,500',
		firstName: 'C101',
		age: 'Yes',
		bed_id: 'B2A',
	
		monthlyrent: '8500',
		dailyrent: 500
	},
	{
		id: 6,
		lastName: '6,500',
		firstName: 'A101',
		age: 'No',
		bed_id: 'B2A',
	
		monthlyrent: '7500',
		dailyrent: 400
	},
	{
		id: 7,
		lastName: '6,500',
		firstName: 'P101',
		age: 'Yes',
		bed_id: 'B2B',
	
		monthlyrent: '8500',
		dailyrent: 600
	},
	{
		id: 8,
		lastName: '6,500',
		firstName: 'G101',
		age: 'No',
		bed_id: 'B22',
	
		monthlyrent: '7500',
		dailyrent: 400
	},
	{
		id: 9,
		lastName: '6,500',
		firstName: 'F101',
		age: 'Yes',
		bed_id: 'D2A',
	
		monthlyrent: '6500',
		dailyrent: 500
	}
];

export default function DataGridDemo() {
	return (
		<Grid container style={{ height: 400, width: '100%' }}>
			<Box
				sx={{
					height: 400,
					width: 1,
					'& .super-app-theme--header': {
						backgroundColor: '#1E90FF',
						color: '#FFFAFA'
					}
				}}
			>
				<DataGrid
					rows={rows}
					columns={columns}
					pageSize={15}
					rowsPerPageOptions={[ 15 ]}
					disableSelectionOnClick
				/>
			</Box>
		</Grid>
	);
}
