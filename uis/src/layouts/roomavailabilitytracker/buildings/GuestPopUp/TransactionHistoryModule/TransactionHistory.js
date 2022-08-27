import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { makeStyles } from "@mui/styles";
import { useEffect, useState } from "react";
import './TransactionHistory.css'
import Grid from "@mui/material/Grid";
// import axios from "axios";
//import Table from 'react-bootstrap'
import axios from "../../../../../Uri";
const useStyles = makeStyles({
  root: {
    paddingLeft:120
  },
  date:{
    paddingLeft:100
  },
  header: {
    paddingLeft:20
  },
  transaction:{
    paddingLeft:20
  },
  amount:{
    paddingLeft:120
  },
  negetive:{
    paddingLeft:-20
  }
});

// const [tableData,setTableData] = useState([])

export default function TransactionHistory(props) {
  //console.log(props.guestdetails.id);
  const [history, setHistory] = useState([]);
  
  function ChangeFormateDate(transactionDate){
    let day=transactionDate.split("-").reverse().join("-");
    return day;

 }
 const classes = useStyles();
  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        `/payment/getTrasactionHistoryByGuestId/${props.guestdetails.id}`
      )
      console.log(response.data);
      setHistory(response.data);
 
    }
    fetchData();
  }, []);
  console.log(history);
  function formatDate(checkInDate) {
    var datePart = checkInDate.match(/\d+/g),
      year = datePart[0].substring(2), // get only two digits
      month = datePart[1],
      day = datePart[2];

    return day + "-" + month + "-" + year;
  }
  // var s = history.transactionDate.toLocaleString("ko-KR", {
  //   timeZone: "Asia/Kolkata",
  // });
  // console.log(s);
  // var da = formatDate(s)
  // function createData(name, calories, fat, carbs, protein) {
  //   return { name, calories, fat, carbs, protein };
  // }
  
  // const rows = [
  //   createData(props.paymentId, formatDate(row.transactionDate), row.amountPaid, 24, 4.0),
  //   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  //   createData('Eclair', 262, 16.0, 24, 6.0),
  //   createData('Cupcake', 305, 3.7, 67, 4.3),
  //   createData('Gingerbread', 356, 16.0, 49, 3.9),
  // ];
  
  return (
    
    <Table striped bordered hover >
  <thead>
    <tr >
      <th align="left">PAYMENT ID</th>
      <th align="left">TRANSACTION DATE</th>
      <th align="left">REFUND</th>
      <th align="left">AMOUNT</th>
      <th align="left">PAYMENT PURPOSE</th>
      <th align="left">TRANSACTION ID</th>
    </tr>
  </thead>
  <tbody>
    {history.map((row)=>(
      <tr>
      <td>{row.paymentId}</td>
      <td>{row.transactionDate}</td>
      <td>{row.refundAmount}</td>
      <td align="center">{row.amountPaid}</td>
      <td>{row.paymentPurpose}</td>
      <td>{row.transactionId}</td>
    </tr>
    ))}
    
    {/* <tr>
      <td>2</td>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
    <tr>
      <td>3</td>
      <td colSpan={2}>Larry the Bird</td>
      <td>@twitter</td>
    </tr> */}
  </tbody>
</Table>

  )
}
//     <div className="payBox">
// <TableContainer sx={{ alignContent: "center" }} component={Paper}>
//       <Table sx={{ minWidth: 500 }} aria-label="simple table">
//         <TableHead>
//           <TableRow>
//             <TableCell>PAYMENT ID</TableCell>
//             <TableCell>TRANSACTION DATE</TableCell>

//             <TableCell align="center">AMOUNT</TableCell>
//             <TableCell align="center">PAYMENT PURPOSE</TableCell>
//             <TableCell align="center">TRANSACTION ID</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {history.map((row) => 
//             // var date = row.transactionDate;
//             // year =date[0],
//             // month = date[1],
//             // day = date[2];
//             // var finaldate= day+month+year

//             (
              
//             <TableRow sx={{ alignContent: "center" }}>
//               <TableCell component="th" scope="row">
              
//                 {row.paymentId}
//                 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

//                 {row.transactionDate.split("-").reverse().join("-")}
//                 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//                 {row.amountPaid}
//                 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//                 {row.paymentPurpose}
//                 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//                 {row.transactionId}
//               </TableCell>
//             </TableRow>
//           )
        
//           )}
//         </TableBody>
//       </Table>
//     </TableContainer>
//     </div>

{/* <Grid>

  <TableHead>
    <TableRow>
    <TableCell className={classes.negetive}>PAYMENT ID</TableCell>
    <TableCell className={classes.negetive}>TRANSACTION DATE</TableCell>
    <TableCell align="center" className={classes.header}>AMOUNT</TableCell>
    <TableCell align="center" className={classes.header}>PAYMENT PURPOSE</TableCell>
    <TableCell align="center"className={classes.header}>TRANSACTION ID</TableCell>
    </TableRow>
  </TableHead>
  <TableBody>
    {history.map((row) => (
      <TableRow
        key={row.paymentId}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >
        <TableCell component="th" scope="row">
          {row.paymentId}
        </TableCell>
        <TableCell align="right" padding='normal' className={classes.date} >{formatDate(row.transactionDate)}</TableCell>
        <TableCell align="right" padding='normal' className={classes.amount}>{row.amountPaid}</TableCell>
        <TableCell align="right" padding='normal'className={classes.root}>{row.paymentPurpose}</TableCell>
        <TableCell align="right" padding='normal' className={classes.transaction}>{row.transactionId}</TableCell>
      </TableRow>
    ))}
  </TableBody>

</Grid>
     */}
