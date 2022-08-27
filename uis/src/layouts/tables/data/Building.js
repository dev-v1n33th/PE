import React from "react";

import MenuItem from '@mui/material/MenuItem'
import Select from "@mui/material/Select";


let API_DATA = [
  { building: "Building-1", },
  { building: "Building-2", },
  { building: "Building-3",  }
];

function Building() {
 
  const [tableData, setTableData] = React.useState(API_DATA);
  const [selected, setSelected] = React.useState("");

  function handleChange(event) {
    setSelected(event.target.value);
    let _vals = event.target.value
      ? API_DATA.filter(r => r.building === event.target.value)
      : API_DATA;
    setTableData(_vals);
  }

  return (
    <div className="App">
      <label value="Select Building: ">Select Building: </label>
      <Select sx={{minHeight:44}}
        style={{ width: "30%",height:"10%" }}
        value={selected}
        onChange={handleChange}
        name="country"
        displayEmpty
        
      >
        <MenuItem value="">All Buildings</MenuItem>
        <MenuItem value="Building-1">Building-1</MenuItem>
        <MenuItem value="Building-2">Building-2</MenuItem>
        <MenuItem value="Building-3">Building-3</MenuItem>
        <MenuItem value="Building-4">Building-4</MenuItem>
      </Select>

     
    </div>
  );
}

export default Building;
