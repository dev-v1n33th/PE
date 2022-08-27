import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
// import axios from "axios";
import { Grid, InputLabel } from "@mui/material";
import axios from "../../../Uri";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "../../profile/GuestLoginForm/components/Select";
import { Formik, Form } from "formik";

// var buildingId = null
// var Floor = []

const INITIAL_FORM_STATE = {
  selectBuilding: "",
  selectFloor: "",
};

function Room() {
  let userData = JSON.parse(sessionStorage.getItem("userdata"));
  let userId = userData.data.userId;
  console.log(userId);
  const [data, setData] = useState([]);
  const [building, setBuilding] = useState([]);
  const [floor, setFloor] = useState([]);
  const [buildName, setBuildName] = useState([]);
  const [floorName, setFloorName] = useState([]);
  const [buildingId, setBuildingId] = useState(null);
  const [floorId, setFloorId] = useState(null);
  let buildingNames = [];
  useEffect(() => {
    axios
      .get("/bed/getBuildingIdAndName")
      .then((res) => {
        setBuilding(res.data);
        res.data.map((post) => {
          buildingNames.push(post.buildingName);
        });
      })
      .catch((err) => {});
  }, []);
  var obj = building.reduce(function (acc, cur, i) {
    acc[cur.buildingId] = cur.buildingName;

    return acc;
  }, {});
  console.log(obj);

  // useEffect(() => {
  //   axios

  //     .get(`bed/getFloorIdAndNameByBuildingId/${obj}`)

  //     .then((res) => {
  //       setFloor(res.data);

  //       console.log(res.data);
  //     })

  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, [obj]);
  var obj1 = null;

  const columns = [
    // {
    //   title: "Building Name",
    //   field: "buildingId",
    //   lookup: obj,
    //   onClick: rowData => {
    //     alert(rowData.buildingId)
    //   },
    //   // data.map(ro=>console.log(ro.beds)),
    //   headerStyle: {
    //     backgroundColor: "#1E90FF",
    //     color: "white",
    //   },
    //   validate: rowData => {
    //     if (rowData.buildingId === undefined) {
    //       return "Building Name is Required"

    //     }
    //     return true
    //   }
    // },
    // {
    //   title: "Floor Number",
    //   field: "floorNumber",
    //   // lookup:obj1,
    //   // type:getGridNumericOperators,
    //   headerStyle: {
    //     backgroundColor: "#1E90FF",
    //     color: "white",

    //   },
    //   validate: rowData => {
    //     if (rowData.floorNumber === undefined) {
    //       return "Floor Number is Required"

    //     }
    //     return true
    //   }
    // },
    // {
    //   title: "Room Id",
    //   editable:false,
    //   field: "roomId",
    //   headerStyle: {
    //     backgroundColor: "#1E90FF",
    //     color: "white",
    //   },

    // },
    {
      title: "Room Number",
      field: "roomNumber",
      headerStyle: {
        backgroundColor: "#1E90FF",
        color: "white",
      },
      validate: (rowData) => {
        if (rowData.roomNumber === undefined) {
          return "Room Number is Required";
        } 
        // else if (rowData.roomNumber.match(/[^0-9]/g)) {
        //   return " Please enter valid numbers";
        // }
         else if (
          rowData.roomNumber.length < 3 
        ) {
          return " Please enter room numbers";
        }
        return true;
      },
    },
  ];

  useEffect(() => {
    axios

      .get(`/bed/getRoomIdAndNameByFloorId/${floorId}`)

      .then((res) => {
        setData(res.data);
      })

      .catch((err) => {
        console.log(err);
      });
  }, [floorId]);

  const selectBuild = (i) => {
    console.log(i.target.dataset.value);
  };
  const selectFloor = (e) => {
    setFloorName(e.target.outerText);
    console.log(e.target.dataset.value);
  };

  useEffect(() => {
    axios
      .get(`bed/getFloorIdAndNameByBuildingId/${buildingId}`)

      .then((res) => {
        setFloor(res.data);

        console.log(res.data);
      })

      .catch((err) => {
        console.log(err);
      });
  }, [buildingId]);
  obj1 = floor.reduce(function (acc, cur, i) {
    acc[cur.floorId] = cur.floorNumber;

    return acc;
  }, {});
  console.log(obj1);

  const obje1 = { floorId: floorId ,
                  buildingId:buildingId
                  };
  const obje = { createdBy: userId };

  return (
    <div>
      <Grid container rowSpacing={8}>
        <Grid item xs={12}>
          <Formik initialValues={{ ...INITIAL_FORM_STATE }}>
            {(formProps) => (
              <Form>
                <Grid container>
                  <Grid item xs={4} height={30}>
                    <h5>Select Building</h5>
                    <Select
                      name="selectBuilding"
                      options={obj}
                      onClick={(i) => {
                        setBuildingId(i.target.dataset.value);
                        console.log(buildingId);
                      }}
                    />
                  </Grid>
                  &nbsp;&nbsp;&nbsp;

                  {obj1 === null ? (
                    console.log("obj1 is null")
                  ) : (
                    <Grid item xs={4}>
                      <h5>Select Floor</h5>
                      <Select
                        name="selectFloor"
                        options={obj1}
                        onClick={(i) => {
                          setFloorId(i.target.dataset.value);
                          console.log(floorId);
                        }}
                      />
                    </Grid>
                  )}
                </Grid>
              </Form>
            )}
          </Formik>
        </Grid>
        <br/><br/>
        <Grid xs={30}>
          <Grid item xs={12}>
            <MaterialTable
              title="Manage Rooms"
              data={data}
              sx={{ color: "white" }}
              rowsPerPageOptions={20}
              columns={columns}
              editable={{
                onRowAdd: (newRow) =>
                  new Promise((resolve, reject) => {
                    const updatedRows = [
                      ...data,
                      { id: Math.floor(Math.random() * 100), ...newRow },
                    ];

                    if (buildingId && floorId) {
                      setTimeout(() => {
                        const newRow1 = Object.assign(newRow, obje);
                        const newRow2 = Object.assign(newRow1, obje1);
                        const res = axios
                          .post(
                            "/bed/addRoom",

                            newRow2
                          )
                          .catch((err) => {
                            toast.error("Server error😥");
                          });
                        console.log(newRow2);

                        toast.success("New Room added👍");
                        //console.log(newRow1);

                        setData(updatedRows);
                        resolve();
                      }, 2000);
                    } else {
                      toast.error(
                        "Please select Building and Floor to Proceed.😁"
                      );
                    }
                  }),

                  onRowDelete: (selectedRow) =>
                  new Promise((resolve, reject) => {
                    const index = selectedRow.roomId;
                    const updatedRows = [...data];
                    updatedRows.splice(index, 1);
                    setTimeout(() => {
                      const res = axios.delete(`/bed//deleteRoom/${index}`)
                                       .then((res) =>{
                                       console.log(res)
                                       if(res.data ==="Action Failed:This Room Contains Beds")
                                       {toast.error("Room can't be deleted as it contains Beds🤷‍♂️")}
                                      else{
                                        toast.success("Room deleted successfully")
                                      }});
                      
                      // console.log(updatedRows);
                      setData(updatedRows);
                      resolve();
                    }, 2000);
                  }),
                // onRowUpdate: (updatedRow, oldRow) =>
                //   new Promise((resolve, reject) => {
                //     const index = oldRow.buildingId;
                //     const updatedRows = [...data];
                //     updatedRows[index] = updatedRow;
                //     setTimeout(() => {
                //       const res = axios.put(
                //         `/bed/updateBuildingById/${index}`,
                //         updatedRow
                //       );

                //       //console.log(updatedRows);
                //       setData(updatedRows);
                //       resolve();
                //     }, 2000);
                //   }),
              }}
              // actions={[{onClick:(rowData) => {
              //   console.log(lookup[rowData.buildingId])
              // }}]}
              options={{
                exportButton: true,
                grouping: true,

                actionsColumnIndex: -1,
                addRowPosition: "first",
                headerStyle: {
                  backgroundColor: "#1E90FF",
                  color: "white",
                  fontSize: "15px",
                  height: "10px",
                  fontWeight: "bold",
                },
                rowStyle: {
                  fontSize: 16,
                },
              }}
            />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
export default Room;
