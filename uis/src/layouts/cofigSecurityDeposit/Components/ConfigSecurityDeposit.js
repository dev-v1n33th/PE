import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { Grid } from "@mui/material";
// import axios from "axios";
import axios from "../../../Uri";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ConfigSecurityDeposit() {
  let userData = JSON.parse(sessionStorage.getItem("userdata"));
  let userId = userData.data.userId;
  // console.log(userId);
  var obj1 = null;
  var obj2 = null;

  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("/guest/getSecurityDeposit")
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong🤦‍♂️")
      });
  }, []);

  const columns = [
    {
      title: "Occupancy Type",
      field: "occupancyType",
      lookup: {
        Daily: "Daily",
        Monthly: "Monthly",
        Regular: "Regular",
      },
      headerStyle: {
        backgroundColor: "#1E90FF",
        color: "white",
      },
    },
    // {
    //   title: "Security Deposit",
    //   field: "securityDepositAmount",
    //   headerStyle: {
    //     backgroundColor: "#1E90FF",
    //     color: "white",
    //   },
    // },
    // {
    //   title: "Notice Period",
    //   field: "noticeDays",
    //   headerStyle: {
    //     backgroundColor: "#1E90FF",
    //     color: "white",
    //   },
    // },
    {
      title: "Maintanance charge",
      field: "maintainanceCharge",
      headerStyle: {
        backgroundColor: "#1E90FF",
        color: "white",
      },
    },
  ];

  return (
    <>
      <Grid container>
        <Grid xs={12}>
          <MaterialTable
            title="Configure Security Deposit"
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
                    const res = axios
                      .post(
                        "/guest/addSecurityDeposit",

                        newRow
                      )
                      .then(() => {
                        toast.success("Data Added Successfully👍");
                      })
                      .catch((err) => {
                        toast.error("Server error😢");
                      });
                    console.log(newRow);

                    setData(updatedRows);
                    resolve();
                  }, 2000);
                }),
              onRowUpdate: (updatedRow, oldRow) =>
                new Promise((resolve, reject) => {
                  console.log(oldRow);
                  console.log(updatedRow);
                  const index = oldRow.id;
                  console.log(index);
                  const updatedRows = [...data];
                  console.log(updatedRows);
                  updatedRows[oldRow.tableData.id] = updatedRow;
                  console.log(updatedRows);

                  setTimeout(() => {
                    const res = axios
                      .put(`/guest/updateSecurityDeposit/${index}`, updatedRow)
                      .then((resp) => {
                        console.log(resp);
                        setData(updatedRows);
                        toast.success(" Updated Successfully👍");
                      })

                      .catch((err) => {
                        toast.error("Server error");
                      });

                    // setData(updatedRows);
                    // toast.success(" Updated Successfully👍");
                    console.log(updatedRows);
                    resolve();
                  });
                }),
            }}
            options={{
              exportButton: true,
              actionsColumnIndex: -1,
              grouping: true,
              addRowPosition: "first",
              headerStyle: {
                backgroundColor: "#1E90FF",
                color: "white",
                fontSize: "20px",
                //height: "10px",
                //fontWeight: 'bold'
              },
              rowStyle: {
                fontSize: 19,
              },
            }}
          />
           <ToastContainer
                      position="top-right"
                      min-width="2%"
                      autoClose={3000}
                      hideProgressBar={false}
                      newestOnTop={false}
                      closeOnClick
                      rtl={false}
                      pauseOnFocusLoss
                      draggable
                      pauseOnHover
                    />
        </Grid>
      </Grid>
    </>
  );
}

export default ConfigSecurityDeposit;
