import React, { useState } from "react";

import { Formik, Form } from "formik";
import * as Yup from "yup";

import { Container, Grid, TextField, Button, Stack } from "@mui/material";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MDButton from "components/MDButton";
import MDBox from "components/MDBox";
import SampleReport from "./SampleReport";
import MaterialTable from "material-table";

import * as XLSX from "xlsx";
import axios from "axios";

import excel from "xlsx";

const EXTENSIONS = ["xlsx", "xls", "csv"];
function BulkImportForm() {
  const [colDefs, setColDefs] = useState();
  const [data, setData] = useState();

  const getExention = (file) => {
    const parts = file.name.split(".");
    const extension = parts[parts.length - 1];
    return EXTENSIONS.includes(extension); // return boolean
  };

  const convertToJson = (headers, data) => {
    const rows = [];
    data.forEach((row) => {
      let rowData = {};
      row.forEach((element, index) => {
        rowData[headers[index]] = element;
      });
      rows.push(rowData);
    });
    return rows;
  };

  const importExcel = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.onload = (event) => {
      //parse data

      const bstr = event.target.result;
      const workBook = XLSX.read(bstr, { type: "binary" });

      //get first sheet
      const workSheetName = workBook.SheetNames[0];
      const workSheet = workBook.Sheets[workSheetName];
      //convert to array
      const fileData = XLSX.utils.sheet_to_json(workSheet, { header: 1 });
      // console.log(fileData)
      const headers = fileData[0];
      const heads = headers.map((head) => ({ title: head, field: head }));
      setColDefs(heads);

      //removing header
      fileData.splice(0, 1);

      setData(convertToJson(headers, fileData));
    };

    if (file) {
      if (getExention(file)) {
        reader.readAsBinaryString(file);
      } else {
        alert("Invalid file, Please select BulkImport excel file only !");
      }
    } else {
      setData([]);
      setColDefs([]);
    }
  };

  const onSubmitButton = () => {
    axios
      .post("http://localhost:8080/upload")
      .then(function (response) {
        return response.data;
        alert("File Upload Succesfull!");
      })
      .catch(function (error) {
        //alert("ohh! Unable to upload file!");

        <Alert severity="error">This is an error alert — check it out!</Alert>
        return Promise.reject(error);
      });
  };

  return (
    <>
      <MDBox>

      <h2 align="center">
         SRI LAKSHMI HEAVEN
        </h2>


      <h4 align="center">
          Select File to Upload!
        </h4>
        <br />
        {/* <MDBox display="flex" alignItems="left" sx={{ pl: 10 }} pb={12}>
        <Grid item xs={12} justifyContent="center"> */}
        <input type="file" onChange={importExcel} />
        <MDBox display="flex">
          <Grid item xs={12}>
            <MaterialTable
              style={{ width: 1100 }}
              title="arshaa employee Data"
              data={data}
              columns={colDefs}
              options={{
                rowStyle: {
                  fontSize: 15,
                },
              }}
            />
            <br></br>

            <Grid item xs={12} spacing={3} backgroundColor="#0096FF">
              <MDButton
                width="300%"
                variant="gradient"
                backgroundColor="#0096FF"
                font-color="#f7f5f5"
                color="info"
                size="medium"
                justify="center"
                style={{ borderRadius: 12, float: "left" }}
                onClick={onSubmitButton}
              >
                SUBMIT
              </MDButton>
            </Grid>

            {/* <MDButton variant="outlined" color="info" size="small">
              Upload
            </MDButton>  */}
          </Grid>
        </MDBox>
      </MDBox>
    </>
  );
}
export default BulkImportForm;
