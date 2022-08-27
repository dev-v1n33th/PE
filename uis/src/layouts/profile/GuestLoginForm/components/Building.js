import React from 'react';

import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';


let API_DATA = [ { building: 'Building-1' }, { building: 'Building-2' }, { building: 'Building-3' } ];

function Building() {
	const [ tableData, setTableData ] = React.useState(API_DATA);
	const [ selected, setSelected ] = React.useState('');

	function handleChange(event) {
		setSelected(event.target.value);
		let _vals = event.target.value ? API_DATA.filter((r) => r.building === event.target.value) : API_DATA;
		setTableData(_vals);
	}

	return (
		<div className="App">
			<label value="Select Building: ">Select Building: </label>
			
			<Select
				
				style={{ width: '30%', height: '5%' }}
				value={selected}
				onChange={handleChange}
				name="country"
				displayEmpty
				
			>
				
				<MenuItem value="Building-1">SREE KALA NILYAM</MenuItem>
				<br></br>
				<MenuItem value="Building-2">SREE NILAYAM</MenuItem>
				<br></br>
				<MenuItem value="Building-3">ANANDA NILAYAM</MenuItem>
				
				
			</Select>
			
		</div>
	);
}

export default Building;
