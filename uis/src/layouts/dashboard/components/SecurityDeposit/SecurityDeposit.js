import PropTypes from "prop-types";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import { useMaterialUIController } from "context";
import { Grid } from "@mui/material";

function SD({ name, company, email, vat, noGutter }) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  return (
    <MDBox
      component="li"
      display="flex"
      justifyContent="space-between"
      alignItems="flex-start"
      bgColor={darkMode ? "transparent" : "grey-100"}
      borderRadius="lg"
      p={3}
      mb={noGutter ? 0 : 1}
      mt={2}
    >
      <MDBox width="100%" display="flex" flexDirection="column">
        <Grid container spacing={3}>
          <Grid align="center" style={{ color: "blue" }} item xs={3}>
            INR 7500
            <MDTypography align="center" variant="h6" fontWeight="medium">
              Total
            </MDTypography>
          </Grid>
          <Grid align="center" style={{ color: "green" }} item xs={3}>
            INR 5000
            <MDTypography align="center" variant="h6" fontWeight="medium">
              Active Guests
            </MDTypography>
          </Grid>
          <Grid align="center" style={{ color: "orange" }} item xs={3}>
            INR 0
            <MDTypography align="center" variant="h6" fontWeight="medium">
              Vacated Guests
            </MDTypography>
          </Grid>
          <Grid align="center" style={{ color: "red" }} item xs={3}>
            INR 500
            <MDTypography align="center" variant="h6" fontWeight="medium">
              Checkout Refund Amount
            </MDTypography>
          </Grid>
        </Grid>
      </MDBox>
    </MDBox>
  );
}

SD.defaultProps = {
  noGutter: false,
};

SD.propTypes = {
  name: PropTypes.string.isRequired,
  company: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  vat: PropTypes.string.isRequired,
  noGutter: PropTypes.bool,
};

export default SD;
