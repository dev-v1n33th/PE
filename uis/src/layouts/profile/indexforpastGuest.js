import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
//import GuestLoginForm from './GuestLoginForm/components/GuestLoginForm';
import PastGuestLoginForm from "./GuestLoginForm/components/PastGuestOnBoardig";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

function PastGuest() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox bgColor="white" py={0.01}>
        <MDBox>
          <Grid container spacing={6}>
            <Grid item xs={20} md={10} lg={20}>
            <PastGuestLoginForm />
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default PastGuest;
