//import { Grid } from "@mui/material";
import * as React from "react";

import Box from "@mui/material/Box";
//import Paper from '@mui/material/Paper';
//import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
//import Grid from '@mui/material/Grid'
//import formatDate from "../guestPopUP/formateDate";

function VacatedDOMGuestdetails(props) {
  // var today = new Date();
  // var dd = String(today.getDate()).padStart(2, "0");
  // var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  // var yyyy = today.getFullYear();
  // today = dd + "-" + mm + "-" + yyyy;
  function formatDate(checkInDate) {
    var datePart = checkInDate.match(/\d+/g),
      year = datePart[0], // get only two digits
      month = datePart[1],
      day = datePart[2];

    return day + "-" + month + "-" + year;
  }
  // if (props.guestdetails.noticeDate) {
  //   var myDate = props.guestdetails.noticeDate;
  //   myDate = myDate.split("");
  //   console.log(myDate);
  //   var date = [];
  //   date.push(myDate);
  //   console.log(date);
  // } else {
  //   console.log("");
  // }
//   var s = props.guestdetails.plannedCheckOutDate.toLocaleString("ko-KR", {
//     timeZone: "Asia/Kolkata",
//   });
//   // console.log(s);
//   var da = formatDate(s)
  function createData(name, calories) {
    return { name, calories };
  }
  
  const rows = [
    createData(<h4>Guest Id</h4>, props.guestdetails.id),
    createData(<h4>Guest Name</h4>, props.guestdetails.firstName),
    createData(<h4>Mobile</h4>, props.guestdetails.personalNumber),
    createData(<h4>Email</h4>, props.guestdetails.email),
    createData(<h4>Bed ID</h4>, props.guestdetails.bedId),
    createData(<h4>Guest Status</h4>, props.guestdetails.guestStatus),
    createData(<h4>Duration</h4>, props.guestdetails.duration),
    createData(<h4>Occupancy Type</h4>, props.guestdetails.occupancyType),
    createData(<h4>Aadhar Number</h4>, props.guestdetails.aadharNumber),
    

  ];
  const rows1=[
    
    createData(<h4>Check-in Date</h4>, formatDate(props.guestdetails.checkInDate)),
    createData(<h4>Planned Check-out Date</h4>,props.guestdetails.plannedCheckOutDate),
    createData(<h4>Due Amount</h4>, 'Rs.'+props.GuestDueAmount),
    createData(<h4>Total Amount Paid</h4>, 'Rs.'+ props.TotalAmountByGuest),
    // createData(<h4>SecurityDeposit</h4>,'Rs.'+ props.guestdetails.securityDeposit ),
    createData(<h4>Default Rent</h4>,'Rs.'+ props.guestdetails.defaultRent ),
    createData(<h4>Checked-Out Date</h4>, props.guestdetails.checkOutDate ),
    createData(<h4>Gender </h4>, props.guestdetails.gender ),
    createData(<h4>State </h4>, props.guestdetails.state ),
    createData(<h4>Address </h4>, props.guestdetails.addressLine1 ),

  ]

//  console.log('this is DOM guy')
//  console.log(props.TotalAmountByGuest)
  return (
    <Grid container spacing={2} columns={16}>
    <Grid item xs={8}>
{/* <TableContainer component={Paper}> */}
  <Table sx={{ minWidth: 500 }} size="small" aria-label="a dense table">
    <TableHead>
      <TableRow>
      </TableRow>
    </TableHead>
    <TableBody>
      {rows.map((row) => (
        <TableRow
          key={row.name}
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
          <TableCell component="th" scope="row">
            {row.name}
          </TableCell>
          <TableCell align="right">{row.calories}</TableCell>
          <TableCell align="right">{row.fat}</TableCell>
          {/* <TableCell align="right">{row.carbs}</TableCell> */}
          <TableCell align="right">{row.protein}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
{/* </TableContainer> */}
</Grid>
<Grid item xs={8}>
{/* <TableContainer component={Paper}> */}
  <Table sx={{ minWidth: 500 }} size="small" aria-label="a dense table">
    <TableHead>
      <TableRow>
  
      </TableRow>
    </TableHead>
    <TableBody>
      {rows1.map((row) => (
        <TableRow
          key={row.name}
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
          <TableCell component="th" scope="row">
            {row.name}
          </TableCell>
          <TableCell align="right">{row.calories}</TableCell>
          <TableCell align="right">{row.fat}</TableCell>
          <TableCell align="right">{row.carbs}</TableCell>
          <TableCell align="right">{row.protein}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
{/* </TableContainer> */}
</Grid>
<Divider />
</Grid>
  

    
  );
}

export default VacatedDOMGuestdetails;
