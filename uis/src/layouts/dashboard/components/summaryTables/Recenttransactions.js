import React, {useEffect,useState} from 'react';
import { DataGrid } from '@mui/x-data-grid';
import MaterialTable from 'material-table';
import Grid from '@mui/material/Grid'



import axios from "../../../../Uri"








export default function AvailableRooms() {

const columns = [
{
title: "GUEST ID",
field: "guestId",
type: "text",
},

{
title: "AMOUNT PAID",
field: "amountPaid",
type: "text",
},

{
title: "TRANSACTION ID",
field: "transactionId",
},
{
title: "TRANSACTION DATE",
field: "transactionDate",
},
{
title: "PAYMENT PURPOSE",
field: "paymentPurpose",
},

];
const [transaction,setTransaction]=React.useState([])



useEffect(() => {
axios
.get("/payment/getRecentPayments?field=date")
.then((res) => {
setTransaction(res.data);
//console.log(res.data);
})

.catch((err) => {
console.log(err);
});
}, []);
return (
<div style={{ height: 400, width: "100%" }}>
{/* <DataGrid rows={table} columns={columns} pageSize={5} rowsPerPageOptions={[ 5 ]} /> */}
<Grid>
<MaterialTable
title="Recent Transactions"
data={transaction}
// sx={{ color: "white" }}
columns={columns}
options={{
// exportButton: true,
pageSize: 10,
actionsColumnIndex: -1,
grouping: true,
addRowPosition: "first",
headerStyle: {
backgroundColor: "#1E90FF",
color: "white",
fontSize: "15px",
//height: "10px",
//fontWeight: 'bold'
},
rowStyle: {
fontSize: 16,
},
}}
/>
</Grid>
<br></br>
<br></br>
</div>
);
}