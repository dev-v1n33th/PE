import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

export default function SecurityDepo(props) {
  const [securityDeposit, setSecurityDeposit] = useState();
  props.func(securityDeposit);

  const handleChange = (event) => {
    setSecurityDeposit(event.target.value);
  };
  console.log(securityDeposit);
  return (
    <Grid container spacing={1} style={{ paddingLeft: 10,height:49 }}>
      <Stack spacing={2} direction="row">
        <Grid item xs={6}>
          <h4>Security Deposit</h4>
        </Grid>
        <Grid item xs={6}>
          <FormControl sx={{ m: 1, minWidth: 190 }}>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={securityDeposit}
              label="Security Depsit"
              onChange={handleChange}
            >
              <MenuItem value={3000}>3000</MenuItem>
              <MenuItem value={5000}>5000</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Stack>
    </Grid>
  );
}