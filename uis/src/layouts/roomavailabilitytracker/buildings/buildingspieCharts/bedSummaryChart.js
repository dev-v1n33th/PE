import React from "react";
import { Chart } from "react-google-charts";
//import BuildingsLayout from "../buildingsLayout/buildingsLayout";
import { useEffect, useState } from "react";
// import axios from "axios";
import axios from "../../../../Uri";

var availableBeds = 0;
var occupiedBeds = 0;
export const options = {
  title: "BedSummary",
  slices: [
    {
      color: "#D2691E",
    },
    {
      color: "#6495ED",
    },
  ],
};

export default function BedSummaryChart(props) {
  const [apidata, setapiData] = React.useState([]);
  // const [buildingid ,setbuildingid] =React.useState(1)
  //console.log(props.buildingId)
  // setbuildingid(props.buildingId)
  useEffect(() => {

    async function fetchData() {
      const request = await axios.get(
        `/bed/getBedSummaryForPieChartByBuildingId/${props.buildingId}`
      );
      setapiData(request.data);
    }
    fetchData();
  }, [props.buildingId]);


  apidata.map((obj) => {
    occupiedBeds = obj.occupiedBeds;
    availableBeds = obj.availableBeds;
  });

  var data = [
    ["Task", "Hours per Day"],
    ["AvailableBeds", availableBeds],
    ["OccupiedBeds", occupiedBeds],
  ];
  return (
    <>
      {props.buildingId === null ? (<div></div>) : (<Chart
        chartType="PieChart"
        data={data}
        options={options}
        width={"100%"}
        height={"400px"}
      />)}

    </>
  );
}
