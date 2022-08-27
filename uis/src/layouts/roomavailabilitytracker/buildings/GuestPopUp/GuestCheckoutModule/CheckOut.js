import React from 'react'
//import Button from "layouts/profile/GuestLoginForm/components/Button";

import "./CheckOut.css"
//import { Button } from '@mui/material';
import Button from '@mui/material/Button';
import { Container, Grid, InputLabel } from "@mui/material";

import { useState, useEffect } from 'react';
import axios from "../../../../../Uri";
import ManagerPaymentsinPopup from './managerPaymentModule/managerPaymentinPopUp';
import GuestpaymentsinPopUp from './GuestPaymentModule/GuestpaymentsinPopUp';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DateTimePicker from 'layouts/profile/GuestLoginForm/components/DataTimePicker';
import { Formik, Form } from "formik";
// import Button from '../../../../profile/GuestLoginForm/components/Button';

import InitiateCheckoutBtn from './InitiateCheckoutBtn';


function formatDate(checkInDate) {
  var datePart = checkInDate.match(/\d+/g),
    year = datePart[0].substring(2), // get only two digits
    month = datePart[1], day = datePart[2];

  return day + '-' + month + '-' + year;
}
var OccupancyType = null

const CheckOut = (props) => {
  var initiatedDate = null
  var plannedcheckoutdate = null

  var guestdueamount = props.GuestDueAmount
  OccupancyType = props.guestdetails.occupancyType

  const [dates, setDates] = useState(null)
  const [checkOutDate, setCheckOutDate] = useState(null)
  const [managerPayment, setManagerPayment] = useState(false)
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dt = null;
  const [cdate, setDate] = useState(dt);
  const [disableCheckoutButtons, setDisableCheckoutButtons] = React.useState(false);
  // const [disableRefundButton, setDisableRefuncdButton] = React.useState(false);
  // const [disableRecordPayment, setDisableRecordPayment] = React.useState(false);
  const [pickNoticeDate, setPickNoticeDate] = useState(false)
  




  const initiateCheckoutProcess = () => {
    setPickNoticeDate(true)
    // console.log('clicked initiate checkout btn')
    // axios.get(`guest/get/${props.guestdetails.id}`)
    //   .then((res) => { setDates(res.data); 
    //      setDisableCheckoutButtons(true);
    //      toast.success("Initiated Checkout Successfully");})
    //   .catch(err => { console.err(err); toast.error("Checkout Initiation Failed"); })
    // setCheckOutDate(formatDate(props.guestdetails.checkOutDate));
    // setDate(dt);
  }
  console.log(dates)


  const finalCheckOutHandler = async () => {

    await axios.get(`guest/getFinalCheckout/${props.guestdetails.id}`)
      .then((res) => {
        console.log(res.data);
        setDisableCheckoutButtons(true);
        toast.success("Guest Checked-Out Successfully. Please wait before we complete the transaction.");
      })
      .catch((err) => console.log(err));

    // setTimeout(() => {
    //   window.location.();
    // }, 2000)

  }
  return (
    <div className="CheckOutComponent">


      <Grid container>
        {/* <Grid xs={5} sx={{ pt: "30px", pr: "40px" }}> */}
        {/* <Button disabled={disableCheckoutButtons} variant="contained" color="primary" onClick={initiateCheckoutProcess} style={{ color: "white" }}>INITIATE CHECKOUT</Button> */}
        {/* </Grid> */}
        {/* {props.guestdetails.occupancyType == "Regular"  ?  (<Grid xs={5} sx={{ pt: "30px", pr: "40px" }}>
          <Button disabled={disableCheckoutButtons} variant="contained" color="primary" onClick={initiateCheckoutProcess} style={{ color: "white" }}>INITIATE CHECKOUT</Button>
        </Grid>) :(<div></div>)} */}

        {props.guestdetails.occupancyType == "Regular" && props.guestdetails.guestStatus == "active" ? (<Grid xs={5} sx={{ pt: "30px", pr: "40px" }}>

          <Button disabled={disableCheckoutButtons} variant="contained" color="primary" onClick={initiateCheckoutProcess} style={{ color: "white" }}>INITIATE CHECKOUT</Button>

        </Grid>) : (<div></div>)}

        {/* for the date picker to notice dates */}
        {pickNoticeDate === true ? (<>
        <InitiateCheckoutBtn guestdetails={props.guestdetails}/>
</>):(<></>)}



        { }


        {props.guestdetails.guestStatus == "InNotice" ? (
          <Button disabled={disableCheckoutButtons} variant="contained" color="primary" style={{ color: "white", float: "right" }} onClick={finalCheckOutHandler} >Finish CheckOut</Button>
        ) : (<div></div>)}


        {props.guestdetails.occupancyType == 'daily' || props.guestdetails.occupancyType == 'OneMonth' ? (
          <Button disabled={disableCheckoutButtons} className="btn-float-left" variant="contained" color="primary" style={{ color: "white", float: "right" }} onClick={finalCheckOutHandler} >CheckOut</Button>
        ) : (<div></div>)}



      </Grid>

      {guestdueamount < 0 ? (<ManagerPaymentsinPopup guestdetails={props.guestdetails} />) : (<div></div>)}
      {guestdueamount > 0 ? (<GuestpaymentsinPopUp guestdetails={props.guestdetails} />) : (<div></div>)}
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
    </div>
  )
}

export default CheckOut;
