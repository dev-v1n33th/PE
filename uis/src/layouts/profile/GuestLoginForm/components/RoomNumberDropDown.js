import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import ListSubheader from '@mui/material/ListSubheader';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function RoomNumberDropDown() {
  return (
    <div>
      <FormControl sx={{ m: 1, width: 530 }}>
        <InputLabel htmlFor="grouped-native-select">RoomNumber</InputLabel>
        <Select native defaultValue="" id="grouped-native-select" label="Grouping">/;
            <option value={1}>101</option>
            <option value={2}>102</option> 
            
            <option value={1}>103</option>
            <option value={1}>104</option>
            <option value={1}>105</option>
            <option value={1}>106</option>
            
        </Select>
      </FormControl>
      
    </div>
  );
}
