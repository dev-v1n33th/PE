import React, { useEffect } from "react";

import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import Select from "@mui/material/Select";
import axios from "../../../Uri";
import BuildingsLayout from "./buildingsLayout/buildingsLayout";
import BedSummaryChart from "./buildingspieCharts/bedSummaryChart";
import SummaryTable from "./buildingsSummaryTable/SummaryTable";
import PaymentSummaryChart from "./buildingspieCharts/paymentSummaryChart";
import { Grid } from "@mui/material";
import MDButton from "components/MDButton";
import EmailBtn from "./EmailBtn/EmailBtn";
import { makeStyles } from "@mui/styles";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

function AdmBuildingDropdown(props) {
  const useStyles = makeStyles({
    root: {
      height: 35,
    },
    size: {
      width: 40,
      height: 30,
    },
  });
  const classes= useStyles();
  const [selected, setSelected] = React.useState("");
  const [building, setBuilding] = React.useState([]);
  const [buildingId, setbuildingId] = React.useState();
  

  function handleChange(event) {
    //console.log(event.target)
  }

  useEffect(() => {
    axios.get("bed/getAllBuildings").then((res) => {
      //console.log(res.data)
      setBuilding(res.data);
    });
  }, []);

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
        IconComponent={()=> (<ArrowDropDownIcon className={classes.size}/>)}
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
      <Grid item xs={6}>
      {buildingId == null ? (<div></div>):( <EmailBtn buildingId={buildingId}/>)}
      </Grid>

        </Grid>

      {buildingId == null ? (
        <div></div>
      ) : (
        <div>
          {" "}
          <Grid
            container
            direction="row"
            justifyContent="left"
            alignItems="left"
          >
            <Grid item xs={6}>
              <BedSummaryChart buildingId={buildingId} />
            </Grid>
            <Grid item xs={6}>
        <SummaryTable buildingId={buildingId} />
      </Grid>
      
          </Grid>
         
          <br></br>
          <BuildingsLayout buildingId={buildingId} />
        </div>
      )}

      {console.log(building)}
    </>
  );
}

export default AdmBuildingDropdown;
