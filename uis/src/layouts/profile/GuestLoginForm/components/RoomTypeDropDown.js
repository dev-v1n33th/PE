import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import ListSubheader from '@mui/material/ListSubheader';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function GroupedSelect() {
  return (
    <div>
      <FormControl sx={{ m: 1, width: 530 }}>
        <InputLabel htmlFor="grouped-native-select">RoomType</InputLabel>
        <Select native defaultValue="" id="grouped-native-select" label="Grouping">/;
            <option value={1}>AC</option>
            <option value={2}>Non-AC</option> 
        </Select>
      </FormControl>
      
    </div>
  );
}
