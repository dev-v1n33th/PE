import Grid from "@mui/material/Grid";

import MDBox from "components/MDBox";

//custom imports
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Monthly from "./MonthlySummary";
//import Actions from "./components/Actions";
//import TabPanel from "./components/Tab"
//
function MonthlySummary() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <br />

      <Grid >
        <Monthly />
      </Grid>

      <Footer />
    </DashboardLayout>
  );
}

export default MonthlySummary;
