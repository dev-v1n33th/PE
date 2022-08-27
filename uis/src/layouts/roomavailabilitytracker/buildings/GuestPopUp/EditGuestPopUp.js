import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import Button from "@mui/material/Button";
import MDButton from "components/MDButton";
// import MDTypography from "components/MDTypography";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
// import TextField from "@mui/material/TextField";
import { Grid } from "@mui/material";
// import { borderRadius } from "@mui/system";
// import { Link } from "react-router-dom";
// import RecentTransactions from "layouts/dashboard/components/summaryTables/Recenttransactions";
import TransactionHistory from "./TransactionHistoryModule/TransactionHistory";
// import RecordpaymentsinPopUp from "./GuestPaymentModule/GuestpaymentsinPopUp";
import Guestdetails from "./GuestDetails/DOMguestdetails/guestdetails";
import GuestDetailsIndex from "./GuestDetails";
// import AppBar from "@mui/material/AppBar";
import CheckOut from "./GuestCheckoutModule/CheckOut";
import "./GuestPopUp.css";
import AppBar from '@mui/material/AppBar';
import GuestPic from './GuestPicture/GuestPic';
import { useNavigate } from "react-router-dom";
// import EditGuestDetailsScreen from "../EditGuestDetails";
import EditGuestForm from "./EditGuestForm";



export default function EditGuestPopUp(props) {
  const  guestdetails=props.guestdetails;
//   const editGuestHandler = props.editGuestHandler;
//   const closeEditGuestModal = () =>{
//     editGuestHandler
//   }
  console.log(guestdetails);
  console.log('from edit guest details')
  return (
    <div>
      <Dialog open={props.showEditGuest} onClose={props.editGuestHandler} maxWidth="lg">
          <MDButton
            width="20%"
            variant="contained"
            color="info"
            size="large"
            justify="center"
            style={{ borderRadius: 0 }}
          >
            Edit Guest Details
          </MDButton>
          <DialogContent>
            <EditGuestForm  guestdetails={props.guestdetails} editGuestHandler={props.editGuestHandler}
            // handleCloseGuestModalWindow={handleCloseGuestModalWindow}
            />
          </DialogContent>
          <DialogActions>
            <Grid container style={{ display: "flex" }}>
              <Grid item xs={6}>
                <MDButton
                  width="20%"
                  variant="contained"
                  color="info"
                  size="large"
                  justify="center"
                  style={{ borderRadius: 10 }}
                  onClick={props.editGuestHandler}
                >
                  Close
                </MDButton>
              </Grid>
            
            </Grid>
          </DialogActions>
        </Dialog>
      
        
      
    </div>
  );
}
