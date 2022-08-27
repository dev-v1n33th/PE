import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { Grid } from "@mui/material";

// import axios from "axios";
import axios from "../../Uri";
// import { height, width } from "@mui/system";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { string } from "prop-types";

function InNotice() {
  let userData = JSON.parse(sessionStorage.getItem("userdata"));
  let userId = userData.data.userId;
  console.log(userId);

  const [data, setData] = useState([]);

  const columns = [
  
// "firstName": "  VINEELA",
// "id": "SLH000066",
// "bedId": "1-210-A-AC",
// "personalNumber": "8989898989",
// "email": "vineela@gmail.com",
// "dueAmount": 0,
// "checkInDate": "10-05-2022 19:59:54",
// "checkOutDate": "25-05-2022 00:00:00",
// "buildingName": "SREE KALA NILAYAM"

    {
      title: "Guest Name",
      field: "firstName",
      type: "text",

      headerStyle: {
        backgroundColor: "#1E90FF",
        color: "white",
      },
    //   validate: (rowData) => {
    //     if (
    //       rowData.buildingName === undefined ||
    //       rowData.buildingName === ""
    //     ) {
    //       return "Required";
    //     } else if (!rowData.buildingName.match(/[^0-9]/g)) {
    //       return " Enter Valid Name";
    //     }

    //     return true;
    //   },
    },
    {
        title: "Building Name",
        field: "buildingName",
        type: "text",
  
        headerStyle: {
          backgroundColor: "#1E90FF",
          color: "white",
        },
        // validate: (rowData) => {
        //   if (
        //     rowData.buildingName === undefined ||
        //     rowData.buildingName === ""
        //   ) {
        //     return "Required";
        //   } else if (!rowData.buildingName.match(/[^0-9]/g)) {
        //     return " Enter Valid Name";
        //   }
  
        //   return true;
        // },
      },
    {
      title: "Guest ID",
      field: "id",
      type: "text",

      headerStyle: {
        backgroundColor: "#1E90FF",
        color: "white",
      },
    //   validate: (rowData) => {
    //     if (rowData.userName === undefined || rowData.userName === "") {
    //       return "Required";
    //     } else if (!rowData.userName.match(/[^0-9]/g)) {
    //       return " Enter Valid Name";
    //     }

    //     return true;
    //   },
    },
    
    
    // {
    //   title: "Role",
    //   field: "userType",
    //   lookup: { manager: "Manager" },
    //   headerStyle: {
    //     backgroundColor: "#1E90FF",
    //     color: "white",
    //   },
    //   validate: (rowData) => {
    //     if (rowData.userType === undefined || rowData.userType === "") {
    //       return "Required";
    //     } 
        
    //     // else if (!rowData.userType.match(/[^0-9]/g)) {
    //     //   return " Enter Valid Name";
    //     // }

    //     return true;
    //   },
      
   // },

    {
      title: "Phone Number",
      field: "personalNumber",

      headerStyle: {
        backgroundColor: "#1E90FF",
        color: "white",
      },
    //   validate: (rowData) => {
    //     if (
    //       rowData.userPhoneNumber === undefined ||
    //       rowData.userPhoneNumber === ""
    //     ) {
    //       return "Required";

    //       // } else if(rowData.userPhoneNumber.match(/[^0-9]/g)){
    //       //   return" Please enter valid Phone number"
    //     } else if (
    //       rowData.userPhoneNumber.length < 10 ||
    //       rowData.userPhoneNumber.length > 10
    //     ) {
    //       return " Please enter valid mobile number";
    //     }
    //     return true;
    //   },
    },
    {
        title: "Check-In-Date",
        field: "checkInDate",
  
        headerStyle: {
          backgroundColor: "#1E90FF",
          color: "white",
        },
        // validate: (rowData) => {
        //   if (
        //     rowData.userPhoneNumber === undefined ||
        //     rowData.userPhoneNumber === ""
        //   ) {
        //     return "Required";
  
        //     // } else if(rowData.userPhoneNumber.match(/[^0-9]/g)){
        //     //   return" Please enter valid Phone number"
        //   } else if (
        //     rowData.userPhoneNumber.length < 10 ||
        //     rowData.userPhoneNumber.length > 10
        //   ) {
        //     return " Please enter valid mobile number";
        //   }
        //   return true;
        // },
      },
      {
        title: "Check Out Date",
        field: "plannedCheckOutDate",
  
        headerStyle: {
          backgroundColor: "#1E90FF",
          color: "white",
        },
        // validate: (rowData) => {
        //   if (
        //     rowData.userPhoneNumber === undefined ||
        //     rowData.userPhoneNumber === ""
        //   ) {
        //     return "Required";
  
        //     // } else if(rowData.userPhoneNumber.match(/[^0-9]/g)){
        //     //   return" Please enter valid Phone number"
        //   } else if (
        //     rowData.userPhoneNumber.length < 10 ||
        //     rowData.userPhoneNumber.length > 10
        //   ) {
        //     return " Please enter valid mobile number";
        //   }
        //   return true;
        // },
      },
    {
        title: "Bed ID",
        field: "bedId",
  
        headerStyle: {
          backgroundColor: "#1E90FF",
          color: "white",
        },
        // validate: (rowData) => {
        //   if (
        //     rowData.userPhoneNumber === undefined ||
        //     rowData.userPhoneNumber === ""
        //   ) {
        //     return "Required";
  
        //     // } else if(rowData.userPhoneNumber.match(/[^0-9]/g)){
        //     //   return" Please enter valid Phone number"
        //   } else if (
        //     rowData.userPhoneNumber.length < 10 ||
        //     rowData.userPhoneNumber.length > 10
        //   ) {
        //     return " Please enter valid mobile number";
        //   }
        //   return true;
        // },
      },
      // {
      //   title: "Due Amount",
      //   field: "dueAmount",
  
      //   headerStyle: {
      //     backgroundColor: "#1E90FF",
      //     color: "white",
      //   },
    //     validate: (rowData) => {
    //       if (
    //         rowData.userPhoneNumber === undefined ||
    //         rowData.userPhoneNumber === ""
    //       ) {
    //         return "Required";
  
    //         // } else if(rowData.userPhoneNumber.match(/[^0-9]/g)){
    //         //   return" Please enter valid Phone number"
    //       } else if (
    //         rowData.userPhoneNumber.length < 10 ||
    //         rowData.userPhoneNumber.length > 10
    //       ) {
    //         return " Please enter valid mobile number";
    //       }
    //       return true;
    //     },
    //  },
  ];

  useEffect(() => {
    axios

      .get("/guest/getGuestAboutToCheckOut/RegulatInNotice/Daily-Monthly-Active")

      .then((res) => {
        setData(res.data);

        console.log(res.data);
      })

      .catch((err) => {
        console.log(err);
        // toast.error("Server Error")
      });
  }, []);

  const obje = { createdBy: userId };

  return (
    
      <Grid container>
        {/* <h1 align="center"></h1>
      <h4 align='center'></h4> */}
        <Grid xs={12}>
          <MaterialTable
            title="Upcoming Check Out Guests List"
            data={data}
            sx={{ color: "white" }}
            columns={columns}
            // editable={{
            //   onRowAdd: (newRow) =>
            //     new Promise((resolve, reject) => {
            //       const updatedRows = [
            //         ...data,
            //         { id: Math.floor(Math.random() * 100), ...newRow },
            //       ];
            //       setTimeout(() => {
            //         const newRow1 = Object.assign(newRow, obje);

            //         const res = axios
            //           .post(
            //             "/bed/addBuilding",

            //             newRow1
            //           )
            //           .catch((err) => {
            //             toast.error("Server error");
            //           });
            //         //console.log(newRow);

            //         toast.success("New Buiding added");
            //         setData(updatedRows);

            //         resolve();
            //       }, 2000);

                  // if(setData.data!==null){
                  //   toast.success("New Buiding added")
                  // }

                  // if(setData.data==null){

                  //   toast.error("Server is down")
                  // }
                //}),
              //   onRowDelete: (selectedRow) =>
              //     new Promise((resolve, reject) => {
              //       const index = selectedRow.buildingId;
              //       const updatedRows = [...data];
              //       updatedRows.splice(index, 1);
              //       setTimeout(() => {
              //         const res = axios.delete(`/bed/deleteBuilding/${index}`);
              //         // console.log(res);
              //         // console.log(updatedRows);
              //         setData(updatedRows);
              //         resolve();
              //       }, 2000);
              //     }),
              //   onRowUpdate: (updatedRow, oldRow) =>
              //     new Promise((resolve, reject) => {
              //       const index = oldRow.buildingId;
              //       const updatedRows = [...data];
              //       updatedRows[index] = updatedRow;
              //       setTimeout(() => {
              //         const res = axios.put(
              //           `/bed/updateBuildingById/${index}`,
              //           updatedRow
              //         );

              //         //console.log(updatedRows);
              //         setData(updatedRows);
              //         resolve();
              //       }, 2000);
              //     }),
            //}}
            options={{
              exportButton: true,
              pageSize:20,
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
      </Grid>
   
  );
}

export default InNotice;
