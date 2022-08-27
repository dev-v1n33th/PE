import Grid from "@mui/material/Grid";

import MDBox from "components/MDBox";

//custom imports
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
//import Actions from "./components/Actions";
import TabPanel from "./components/Tab"


function Dashboard() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <br />
      <MDBox borderRadius="lg" coloredShadow="info" py={0.01}>
        {/* <MDBox> */}
          <Grid container spacing={0.5}>
            <TabPanel/>
          </Grid>
        {/* </MDBox> */}
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
