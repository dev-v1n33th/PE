

import Grid from "@mui/material/Grid";

import MDBox from "components/MDBox";
import SetSecurityDeposit from "./SetSecurityDeposit";
//custom imports
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
//import Actions from "./components/Actions";
//import TabPanel from "./components/Tab"
// import ConfigRents from "../../configRents/ConfigRents";


function AddingSecurityDeposits() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <br />
      <MDBox borderRadius="lg" coloredShadow="info" py={0.01}>
        {/* <MDBox> */}
          <Grid container spacing={0.5}>
            <Grid item xs={12}>
            <SetSecurityDeposit />
            <br />
            </Grid>
            {/* <Grid item xs={12}><ConfigRents /></Grid> */}
          </Grid>
        {/* </MDBox> */}
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default AddingSecurityDeposits;
