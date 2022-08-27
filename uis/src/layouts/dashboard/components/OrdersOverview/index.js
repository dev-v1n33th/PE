
import Card from "@mui/material/Card";


import MDBox from "components/MDBox";

import TimelineItem from "examples/Timeline/TimelineItem";


function OrdersOverview() {
  return (
    <Card sx={{ height: "100%" }}>
       <MDBox pt={3} px={3}>
       
      </MDBox>
      
      <MDBox p={2}>
        <TimelineItem
          color="success"
          icon="home"
          title="Building 1"
        />
        
        <TimelineItem
          color="error"
          icon="beds"
          title="Available Beds  "
          dateTime="22"
                  />
        <TimelineItem
          color="info"
          icon="checkout"
          title="Check-outs (this month) "
          dateTime="20"
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
          dateTime="21454"
         
        />
      </MDBox> 
    </Card>
  );
}

export default OrdersOverview;