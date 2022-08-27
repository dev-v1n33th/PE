import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { Grid } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "../../Uri";

function AllTransaction() {
  let userData = JSON.parse(sessionStorage.getItem("userdata"));
  let userId = userData.data.userId;
  console.log(userId);

  const [data, setData] = useState([]);
  const [open,setOpen] = React.useState();
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };
  const columns = [

    {
      title: "Guest Name",
      field: "guestName",
      type: "text",
      headerStyle: {
        backgroundColor: "#1E90FF",
        color: "white",
        
      },
    },
    // {
    //   title: "ID",
    //   field: "buildingName",
    //   type: "text",

    //   headerStyle: {
    //     backgroundColor: "#1E90FF",
    //     color: "white",
    //   },
    // },
    {
      title: "Mobile",
      field: "personalNumber",
      type: "text",

      headerStyle: {
        backgroundColor: "#1E90FF",
        color: "white",
      },
    },

    // {
    //   title: "Email",
    //   field: "email",
    //   type: "email",

    //   headerStyle: {
    //     backgroundColor: "#1E90FF",
    //     color: "white",
    //   },
    // },
   
    {
      title: "Building Name",
      field: "buildingName",

      headerStyle: {
        backgroundColor: "#1E90FF",
        color: "white",
      },
    },
    {
      title: "Guest BedID",
      field: "bedId",

      headerStyle: {
        
        backgroundColor: "#1E90FF",
        color: "white",
      },
    },
    {
      title: "Occupancy Type",
      field: "occupancyType",

      headerStyle: {
        backgroundColor: "#1E90FF",
        color: "white",
      },
    },
    {
      title: "Transaction ID",
      field: "transactionId",

      headerStyle: {
        backgroundColor: "#1E90FF",
        color: "white",
      },
    },
    // {
    //   title: "PaymentID",
    //   field: "dueAmount",

    //   headerStyle: {
    //     backgroundColor: "#1E90FF",
    //     color: "white",
    //   },
    // },
    {
        title: "AmountPaid",
        field: "amountPaid",
  
        headerStyle: {
          backgroundColor: "#1E90FF",
          color: "white",
        },
      },
      {
        title: "PaymentPurpose",
        field: "paymentPurpose",
  
        headerStyle: {
          backgroundColor: "#1E90FF",
          color: "white",
        },
      },
      {
        title: "RefundAmount",
        field: "refundAmount",
  
        headerStyle: {
          backgroundColor: "#1E90FF",
          color: "white",
        },
      },
  ];

  useEffect(() => {
    handleToggle();
    axios

      .get("/payment/getAllTransactions")

      .then((res) => {
        setData(res.data);
        handleClose();
        console.log(res.data);
      })

      .catch((err) => {
        console.log(err);
        // toast.error("Server Error")
      });
  }, []);

  const obje = { createdBy: userId };

  return (
    <Grid container>
      <Grid xs={12}>
        <MaterialTable
          title="Transaction List"
          data={data}
          sx={{ color: "white" }}
          columns={columns}
          options={{
            exportButton: true,
            pageSize: 10,
            actionsColumnIndex: -1,
            grouping: true,
            addRowPosition: "first",
            headerStyle: {
              backgroundColor: "#1E90FF",
              color: "white",
              fontSize: "15px",
              //height: "10px",
              //fontWeight: 'bold'
            },
            rowStyle: {
              fontSize: 16,
            },
          }}
        />
      </Grid>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Grid>
    
  );
}

export default AllTransaction;
