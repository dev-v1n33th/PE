import Card from "@mui/material/Card";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import SD from "layouts/dashboard/components/SecurityDeposit/SecurityDeposit";

function SecurityDeposit({ name }) {
  return (
    <Card id="delete-account">
      <MDBox px={2}>
        <MDTypography align="center" variant="h5" fontWeight="medium">
          {name}
        </MDTypography>
      </MDBox>
      <MDBox px={2}>
        <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          <SD />
        </MDBox>
      </MDBox>
    </Card>
  );
}

export default SecurityDeposit;
