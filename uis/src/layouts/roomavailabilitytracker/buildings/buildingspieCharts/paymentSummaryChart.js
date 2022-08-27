import React from "react";
import { Chart } from "react-google-charts";
import { useEffect, useState } from "react";
import axios from "../../../../Uri";

var apidata = null;
var innerapidata = null;
var data = null;

const options = {
  title: "PaymentSummary",
  slices: [
    {
      color: "#D2691E",
    },
    {
      color: "#6495ED",
    },
  ],
};

export default function PaymentSummaryChart(props) {
  console.log(props.buildingId);
  const [completedPayments, setCompletedPayments] = useState(0);
  const [pendingPayments, setPendingPayments] = useState(0);
  const [innerapidata, setinnerapidata] = React.useState([]);
  useEffect(() => {
    async function fetchData() {
      await axios
        .get(`guest/getPendingAndCompletedById/${props.buildingId}`)
        .then((res) => {
          setCompletedPayments(res.data[0][0]);
          setPendingPayments(res.data[0][1]);
          console.log(completedPayments);
          console.log(pendingPayments);
        });
    }
    fetchData();
  }, [props.buildingId]);

  //console.log(apidata[0])

  var data = [
    ["Task", "Hours per Day"],
    ["Completed Payments", completedPayments],
    ["Pending Payments", pendingPayments],
  ];

  return (
    <>
      {data === null ? (
        <div></div>
      ) : (
        <Chart
          chartType="PieChart"
          data={data}
          options={options}
          width={"100%"}
          height={"400px"}
        />
      )}
    </>
  );
}
