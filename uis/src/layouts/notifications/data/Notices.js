import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "id", headerName: "SLNO", width: 70 },
  { field: "bedId", headerName: "BED ID", width: 130 },
  { field: "name", headerName: "NAME", width: 200 },
  {
    field: "due",
    headerName: "DUE",
    type: "number",
    width: 90,
  },
  { field: "lastPaid", headerName: "LAST PAID ON", width: 130 },
  { field: "noticeGiven", headerName: "NOTICE GIVEN ON", width: 130 },
  { field: "checkoutOn", headerName: "CHECKOUT ON", width: 130 },
];

const rows = [
  {
    id: 1,
    bedId: "P1C",
    name: "Utkarsh Kamuni",
    due: 0,
    lastPaid: "09-Oct-21",
    noticeGiven: "09-Oct-21",
    checkoutOn: "31-Oct-21",
  },
  {
    id: 2,
    bedId: "G7A",
    name: "Suresh Kumar Dogra",
    due: 4000,
    lastPaid: "09-Oct-21",
    noticeGiven: "16-Oct-21",
    checkoutOn: "31-Oct-21",
  },
  {
    id: 3,
    bedId: "308A",
    name: "Saptarshi Sarkar",
    due: 0,
    lastPaid: "09-Oct-21",
    noticeGiven: "17-Oct-21",
    checkoutOn: "02-Nov-21",
  },
  {
    id: 4,
    bedId: "307A",
    name: "Om Pandey",
    due: 0,
    lastPaid: "09-Oct-21",
    noticeGiven: "17-Oct-21",
    checkoutOn: "02-Nov-21",
  },
  {
    id: 5,
    bedId: "408B",
    name: "Gaurav Dhameeja",
    due: 0,
    lastPaid: "09-Oct-21",
    noticeGiven: "19-Oct-21",
    checkoutOn: "04-Nov-21",
  },
  {
    id: 6,
    bedId: "510B",
    name: "P. Charan Kumar",
    due: 0,
    lastPaid: "09-Oct-21",
    noticeGiven: "21-Oct-21",
    checkoutOn: "05-Nov-21",
  },
  {
    id: 7,
    bedId: "107A",
    name: "Thota Chandra Shekaram",
    due: 0,
    lastPaid: "09-Oct-21",
    noticeGiven: "28-Oct-21",
    checkoutOn: "12-Nov-21",
  },
];

export default function DataTable() {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </div>
  );
}
