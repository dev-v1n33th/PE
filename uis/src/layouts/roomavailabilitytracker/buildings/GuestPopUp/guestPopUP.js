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
import EditGuestPopUp from "./EditGuestPopUp";



export default function GuestPopUp({ open, handleCloseGuestModalWindow, ...props }) {
  const [showEditGuest , setShowEditGuest] = useState(false);
  // console.log('heeeeeeeeeeeeeee')
  const navigate = useNavigate();

  const editGuestHandler = () =>{
    // navigate("/editGuest")
    handleCloseGuestModalWindow();
    setShowEditGuest(!showEditGuest);
  }
  // console.log(props.TotalAmountByGuest)
  console.log(props.GuestPic)
  return (
    <div>
      <EditGuestPopUp guestdetails={props.GuestDetails} showEditGuest={showEditGuest} editGuestHandler={editGuestHandler}
                      // handleCloseGuestModalWindow={handleCloseGuestModalWindow}
                      />
      <Dialog open={open} onClose={handleCloseGuestModalWindow} maxWidth="lg">
          <MDButton
            width="20%"
            variant="contained"
            color="info"
            size="large"
            justify="center"
            style={{ borderRadius: 0 }}
          >
            Guest Details
          </MDButton>

          <DialogContent>
          <MDButton
                  width="20%"
                  variant="contained"
                  color="info"
                  size="small"
                  justify="center"
                  style={{ borderRadius: 10,
                           float:'right' }}
                  onClick={editGuestHandler}
                  
                >
                  EDit Guest
                </MDButton>
            <GuestPic    guestdetails={props.GuestDetails}/>
            <GuestDetailsIndex
              guestdetails={props.GuestDetails}
              GuestDueAmount={props.GuestDueAmount}
              TotalAmountByGuest={props.TotalAmountByGuest}
            />
            
            <br />

            <CheckOut
              guestdetails={props.GuestDetails}
              GuestDueAmount={props.GuestDueAmount}
            />
            <br />

            <br />
            <h3 className="head-1-checkOut">Transaction History</h3>
            <br />
            <TransactionHistory guestdetails={props.GuestDetails} />
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
                  onClick={handleCloseGuestModalWindow}
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
