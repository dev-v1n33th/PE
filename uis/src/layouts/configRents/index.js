

import Grid from "@mui/material/Grid";

import MDBox from "components/MDBox";

//custom imports
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
// import ConfigSecurityDeposit from "./ConfigSecurityDeposit"
//import Actions from "./components/Actions";
//import TabPanel from "./components/Tab"
import ConfigRents from "./ConfigRents";


function ConfigRentsIndex() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <br />
      <MDBox borderRadius="lg" coloredShadow="info" py={0.01}>
      
          <Grid container spacing={0.5}>
            
            <Grid item xs={12}><ConfigRents /></Grid>
          </Grid>
        
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default ConfigRentsIndex;
