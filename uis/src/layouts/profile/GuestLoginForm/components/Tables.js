//All imports here
import React, {useEffect, useState} from "react";
import "./styles.css";
import { DataGrid } from "@mui/x-data-grid";
import Radio from "@mui/material/Radio";



export default function Tables(props) {
    const rows = props.tableData;
    console.log(rows)
    let radioChecked = [rows[0].id];
    const [selectionModel, setSelectionModel] = React.useState(radioChecked);
    radioChecked = selectionModel;
    const columns = [
        {
          field: "radiobutton",
          headerName: "select",
          width: 100,
          sortable: false,
          renderCell: (params) => (
            <Radio checked={radioChecked[0] === params.id} value={params.id} />
          )
        },
     
        {
          field: "sharing",
          headerName: "Sharing",
          width: 160
        },
        {
          field: "roomType",
          headerName: "Room Type",
          width: 160
        },
        {
            field: "price",
            headerName: "Rent",
            width: 160,
          },
      ];

  const selectedRow = rows.filter((item) => {
    return item.id === selectionModel[0];
  });

  
  return (
    <div className="App">
      <DataGrid
        rows={rows}
        columns={columns}
        autoHeight
        selectionModel={selectionModel}
        hideFooter={true}
        onSelectionModelChange={(newSelectionModel) => {
          setSelectionModel(newSelectionModel);
        }}
      />
      <div style={{ marginTop: "40px" }}>
        You have selected: {selectedRow[0].sharing} sharing {selectedRow[0].roomType} and rent of that room is &#8377; {selectedRow[0].price}
        {  
 
        props.func(selectedRow[0])}
      </div>
    </div>
  );
}
