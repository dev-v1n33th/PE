import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { Grid } from "@mui/material";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
// import axios from "axios";
import axios from "../../Uri";
// import Select from "@mui/material/Select";

import { makeStyles } from "@mui/styles";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";


import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ConfigRents() {
  const [data, setData] = useState([]);
  const [selected, setSelected] = React.useState("");
  const [building, setBuilding] = React.useState([]);
  const [buildingId, setbuildingId] = React.useState(null);

  useEffect(() => {
    axios
      .get("bed/getAllBuildings")
      .then((res) => {
        console.log(res.data);
        setBuilding(res.data);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong🤦‍♂️")
      });
  }, []);
  useEffect(() => {
    axios
      .get(`/guest/getRatesByBuildingId/${buildingId}`)
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
        
      });
  }, [buildingId]);
 


  const useStyles = makeStyles({
    root: {
      height: 35,
    },
    size: {
      width: 40,
      height: 30,
    },
  });
  const classes = useStyles();



  


  const columns = [
    {
      title: "Occupancy Type",
      field: "occupancyType",
      editable: false,
      headerStyle: {
        backgroundColor: "#1E90FF",
        color: "white",
      },
    },
    {
      title: "Sharing",
      field: "sharing",
      editable: false,
      headerStyle: {
        backgroundColor: "#1E90FF",
        color: "white",
      },
    },
    {
      title: "Room Type",
      field: "roomType",
      headerStyle: {
        backgroundColor: "#1E90FF",
        color: "white",
      },
    },
    {
      title: "Price",
      field: "price",
      headerStyle: {
        backgroundColor: "#1E90FF",
        color: "white",
      },
    },
  ];

  return (
    <>
      <Grid container>
        <Grid item xs={6}>
          <label value="Select Building: ">Select Building: </label>

          <Select
            sx={{ minHeight: 44 }}
            style={{ width: "30%", height: "10%" }}
            value={selected}
            name="building"
            IconComponent={() => (<ArrowDropDownIcon className={classes.size} />)}
          >
            {building.map((post) => {
              return (
                <MenuItem
                  value={post.buildingName}
                  onClick={async () => {
                    setSelected(post.buildingName);
                    //console.log(post.buildingId)
                    setbuildingId(post.buildingId);
                  }}
                >
                  {" "}
                  {post.buildingName}{" "}
                </MenuItem>
              );
            })}
          </Select>

        </Grid>
        <Grid xs={12}>
          <MaterialTable
            title="Configure Rents"
            data={data}
            sx={{ color: "white" }}
            columns={columns}
            editable={{
              // onRowAdd: (newRow) =>
              //   new Promise((resolve, reject) => {
              //     const updatedRows = [
              //       ...data,
              //       { id: Math.floor(Math.random() * 100), ...newRow },
              //     ];

              //     setTimeout(() => {
              //       const res = axios
              //         .post(
              //           "/guest/addSecurityDeposit",

              //           newRow
              //         )
              //         .then(() => {
              //           toast.success("Data Added Successfully👍");
              //         })
              //         .catch((err) => {
              //           toast.error("Server error😢");
              //         });
              //       console.log(newRow);

              //       setData(updatedRows);
              //       resolve();
              //     }, 2000);
              //   }),
              onRowUpdate: (updatedRow, oldRow) =>
                new Promise((resolve, reject) => {
                  console.log(oldRow);
                  console.log(updatedRow);
                  const index = oldRow.id;
                  console.log(index);
                  const updatedRows = [...data];
                  console.log(updatedRows);
                  updatedRows[oldRow.tableData.id] = updatedRow;
                  console.log(updatedRow);
                  // console.log(updatedRows);

                  setTimeout(() => {
                    const res = axios
                      .put(`/guest/updateRoomRent/${index}`, updatedRow)
                      .then((resp) => {
                        console.log(resp);
                        setData(updatedRows);
                        toast.success(" Updated Successfully👍");
                      })

                      .catch((err) => {
                        toast.error("Server error");
                      });

                    // setData(updatedRows);
                    // toast.success(" Updated Successfully👍");
                    console.log(updatedRows);
                    resolve();
                  });
                }),
            }}
            options={{
              exportButton: true,
              actionsColumnIndex: -1,
              grouping: true,
              addRowPosition: "first",
              headerStyle: {
                backgroundColor: "#1E90FF",
                color: "white",
                fontSize: "20px",
                //height: "10px",
                //fontWeight: 'bold'
              },
              rowStyle: {
                fontSize: 19,
              },
            }}
          />
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
        </Grid>
      </Grid>
    </>
  );
}

export default ConfigRents;
