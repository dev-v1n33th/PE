import Grid from "@mui/material/Grid";

import MDBox from "components/MDBox";

// import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import Footer from "examples/Footer";
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout/index"
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar/index"
import Footer from "../../examples/Footer/index"
import GuestReport from "./GuestReport";
//import Actions from "./components/Actions";
//import TabPanel from "./components/Tab"


function GuestReportMain() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <br />
      <MDBox borderRadius="lg" coloredShadow="info" py={0.01}>
        {/* <MDBox> */}
          <Grid container spacing={0.5}>
            < GuestReport/>
          </Grid>
        {/* </MDBox> */}
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default GuestReportMain;
