import React from 'react';
import { Grid } from "@mui/material";
import axios from '../../../../Uri';
import MDButton from 'components/MDButton';


function EmailBtn(props) {
    const emailHandler = () => {
        axios.get(`/guest/paymentRemainder/${props.buildingId}`)
        .then((res)=> console.log(res.data))
        

    }
  return (
    <Grid container>
    <Grid item xs={12}>
        <MDButton  width="20%"
                  variant="contained"
                  color="info"
                  size="small"
                  justify="center"
                  style={{ borderRadius: 10 }}
                  onClick={emailHandler}>SEND DUE REMAINDERS

        </MDButton>

      </Grid>
      </Grid>
  )
}

export default EmailBtn