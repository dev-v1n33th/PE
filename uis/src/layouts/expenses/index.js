import MDBox from "components/MDBox";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import Actions from "./Actions";

import Expenses from "./Expenses";

function Tables() {
  const { columns, rows } = Expenses();

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <MDBox pt={6} pb={3}>
        <Actions />
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
