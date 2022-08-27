//import { Grid } from "@mui/material";
import * as React from "react";

import Box from "@mui/material/Box";
//import Paper from '@mui/material/Paper';
//import * as React from 'react';
import {useState, useEffect} from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import axios from '../../../../Uri';
//import Grid from '@mui/material/Grid'
//import formatDate from "../guestPopUP/formateDate";

function SummaryTable(props) {
    const [apidata ,setapiData] = useState([])
    const [availBeds,setAvailBeds]=useState("")
    var totalbed = null
    var occupiedBed=null
    var availBed = null 
    var guestInNotices = null
    var guestOndue = null
    var totaldue = null

    useEffect(() => {

        async function fetchData() {
          const request = await axios.get(
            `/bed/getBuildingSummaryForPieChartByBuildingId/${props.buildingId}`
          );
          console.log(request.data)
          setapiData(request.data);
        }
        fetchData();
      }, [props.buildingId]);

   
 
 

 
 
 
 
  function createData(name, calories) {
    return { name, calories };
  }
  console.log(apidata)
  apidata.map((m)=>{
     totalbed =m.totalBeds
     occupiedBed= m.occupiedBeds
     availBed = m.availableBeds
     guestInNotices=m.guestsInNotice[0]
     guestOndue=m.guestsOnDue[0]
     totaldue= m.totalDueAmount[0]
    console.log(m.totalBeds)
   
  })
  const rows = [
    createData(<h4>Total Beds</h4>, totalbed),
    createData(<h4>Occupied Beds</h4>, occupiedBed ),
    createData(<h4>Available Beds</h4>, availBed),
    createData(<h4>Guests in Notice</h4>, guestInNotices ),
    createData(<h4>Guests on Due</h4>,  guestOndue),
    createData(<h4>Total Due Amount</h4>,totaldue)
    // createData(<h4>Guest Status</h4>, props.guestdetails.guestStatus),
    // createData(<h4>Duration</h4>, props.guestdetails.duration),
    // createData(<h4>Occupancy Type</h4>, props.guestdetails.occupancyType),
   

  ];
 
 
  return (
    <Grid container spacing={2} columns={16}>
    <Grid item xs={8}>

  <Table sx={{ minWidth: 500 ,paddingTop:500}} size="small" aria-label="a dense table">
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

</Grid>
{/* <Grid item xs={8}>

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

</Grid> */}
</Grid>
   
  );
}

export default SummaryTable;
