import Card from "@mui/material/Card";

import MDBox from "components/MDBox";

import TimelineItem from "examples/Timeline/TimelineItem";

function BuildingFour() {
  return (
    <Card sx={{ height: "100%" }}>
      <MDBox pt={3} px={3}></MDBox>

      <MDBox p={2}>
        <TimelineItem color="success" icon="home" title="Building 4" />

        <TimelineItem
          color="error"
          icon="beds"
          title=" Available Beds    "
          dateTime="17"
        />
        <TimelineItem
          color="info"
          icon="checkout"
          title="Check-outs (this month) "
          dateTime="16"
        />
        <TimelineItem
          color="warning"
          icon="payment"
          title="Due Payments"
          dateTime="20"
        />
        <TimelineItem
          color="primary"
          icon="money"
          title="Counts"
          dateTime="12000"
        />
      </MDBox>
    </Card>
  );
}

export default BuildingFour;
