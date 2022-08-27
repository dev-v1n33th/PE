import React, { useState, useEffect } from "react";

import MaterialTable from "material-table";
import { Grid } from "@mui/material";
import axios from "axios";
import Building from "layouts/profile/GuestLoginForm/components/Building";

import FormDialog from "./Components/RecordPayment";

function PaymentReport() {
  const [data, setData] = useState([]);
  const url = "http://localhost:8080/api/v1/payments";
  const columns = [
    {
      title: " GUEST ID",
      field: "guestId",
      editable: false,
      headerStyle: {
        backgroundColor: "#0096FF",
        color: "white",
      },
    },
    {
      title: "Payment Purpose",
      field: "paymentTowards",
      headerStyle: {
        backgroundColor: "#0096FF",
        color: "white",
      },
    },
    {
      title: "AmountPaid",
      field: "amount",
      headerStyle: {
        backgroundColor: "#0096FF",
        color: "white",
      },
    },
    {
      title: "Due",
      field: "Dueamount",
      headerStyle: {
        backgroundColor: "#0096FF",
        color: "white",
      },
    },
    {
      title: "Payment Method",
      field: "paymentMethod",
      headerStyle: {
        backgroundColor: "#0096FF",
        color: "white",
      },
    },
    {
      title: " Payment ID",
      field: "paymentId",
      headerStyle: {
        backgroundColor: "#0096FF",
        color: "white",
      },
    },
    {
      title: "Transaction Id",
      field: "transactionId",
      headerStyle: {
        backgroundColor: "#0096FF",
        color: "white",
      },
    },
    {
      title: "Transaction Date",
      field: "transactiondate",
      headerStyle: {
        backgroundColor: "#0096FF",
        color: "white",
      },
    },
  ];
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/payments")
      .then((res) => {
        setData(res.data);

        //console.log(res.data);
      })

      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="App">
      <Grid container>
      <Grid item xs={6} ><Building/></Grid>
      <Grid item xs={6} ><FormDialog/></Grid>

        <Grid xs={12}>
          <MaterialTable
            title="Record Payments"
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
                    const res = axios.post(
                      "http://localhost:8080/api/v1/payments",

                      newRow
                    );

                    //console.log(res);
                    // console.log(newRow)
                    setData(updatedRows);
                    resolve();
                  }, 2000);
                }),
              onRowDelete: (selectedRow) =>
                new Promise((resolve, reject) => {
                  const index = selectedRow.guestId;
                  const updatedRows = [...data];
                  updatedRows.splice(index, 1);
                  //console.log(index);
                  setTimeout(() => {
                    const res = axios.delete(
                      `http://localhost:8080/api/v1/payments/${index}`
                    );
                    // console.log(res);
                    // console.log(updatedRows);
                    setData(updatedRows);
                    resolve();
                  }, 1);
                }),
              onRowUpdate: (updatedRow, oldRow) =>
                new Promise((resolve, reject) => {
                  const index = oldRow.guestId;
                  const updatedRows = [...data];

                  updatedRows[index] = updatedRow;
                  setTimeout(() => {
                    const res = axios.put(
                      `http://localhost:8080/api/v1/payments/${index}`, updatedRow
                    );
                    // console.log(res);
                    // console.log(updatedRows);
                    setData(updatedRows);
                    resolve();
                  });
                }),
                
            }}
            options={{
              actionsColumnIndex: -1,
              addRowPosition: "first",
              headerStyle: {
                backgroundColor: "#0096FF",
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

export default PaymentReport;
