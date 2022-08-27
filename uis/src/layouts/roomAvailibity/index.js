import Grid from "@mui/material/Grid";

import MDBox from "components/MDBox";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import RoomTable from "./RoomTable";
import UnAllocatedInventory from "layouts/roomAvailibity/UnAllocatedInventory";

function RoomAvailability() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <MDBox mb={3}>
          <Grid container>
            <Grid item xs={12}>
              <RoomTable display="flex" justifyContent="flex-end" />
            </Grid>
          </Grid>
        </MDBox>
        <MDBox>
          <Grid container>
            <Grid item xs={12}>
              {/* <UnAllocatedInventory /> */}
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default RoomAvailability;
