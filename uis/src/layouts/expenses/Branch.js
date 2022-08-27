import React from "react";
import MenuItem from '@mui/material/MenuItem'
import Select from "@mui/material/Select";


let API_DATA = [
  { branch: "Branch-1", },
  { branch: "Branch-2", },
  { branch: "Branch-3",  }
];

function Building() {
  
  const [ setTableData] = React.useState(API_DATA);
  const [selected, setSelected] = React.useState("");

  function handleChange(event) {
    setSelected(event.target.value);
    let _vals = event.target.value
      ? API_DATA.filter(r => r.branch === event.target.value)
      : API_DATA;
    setTableData(_vals);
  }

  return (
    <div className="App">
      
      <Select sx={{minHeight:44}}
        style={{ width: "30%",height:"10%" }}
        value={selected}
        onChange={handleChange}
        name="country"
        displayEmpty
        
      >
        <MenuItem value="">All Branches</MenuItem>
        <MenuItem value="Building-1">Branch-1</MenuItem>
        <MenuItem value="Building-2">Branch-2</MenuItem>
        <MenuItem value="Building-3">Branch-3</MenuItem>
        <MenuItem value="Building-4">Branch-4</MenuItem>
      </Select>

      
    </div>
  );
}

export default Building;
