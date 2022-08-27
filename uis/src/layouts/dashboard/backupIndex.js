import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import BedandBill from "layouts/dashboard/components/BedandBIll";
import Expenditures from "layouts/dashboard/components/expenditures";

//import PendingPayments from "layouts/dashboard/components/summaryTables/PendingPayments";
import AvailabeRooms from "layouts/dashboard/components/summaryTables/AvailableRooms";
//import UpcomingCheckouts from "layouts/dashboard/components/summaryTables/UpcomingCheckouts";
import RecentTransactions from "layouts/dashboard/components/summaryTables/Recenttransactions";
import { Navigate } from "react-router-dom";

function Dashboard({ authorized }) {
  if (!authorized) {
    return <Navigate to="/authentication/sign-in" />;
  }
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <BedandBill total="7" info="" more="More Info" />
          </Grid>
          <Grid item xs={12}>
            <Expenditures />
          </Grid>
        </Grid>

        <h4 style={{ paddingTop: "10px" }}> Total Buildings Summary</h4>
        <MDBox mt={5}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Card>
                <MDBox
                  mx={3}
                  mt={-3}
                  py={1}
                  px={2}
                  variant="gradient"
                  sx={{ background: "#1E90FF" }}
                  borderRadius="lg"
                  coloredShadow="info"
                >
                  <MDTypography variant="h6" color="white">
                    RECENT TRANSACTIONS
                  </MDTypography>
                </MDBox>
                <MDBox pt={3}>
                  <RecentTransactions />
                </MDBox>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Card>
                <MDBox
                  mx={3}
                  mt={-3}
                  py={1}
                  px={2}
                  variant="gradient"
                  sx={{ background: "#1E90FF" }}
                  borderRadius="lg"
                  coloredShadow="info"
                >
                  <MDTypography variant="h6" color="white">
                    AVAILABLE BEDS
                  </MDTypography>
                </MDBox>
                <MDBox pt={3}>
                  <AvailabeRooms />
                </MDBox>
              </Card>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox mt={5}>
          <Grid container spacing={2}>
            {/* <Grid item xs={6}>
              <Card>
                <MDBox
                  mx={3}
                  mt={-3}
                  py={1}
                  px={2}
                  variant="gradient"
                  sx={{ background: "#1E90FF" }}
                  borderRadius="lg"
                  coloredShadow="info"
                >
                  <MDTypography variant="h6" color="white">
                    UPCOMING CHECKOUTS
                  </MDTypography>
                </MDBox>
                <MDBox pt={3}>
                  <UpcomingCheckouts />
                </MDBox>
              </Card>
            </Grid> */}
            {/* <Grid item xs={6}>
              <Card>
                <MDBox
                  mx={3}
                  mt={-3}
                  py={1}
                  px={2}
                  variant="gradient"
                  sx={{ background: "#1E90FF" }}
                  borderRadius="lg"
                  coloredShadow="info"
                >
                  <MDTypography variant="h6" color="white">
                    RECENT TRANSACTIONS
                  </MDTypography>
                </MDBox>
                <MDBox pt={3}>
                  <RecentTransactions />
                </MDBox>
              </Card>
            </Grid> */}
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
