import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import Grid from "@mui/material/Grid";
import { Form } from "react-bootstrap";
import { Box } from "@mui/material";
import { BootstrapButton } from "../profile/GuestLoginForm/components/OccupancyButton";
import axios from "../../Uri";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

export default function HolidayTable() {
  const [selectedYear, setSelectedYear] = useState();
  const [rowData, setRowData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState();
  const userData = sessionStorage.getItem("userdata");
  const userData1 = JSON.parse(userData);
  const employeeid = userData1.data.employeeId;
  const [open, setOpen] = useState([]);
  const [columns, setColumns] = useState([
    {
      title: "Building",
      field: "buildingName",
    },
    {
      title: "Income",
      field: "incomeAmount",
      type: "numeric",
    },
    {
      title: "Refund",
      field: "refundAmount",
      type: "numeric",
    },
    {
      title: "Actual Income",
      field: "actualIncome",
      type: "numeric",
    },
  ]);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };
  useEffect(() => {  
    handleClose();
  },[]);
  const getTableBodyHandler = async () => {
    handleToggle();
    const response = await axios
      .get(`/bed/getMonthlySummaryForAdmin/${selectedMonth}/${selectedYear}`)
      .catch((error) => {
        handleClose();
        toast.error(" No Records Found");
      });
    console.log(response.data);
    if (response.data.status == true || response.data.data != null) {
      handleClose();
      setRowData(response.data.data);
    } else if (response.data.status == false && response.data.data == null) {
      handleClose();
      console.log("No Records Found");
      toast.warning(" No Records Found");
    }
  };
  return (
    <Grid container spacing={2}>
      <Grid
        item
        xs={8}
        style={{ paddingLeft: 10, height: 49, marginLeft: 180 }}
      >
        <Grid container spacing={2} direction="row">
          <Grid item xs={4}>
            <Form>
              <Form.Group>
                <Form.Label>Select Year</Form.Label>
                <Form.Select
                  style={{
                    width: "48%",
                    height: "8%",
                    padding: "9px",
                    marginLeft: "10px",
                    cursor: "pointer",
                    borderRadius: 10,
                  }}
                  onChange={(e) => setSelectedYear(e.target.value)}
                >
                  <option>Select</option>
                  <option value="2026">2026</option>
                  <option value="2025">2025</option>
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                  <option value="2021">2021</option>
                  <option value="2020">2020</option>
                  <option value="2019">2019</option>
                  <option value="2018">2018</option>
                  <option value="2017">2017</option>
                </Form.Select>
              </Form.Group>
            </Form>
          </Grid>

          <Grid item xs={4}>
            <Form>
              <Form.Group>
                <Form.Label>Select Month</Form.Label>
                <Form.Select
                  style={{
                    width: "48%",
                    height: "8%",
                    padding: "9px",
                    marginLeft: "10px",
                    cursor: "pointer",
                    borderRadius: 10,
                  }}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                >
                  <option>Select</option>
                  <option value="01">January</option>
                  <option value="02">February </option>
                  <option value="03">March</option>
                  <option value="04">April</option>
                  <option value="05">May</option>
                  <option value="06">June</option>
                  <option value="07">July</option>
                  <option value="08">Augest</option>
                  <option value="09">September</option>
                  <option value="10">October</option>
                  <option value="11">November</option>
                  <option value="12">December</option>
                </Form.Select>
              </Form.Group>
            </Form>
          </Grid>
          <Grid item xs={1}></Grid>
          <Grid item xs={3}>
            <Box>
              <BootstrapButton
                variant="contained"
                disableRipple
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundColor: "#3891EE",
                  borderRadius: 12,
                  color: "white",
                }}
                onClick={getTableBodyHandler}
              >
                Submit
              </BootstrapButton>
              <ToastContainer
                position="top-right"
                min-width="2%"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
              />
            </Box>
          </Grid>
        </Grid>

        <br />
        <Grid>
          <MaterialTable
            columns={columns}
            title="Monthly Summary"
            data={rowData}
            editable={{}}
            options={{
              paging: false,
              addRowPosition: "first",
              actionsColumnIndex: -1,

              headerStyle: {
                backgroundColor: "#3891EE",
                color: "white",
              },
              exportButton: true,
            }}
          />
        </Grid>
      </Grid>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Grid>
  );
}
