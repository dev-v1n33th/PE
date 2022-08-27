import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import ArrowCircleRightRoundedIcon from "@mui/icons-material/ArrowCircleRightRounded";
import IconButton from "@mui/material/IconButton";
import { CardContent, Divider } from "@mui/material"; // import axios from 'axios';
import axios from "../../../../Uri";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
function BedandBill(props) {
  const [build, setBuild] = React.useState([]);
  useEffect(() => {
    axios
      .get("/bed/getAllBedsCount")
      .then((res) => {
        //console.log(res.data);
        setBuild(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  //console.log(build.totalAvailbleBeds);
  const [payments, setPayments] = React.useState(0);
  let pendingPayments = [];
  let dueAmount = [];
  const [overDue, setOverDue] = React.useState([]);
  useEffect(() => {
    axios
      .get("/payment/getpendingPayment")
      .then((res) => {
        pendingPayments = res.data;
        setPayments(pendingPayments[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    axios
      .get("/guest/getDueAmountOnDashBoard")
      .then((res) => {
        dueAmount = res.data;
        setOverDue(dueAmount);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <Grid item xs={12} md={6} lg={3}>
        <h4>Overall Monthly Summary</h4>
      </Grid>
      <br />
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={3}>
          <MDBox mb={1.5}>
            <Card
              sx={{ minWidth: 240, minHeight: 100, background: "#a52a2a" }}
              style={{ backgroundColor: "#a52a2a" }}
            >
              <CardContent sx={{ align: "center" }}>
                <MDTypography
                  color="light"
                  mt={1}
                  fontWeight="regular"
                  style={{ fontSize: "2em" }}
                >
                  {build.totalBeds}
                </MDTypography>
                <MDTypography color="light" fontWeight="light">
                  Total Beds
                </MDTypography>
                <Divider variant="insent" fullWidth />
              </CardContent>
            </Card>
          </MDBox>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <MDBox mb={1.5}>
            <Card
              sx={{ minWidth: 240, minHeight: 100, background: "#2E8B57" }}
              style={{ backgroundColor: "#2E8B57" }}
            >
              <CardContent sx={{ align: "center" }}>
                <MDTypography
                  color="light"
                  mt={1}
                  fontWeight="regular"
                  style={{ fontSize: "2em" }}
                >
                  {build.totalAvailbleBeds}
                </MDTypography>
                <MDTypography color="light" fontWeight="light">
                  Available Beds
                </MDTypography>
                <Divider variant="insent" fullWidth />
              </CardContent>
            </Card>
          </MDBox>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <MDBox mb={1.5}>
            <Card
              sx={{ minWidth: 240, minHeight: 100, background: "#00008B" }}
              style={{ backgroundColor: "#00008B" }}
            >
              <CardContent sx={{ align: "center" }}>
                <MDTypography
                  color="light"
                  mt={1}
                  fontWeight="regular"
                  style={{ fontSize: "2em" }}
                >
                  {overDue != 0 ? overDue : '0'}
                </MDTypography>
                <MDTypography color="light" fontWeight="light">
                  Overdue amount
                </MDTypography>
                <Divider variant="insent" fullWidth />
               
              </CardContent>
            </Card>
          </MDBox>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <MDBox mb={1.5}>
            <Card
              sx={{ minWidth: 240, minHeight: 100, background: "#800080" }}
              style={{ backgroundColor: "#800080" }}
            >
              <CardContent sx={{ align: "center" }}>
                <MDTypography
                  color="light"
                  mt={1}
                  fontWeight="regular"
                  style={{ fontSize: "2em" }}
                >
                  {payments != 0 ? payments : 0}
                </MDTypography>
                <MDTypography color="light" fontWeight="light">
                 Guests on Due
                </MDTypography>
                <Divider variant="insent" fullWidth />
              </CardContent>
            </Card>
          </MDBox>
        </Grid>
      </Grid>
    </div>
  );
}
export default BedandBill;
