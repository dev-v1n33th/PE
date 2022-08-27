import React, { useState, useEffect } from "react";

import MaterialTable from "material-table";
import { Grid } from "@mui/material";
import axios from "axios";

const List = [
  {
    id: 1,
    bedNumber: "A12",
    roomNumber: "N/A",
  },
  {
    id: 2,
    bedNumber: "A12",
    roomNumber: "N/A",
  },
  {
    id: 3,
    bedNumber: "A12",
    roomNumber: "N/A",
  },
  {
    id: 4,
    bedNumber: "A12",
    roomNumber: "N/A",
  },
  {
    id: 5,
    bedNumber: "A12",
    roomNumber: "N/A",
  },
  {
    id: 6,
    bedNumber: "A12",
    roomNumber: "N/A",
  },
  {
    id: 7,
    bedNumber: "A12",
    roomNumber: "N/A",
  },
  {
    id: 8,
    bedNumber: "A12",
    roomNumber: "N/A",
  },
];

function UnAllocatedInventory() {
  const [data, setData] = useState(List);
  const columns = [
    {
      title: "ID",
      field: "id",
      editable: false,
      headerStyle: {
        backgroundColor: "#1E90FF",
        color: "white",
      },
    },
    {
      title: "BedId",
      field: "bedId",
      headerStyle: {
        backgroundColor: "#1E90FF",
        color: "white",
      },
    },
    {
      title: "RoomId",
      field: "roomId",
      headerStyle: {
        backgroundColor: "#1E90FF",
        color: "white",
      },
    },

    {
      title: "FloorId",
      field: "floorId",
      headerStyle: {
        backgroundColor: "#1E90FF",
        color: "white",
      },
    },
    {
      title: "BuildingId",
      field: "buildingId",
      headerStyle: {
        backgroundColor: "#1E90FF",
        color: "white",
      },
    },
    {
      title: "BuildingName",
      field: "buildingName",
      lookup: { SriKalaNilayam: "SriKalaNilayam", SriNilayam: "SriNilayam" },
      headerStyle: {
        backgroundColor: "#1E90FF",
        color: "white",
      },
    },
    {
      title: "BedStatus",
      field: "bedStatus",
      lookup: { True: "TRUE", False: "False" },
      headerStyle: {
        backgroundColor: "#1E90FF",
        color: "white",
      },
    },
    {
      title: "BedName",
      field: "bedName",
      headerStyle: {
        backgroundColor: "#1E90FF",
        color: "white",
      },
    },
    {
      title: "DefaultRent",
      field: "defaultRent",
      headerStyle: {
        backgroundColor: "#1E90FF",
        color: "white",
      },
    },
    {
      title: "Ac",
      field: "ac",
      headerStyle: {
        backgroundColor: "#1E90FF",
        color: "white",
      },
    },
    {
      title: "SecurityDeposit",
      field: "securityDeposit",
      headerStyle: {
        backgroundColor: "#1E90FF",
        color: "white",
      },
    },
  ];
  useEffect(() => {
    axios.get("http://localhost:8085/bed/getAvailableBeds").then((res) => {
      //console.log(res.data);
      setData(res.data);
    });
  }, []);
  return (
    <div className="App">
      <Grid container>
        {/* <h1 align="center"></h1>
      <h4 align='center'></h4> */}
        <Grid xs={12}>
          <MaterialTable
            title="Unallocated Beds"
            data={data}
            sx={{ color: "white" }}
            columns={columns}
            editable={{
              onRowAdd: (newRow) =>
                new Promise((resolve, reject) => {
                  const updatedRows = [
                    ...data,
                    { id: Math.floor(Math.random() * 100), ...newRow },
                  ];
                  setTimeout(() => {
                    setData(updatedRows);
                    resolve();
                  }, 2000);
                }),
              onRowDelete: (selectedRow) =>
                new Promise((resolve, reject) => {
                  const index = selectedRow.tableData.id;
                  const updatedRows = [...data];
                  updatedRows.splice(index, 1);
                  setTimeout(() => {
                    setData(updatedRows);
                    resolve();
                  }, 2000);
                }),
              onRowUpdate: (updatedRow, oldRow) =>
                new Promise((resolve, reject) => {
                  const index = oldRow.tableData.id;
                  const updatedRows = [...data];
                  updatedRows[index] = updatedRow;
                  setTimeout(() => {
                    setData(updatedRows);
                    resolve();
                  }, 2000);
                }),
            }}
            options={{
              actionsColumnIndex: -1,
              addRowPosition: "first",
              headerStyle: {
                backgroundColor: "#1E90FF",
                color: "white",
                fontSize: "20px",
                fontWeight: "bold",
              },
              rowStyle: {
                fontSize: 16,
              },
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default UnAllocatedInventory;
