// import React from 'react';
// import DateTimePicker from 'layouts/profile/GuestLoginForm/components/DataTimePicker';
// import { Formik, Form } from "formik";
// import { useState, useEffect } from 'react';
// import { Container, Grid, InputLabel } from "@mui/material";
// import * as Yup from "yup";
// import Button from 'layouts/profile/GuestLoginForm/components/Button';

// function InitiateCheckoutBtn(props) {
//     console.log(props.guestdetails);
//     const [INITIAL_FORM_STATE , setINITIAL_FORM_STATE] = useState({
//         id:props.guestdetails.id,
//         occupancyType:props.guestdetails.occupancyType,
//         noticeDate: props.guestdetails.noticeDate,
//         plannedCheckOutDate: props.guestdetails.plannedCheckOutDate
    
//       })
//       const FORM_VALIDATION = Yup.object().shape({
//         noticeDate: Yup.date().required("Required").test(
//             "Transaction date",
//             "Please choose a valid transactionDate date 🥱🥳",
//             (date) =>
//               moment().diff(moment(date), "years") <= 8
//           ),
//           plannedCheckOutDate:Yup.date().required("Required").test(
//             "Transaction date",
//             "Please choose a valid transactionDate date 🥱🥳",
//             (date) =>
//               moment().diff(moment(date), "years") <= 8
//           ),
//       })
//       console.log(INITIAL_FORM_STATE);
//   return (<div>
//     <h1>hello</h1>
//   <Formik initialValues={{ ...INITIAL_FORM_STATE }}
//               validationSchema={FORM_VALIDATION}>
//             {(formProps) => {
//               <Form>
//                 <Grid item xs={6}><h5>FROM</h5> <DateTimePicker
//                   // label="Transaction Date"
//                   maxdate={new Date()}
//                   name="noticeDate"
//                   //label="Date of Birth"
//                   required
//                 /></Grid>
//                 <Grid item xs={6}><h5>TO</h5> <DateTimePicker
//                   // label="Transaction Date"
//                   maxdate={new Date()}
//                   name="plannedCheckOutDate"
//                   //label="Date of Birth"
//                   required
//                 /></Grid>
//                 <Grid item xs={6} sx={{ marginTop: 2 }} >
//                       <Button 
//                        >
//                         INITIATE
//                       </Button>
//                     </Grid>
//               </Form>
//             }}
//           </Formik>
//           </div>

  
//   )
// }

// export default InitiateCheckoutBtn



import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
// import axios from "axios";
import axios from "../../../../../Uri";
import { Container, Grid, InputLabel } from "@mui/material";
import moment from "moment";

import { makeStyles } from "@mui/styles";
import MDTypography from "components/MDTypography";

import Textfield from "layouts/profile/GuestLoginForm/components/TextField";
import Select from "layouts/profile/GuestLoginForm/components/Select";
// import Purpose from "./Purpose";
import DateTimePicker from "../../../../../layouts/profile/GuestLoginForm/components/DataTimePicker";
import Button from "layouts/profile/GuestLoginForm/components/Button";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Backdrop,CircularProgress } from "@mui/material";
// import "./GuestPaymentsinPopUp.css";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const useStyles = makeStyles({
  root: {
    height: 40,
  },
  size: {
    width: 40,
    height: 30,
  },
  gap: {
    paddingLeft: 20,
    height: 100,
  },
});

const FORM_VALIDATION = Yup.object().shape({
  
  noticeDate: Yup.date().required("Required").test(
    "Transaction date",
    "Please choose a valid transactionDate date 🥱🥳",
    (date) =>
      moment().diff(moment(date), "years") <= 8
  ),
  plannedCheckOutDate: Yup.date().required("Required").test(
    "Transaction date",
    "Please choose a valid transactionDate date 🥱🥳",
    (date) =>
      moment().diff(moment(date), "years") <= 8
  ),
  
});
const notify = () => toast();

const InitiateCheckoutBtn = (props) => {
    const [INITIAL_FORM_STATE , setINITIAL_FORM_STATE] = React.useState({
                id:props.guestdetails.id,
                occupancyType:props.guestdetails.occupancyType,
                noticeDate: props.guestdetails.noticeDate,
                plannedCheckOutDate: props.guestdetails.plannedCheckOutDate
            
              })



  const [disableButtons, setDisableButtons] = React.useState(false);

  

  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };


  const classes = useStyles();

  return (
    
 <Grid container>
      <Grid item xs={12}>
        <Container maxWidth="md">
          <div>
            <Formik
              initialValues={{ ...INITIAL_FORM_STATE }}
              validationSchema={FORM_VALIDATION} 
              onSubmit={async (guest, { resetForm }) => {
                console.log(guest);
                await axios.post(`guest/initiatecheckoutbyguestid/${props.guestdetails.id}` ,guest )
                .then((res)=>{
                  console.log(res);
                  toast.success("Guest Checkout Successfully Initiated ")
                })
                // handleToggle();               
              }}
            >
              {(formProps) => (
                <Form>
                  <Grid container spacing={2}>                  
                    <Grid item xs={6}>
                        <h5>From </h5>
                        <DateTimePicker
                        // label="Transaction Date"
                          maxdate={new Date()}
                          name="noticeDate"
                          //label="Date of Birth"
                          required
                        />
                      </Grid><Grid item xs={6}>
                        <h5>To </h5>
                        <DateTimePicker
                        // label="Transaction Date"
                          maxdate={new Date()}
                          name="plannedCheckOutDate"
                          //label="Date of Birth"
                          required
                        />
                      </Grid>
                      <Grid item xs={12} sx={{ marginTop: 2 }} >
                     
                        <Button style={{align: "center"}} disabled={disableButtons} onClick={()=>{setDisableButtons(true)}}>INITIATE</Button>
                      
                    </Grid>
                  </Grid>
                  <ToastContainer  maxWidth="sx"
               position="top-right"
               autoClose={3000}
               type="toast.TYPE.SUCCESS"
               hideProgressBar={false}
               newestOnTop={false}
               closeOnClick
               rtl={false}
               pauseOnFocusLoss
               draggable
               pauseOnHover
               />
                  
                  
                </Form>
              )}
            </Formik>
          </div>
          <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
          
        </Container>
      </Grid>
    </Grid>

    
      );
};

export default InitiateCheckoutBtn;