import React, { useEffect } from "react";

import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import Select from "@mui/material/Select";
import axios from "../../../Uri";
import BuildingsLayout from "./buildingsLayout/buildingsLayout";
import BedSummaryChart from "./buildingspieCharts/bedSummaryChart";
import PaymentSummaryChart from "./buildingspieCharts/paymentSummaryChart";
import { Grid } from "@mui/material";
import SummaryTable from "./buildingsSummaryTable/SummaryTable";
import EmailBtn from "./EmailBtn/EmailBtn";
import { makeStyles } from "@mui/styles";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

function MgrBuildingDropdown(props) {

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
  const [showPaymentRemainder , setShowPaymentRemainder] = React.useState(false)
  

  function handleChange(event) {
    //console.log(event.target.outerText);
    setSelected(event.target.outerText)
    setShowPaymentRemainder(true);
  }
  let userData = JSON.parse(sessionStorage.getItem('userdata'))
  let buildingsId = userData.data.buildingId;
    //console.log(buildingsId)

  useEffect(() => {
    
    axios.get(`bed/getBuildingsById/${buildingsId}`).then((res) => {
      //console.log(res.data);
      setBuilding(res.data);

    });
  }, []);
  //console.log(building);

  return (
    <>
    <Grid container>
      <Grid item xs={6}>
      
      <label value="Select Building: ">Select Building: </label>
      <Select
        sx={{ minHeight: 44 }}
        style={{ width: "30%", height: "10%" }}
        defaultValue={building.buildingName}
        name="building"
        IconComponent={()=> (<ArrowDropDownIcon className={classes.size}/>)}
      >
        
            <MenuItem
              value={building.buildingName}
              onClick={handleChange}
            >
              {" "}
              {building.buildingName}{" "}
            </MenuItem>
         
      </Select>
      </Grid>
      <Grid item xs={6}>
      {showPaymentRemainder  ? ( <EmailBtn buildingId={buildingsId}/>)  :(<></>)   }
      </Grid>
      </Grid>
      {building.buildingName === selected ? (
        <Grid>
        <Grid container direction="row" justifyContent="left" alignItems="left">
        <Grid item xs={6}>
          <BedSummaryChart buildingId={buildingsId} />
        </Grid>
        <Grid item xs={6}>
        <SummaryTable buildingId={buildingsId} />
        </Grid>
      </Grid>
      {/* <EmailBtn buildingId={buildingsId} /> */}
      <br></br>
        <BuildingsLayout buildingId={buildingsId} /> 
        </Grid>

      ):(
        console.log("hi")
      ) }

         
      

      {console.log(building)}
    </>
  );
}

export default MgrBuildingDropdown;
