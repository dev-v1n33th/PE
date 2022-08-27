import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
// import axios from "axios";
import axios from "../../../../../src/Uri";
import { Container, Grid, InputLabel } from "@mui/material";
import moment from "moment";
import Gender from "layouts/profile/GuestLoginForm/components/Gender";

import { makeStyles } from "@mui/styles";
import MDTypography from "components/MDTypography";
import state from "layouts/profile/GuestLoginForm/components/State";

import Textfield from "layouts/profile/GuestLoginForm/components/TextField";
import Select from "layouts/profile/GuestLoginForm/components/Select";
// import Purpose from "./Purpose";
import DateTimePicker from "../../../../layouts/profile/GuestLoginForm/components/DataTimePicker";
import Button from "layouts/profile/GuestLoginForm/components/Button";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Backdrop, CircularProgress } from "@mui/material";
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
    email: Yup.string().email("Invalid email."),
    // dateOfBirth: Yup.date().test(
    //     "DOB",
    //     "Please choose a valid date of birth",
    //     (date) =>
    //         moment().diff(moment(date), "years") >= 12 &&
    //         moment().diff(moment(date), "years") <= 80
    // ),
    aadharNumber: Yup.string()
    .matches(/^\d{4}\d{4}\d{4}$/, "Invalid Aadhar Number"),
    gender: Yup.string(),
    personalNumber: Yup.string()
        .matches(/^[6-9]\d{9}$/, {
            message: "Please enter Valid Mobile Number",
            excludeEmptyString: false,
        }),
        city: Yup.string()
    .matches(/^[aA-zZ\s]+$/, "Invalid City Name"),
    state: Yup.string()
    .matches(/^[aA-zZ\s]+$/, "Invalid State "),
    pincode: Yup.string()
        .matches(/^\d{2}\d{2}\d{2}$/, "Invalid PinCode Number"),
    addressLine1: Yup.string(),


});
const notify = () => toast();

const EditGuestForm = (props) => {



    const [disableButtons, setDisableButtons] = React.useState(false);
    const [INITIAL_FORM_STATE, setINITIAL_FORM_STATE] = React.useState({
        firstName: props.guestdetails.firstName,
        lastName: props.guestdetails.lastName,
        email: props.guestdetails.email,
        personalNumber: props.guestdetails.personalNumber,
        aadharNumber: props.guestdetails.aadharNumber,
        addressLine1: props.guestdetails.addressLine1,
        dateOfBirth: props.guestdetails.dateOfBirth,
        gender: props.guestdetails.gender,
        pincode: props.guestdetails.pincode,
        city: props.guestdetails.city,
        state: props.guestdetails.state





    })

    // let userData = JSON.parse(sessionStorage.getItem("userdata"));
    // let userId = userData.data.userId
    // console.log(userId)

    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleToggle = () => {
        setOpen(!open);
    };

    // var GuestOccupancyType = props.guestdetails.occupancyType;
    // var buildingId = props.guestdetails.buildingId;
    // var GuestID = props.guestdetails.id;
    // var INITIAL_FORM_STATE = ;

    const classes = useStyles();
    // const editGuestHandler=props.editGuestHandler;

    return (
        // <div className="record-payment">
        <Grid container>
            {/* <Grid item xs={12}><MDTypography gutterBottom><h5 className='head-1-checkOut' >Clear Due amount</h5></MDTypography></Grid> */}
            <Grid item xs={12}>
                <Container maxWidth="md">
                    <div>
                        <Formik
                            initialValues={{ ...INITIAL_FORM_STATE }}
                            validationSchema={FORM_VALIDATION}
                            onSubmit={async (guest, { resetForm }) => {

                                console.log(guest);
                                
                                handleToggle();



                                const res = await axios.put(`guest/editGuestDetails/${props.guestdetails.id}`, guest)
                                    .catch((err) => {toast.error("Server error");});
                                
                                if (res.data.body !== null) {
                                    handleClose()
                                    toast.success("Updated successfully");
                                    setINITIAL_FORM_STATE({
                                        firstName: "res.data.body.firstName",
                                        lastName: res.data.body.lastName,
                                        email: res.data.body.email,
                                        personalNumber: res.data.body.personalNumber,
                                        aadharNumber: res.data.body.aadharNumber,
                                        addressLine1: res.data.body.addressLine1,
                                        dateOfBirth: res.data.body.dateOfBirth,
                                        gender: res.data.body.gender,
                                        pincode: res.data.body.pincode,
                                        city: res.data.body.city,
                                        state: res.data.body.state

                                    })
                                }  
                            }}
                        >
                            {(formProps) => (
                                <Form>
                                    <Grid container spacing={2}>
                                        <Grid item xs={6}>
                                            <h5>First Name*</h5>
                                            <Textfield inputProps={{ readOnly: true, }} name="firstName" />


                                        </Grid>
                                        <Grid item xs={6}>
                                            <h5>Last Name*</h5>
                                            <Textfield inputProps={{ readOnly: true, }} name="lastName" />
                                        </Grid>

                                        <Grid item xs={6}>
                                            <h5>Email*</h5>
                                            <Textfield name="email" />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <h5>Date of Birth *</h5>
                                            <DateTimePicker
                                                maxdate={new Date()}
                                                name="dateOfBirth"
                                                //label="Date of Birth"
                                                required
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <h5>Phone Number*</h5>
                                            <Textfield name="personalNumber" />
                                        </Grid>
                                        <Grid item xs={6}>

                                            <h5>Select Gender *</h5>

                                            <Select
                                                IconComponent={() => (
                                                    <ArrowDropDownIcon className={classes.size} />
                                                )}
                                                name="gender"
                                                options={Gender}
                                                className={classes.root}
                                            ></Select>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <h5>Aadhar*</h5>
                                            <Textfield name="aadharNumber" />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <h5>Address*</h5>
                                            <Textfield name="addressLine1" />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <h5>Pincode *</h5>
                                            <Textfield
                                                name="pincode"
                                                //label="Pincode"
                                                required
                                            />
                                        </Grid>

                                        <Grid item xs={6}>
                                            <h5>City *</h5>
                                            <Textfield
                                                name="city"
                                                //label="City"
                                                required
                                            />
                                        </Grid>

                                        <Grid item xs={6}>

                                            <h5>Select state *</h5>

                                            <Select
                                                IconComponent={(Gender) => (
                                                    <ArrowDropDownIcon className={classes.size} />
                                                )}
                                                name="state"
                                                options={state}
                                                className={classes.root}
                                            ></Select>
                                        </Grid>







                                        <Grid item xs={6} sx={{ marginTop: 2 }} >

                                            <Button style={{ align: "center" }} disabled={disableButtons} onClick={() => { setDisableButtons(true) }}>Submit</Button>

                                        </Grid>
                                    </Grid>

                                    <ToastContainer maxWidth="sx"
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

        // </div>
    );
};

export default EditGuestForm;