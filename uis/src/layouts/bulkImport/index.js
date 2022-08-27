import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import BulkImport from "./BulkImport";
import Footer from "examples/Footer";

function Bulk() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox
                mx={2}
                mt={3}
                py={3}
                px={5}
                variant="gradient"
                bgColor="white"
                borderRadius="lg"
                coloredShadow="info"
              >
        <MDBox>
          <Grid container spacing={6}>
            <Grid item xs={20} md={10} lg={20}>
              <BulkImport/>
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      
      <Footer />
    </DashboardLayout>
  );
}

export default Bulk;
