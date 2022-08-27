import React, { useState } from "react";

import MaterialTable from "material-table";
import { Grid } from "@mui/material";

const empList = [
  {
    id: 1,
    name: "Building 1",
    title: "Daily Needs",
    date: "08/09/2021",
    amount: 12345,
    reason: "Inventory Report",
  },
  {
    id: 2,
    name: "Building 2",
    title: "Material Change",
    date: "16/05/2021",
    amount: 34500,
    reason: "Material Brokage",
  },
  {
    id: 3,
    name: "Building 3",
    title: "Electrical Repair",
    date: "11/01/2022",
    amount: 2420,
    reason: "Electrical Repair",
  },
  {
    id: 4,
    name: "Building 1",
    title: "Daily Needs",
    date: "12/11/2021",
    amount: 10454,
    reason: "Inventory Report",
  },
  {
    id: 5,
    name: "Building 2",
    title: "Material Change",
    date: "02/06/2021",
    amount: 12545,
    reason: "Material Brokage",
  },
  {
    id: 6,
    name: "Building 3",
    title: "Electrical Repair",
    date: "29/04/2021",
    amount: 3650,
    reason: "Electrical Repair",
  },
  {
    id: 7,
    name: "Building 1",
    title: "Daily Needs",
    date: "21/01/2021",
    amount: 9565,
    reason: "Inventory Report",
  },
  {
    id: 8,
    name: "Building 2",
    title: "Material Change",
    date: "27/08/2021",
    amount: 21500,
    reason: "Material Brokage",
  },
  {
    id: 9,
    name: "Building 3",
    title: "Electrical Repair",
    date: "11/01/2022",
    amount: 7675,
    reason: "Electrical Repair",
  },
];

function Actions() {
  const [data, setData] = useState(empList);
  const columns = [
    {
      title: "Branch Name",
      field: "name",
      editable: false,
      headerStyle: {
        backgroundColor: "#1E90FF",
        color: "white",
      },
    },
    {
      title: "Title",
      field: "title",
      headerStyle: {
        backgroundColor: "#1E90FF",
        color: "white",
      },
    },
    {
      title: "Expense Date",
      field: "date",
      headerStyle: {
        backgroundColor: "#1E90FF",
        color: "white",
      },
    },
    {
      title: "Amount",
      field: "amount",
      headerStyle: {
        backgroundColor: "#1E90FF",
        color: "white",
      },
    },
    {
      title: "Reason",
      field: "reason",
      headerStyle: {
        backgroundColor: "#1E90FF",
        color: "white",
      },
    },
  ];

  return (
    <div className="App">
      <Grid container>
        <Grid xs={12}>
          <MaterialTable
            title="Expenses Information"
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

export default Actions;
