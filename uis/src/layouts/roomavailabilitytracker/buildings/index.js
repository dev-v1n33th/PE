import React, { useEffect , useState } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
// import { useEffect } from "react";

import { Grid} from "@mui/material";

import BuildingsLayout from "./buildingsLayout/buildingsLayout";
import BedSummaryChart from "./buildingspieCharts/bedSummaryChart";
import PaymentSummaryChart from "./buildingspieCharts/paymentSummaryChart";

import AdmBuildingDropdown from "./AdmBuildingDropdown";
import MgrBuildingDropdown from "./MgrBuildingDropdown";

const BuildingsTracker = () => {
  var typeofUser = {}
  var userData = JSON.parse(sessionStorage.getItem('userdata'))
  if (userData) {
    var typeofUser = userData.data.userType;
  }
  // const [userdetails , setUserDetails] = React.useState({})
  // useEffect(() => {
  //   setUserDetails(JSON.parse(sessionStorage.getItem('userData')))
  //   console.log(userdetails)
    
  // } , [])
  return (
    <DashboardLayout>
      <DashboardNavbar />

      <MDBox bgColor="white" padding="8px">
      
        {typeofUser == "manager" ? (< MgrBuildingDropdown />) : (<AdmBuildingDropdown />)}
      </MDBox>

      <br />
      {/* <MDBox bgColor="white" padding="4px">
        <Grid container direction="row" justifyContent="left" alignItems="left">
          <Grid item xs={6}>
            <BedSummaryChart buildingName={props.buildingName} />
          </Grid>
          <Grid item xs={6}>
            <PaymentSummaryChart />
          </Grid>
        </Grid>
      </MDBox> */}

      {/* <BuildingsLayout buildingName={props.buildingName} /> */}
    </DashboardLayout>
  );
};

export default BuildingsTracker;
