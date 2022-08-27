import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { Grid } from "@mui/material";

// import axios from "axios";
import axios from "../../Uri";
// import { height, width } from "@mui/system";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { string } from "prop-types";

function GuestReport() {
    let userData = JSON.parse(sessionStorage.getItem("userdata"));
    let userId = userData.data.userId;
    console.log(userId);

    const [data, setData] = useState([]);

    const columns = [


        {
            title: "Guest Name",
            field: "guestName",
            type: "text",

            headerStyle: {
                backgroundColor: "#1E90FF",
                color: "white",
            },

        },
        {
            title: "Guest CheckInDate",
            field: "checkInDate",


            headerStyle: {
                backgroundColor: "#1E90FF",
                color: "white",
            },

        },
        {
            title: "Adhaar Number ",
            field: "aadharNumber",


            headerStyle: {
                backgroundColor: "#1E90FF",
                color: "white",
            },

        },
        {
            title: "Building Name",
            field: "buildingName",
            type: "text",

            headerStyle: {
                backgroundColor: "#1E90FF",
                color: "white",
            },

        },
        {
            title: "Guest ID",
            field: "id",
            type: "text",

            headerStyle: {
                backgroundColor: "#1E90FF",
                color: "white",
            },

        },





        {
            title: "Phone Number",
            field: "personalNumber",

            headerStyle: {
                backgroundColor: "#1E90FF",
                color: "white",
            },

        },


        {
            title: "Check-Out-Date",
            field: "checkOutDate",

            headerStyle: {
                backgroundColor: "#1E90FF",
                color: "white",
            },

        },
        {
            title: "Bed ID",
            field: "bedId",

            headerStyle: {
                backgroundColor: "#1E90FF",
                color: "white",
            },

        },
    ];

    useEffect(() => {
        axios

            .get("/guest/getAllGuests/id")

            .then((res) => {
                setData(res.data);

                console.log(res.data);
            })

            .catch((err) => {
                console.log(err);
                // toast.error("Server Error")
            });
    }, []);

    // const obje = { createdBy: userId };

    return (

        <Grid container>

            <Grid xs={12}>
                <MaterialTable
                    title="Guest Report Data In DashBoard"
                    data={data}
                    sx={{ color: "white" }}
                    columns={columns}
                   
                    options={{
                        exportButton: true,
                        pageSize: 20,
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
export default GuestReport;
