import MDBox from "components/MDBox";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import PaymentReport from "./Reports";

function PaymentModules() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={1}>
        <MDBox mt={4}>
          
            <MDBox
              mx={0.5}
              mt={-3}
              py={2}
              px={2}
              variant="gradient"
              borderRadius="lg"
              coloredShadow="info"
            >
              <PaymentReport />
            </MDBox>
         
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default PaymentModules;
