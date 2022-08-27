
import Card from "@mui/material/Card";


import MDBox from "components/MDBox";

import TimelineItem from "examples/Timeline/TimelineItem";


function BuildingTwo() {
  return (
    <Card sx={{ height: "100%" }}>
       <MDBox pt={3} px={3}>
        
      </MDBox>
      
      <MDBox p={2}>
        
        <TimelineItem
          color="success"
          icon="home"
          title="Building 2"
        />
      
        <TimelineItem
          color="error"
          icon="beds"
          title="Available Beds  "
          dateTime="23"
        />
        <TimelineItem
          color="info"
          icon="checkout"
          title="Check-outs (this month) "
          dateTime="15"
        />
        <TimelineItem
          color="warning"
          icon="payment"
          title="Due Payments  "
          dateTime="11"
        />
        <TimelineItem
          color="primary"
          icon="money"
          title="Counts"
          dateTime="10000"
        />
      </MDBox> 
    </Card>
  );
}

export default BuildingTwo;