
import * as React from 'react';

import MDButton from 'components/MDButton';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { Grid } from '@mui/material';
import { borderRadius } from '@mui/system';
import MDTypography from 'components/MDTypography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export default function FormDialog() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            {/* <Button width='60px'
                variant="outlined"
                color="primary"
                style={{ borderRadius: 10,width:'190px',bordercolor:"blue" }} onClick={handleClickOpen}>
                Record Payment
            </Button> */}
            

<Grid item xs ={12} spacing={3} backgroundColor= "#0096FF">
<MDButton
                            width='200%'
                            
                           
                            variant="gradient"
                            backgroundColor= "#0096FF"
                            color="info" size="medium"
                            justify="center"
                            style={{ borderRadius: 4, float: 'right' }}
                            onClick={handleClickOpen}
                        >
                            <MDTypography color='white'>&nbsp;&nbsp;&nbsp;&nbsp;Record Payments&nbsp;&nbsp;&nbsp;&nbsp;</MDTypography>
                        </MDButton>
                        
                        
  </Grid>
  <br/>
  <br/>
  


            <Dialog open={open} onClose={handleClose} maxWidth='lg'>
                <DialogTitle>Record payment</DialogTitle>
                <br />
                <br/>
                <DialogContent>
                    <Grid container spacing={1}>
                        <Grid item xs={6} sx={{ pl: 6 }}>
                            <TextField
                                id="outlined-textarea"
                                label="Guest Id"
                                style={{ width: '65%', marginLeft: '50px', marginBottom: '20px', }}
                            /> </Grid>
                        <Grid item xs={6}>
                            <TextField
                                id="outlined-textarea"
                                label="Payment Purpose"
                                style={{ width: '65%', marginBottom: '20px' }}
                            /></Grid>

                        <Grid item xs={6}>
                            <TextField
                                id="outlined-textarea"
                                label="Amount"
                                style={{ width: '65%', marginLeft: '50px', marginBottom: '20px' }}
                            /></Grid>
                        <Grid item xs={6}>
                            <TextField
                                id="outlined-textarea"
                                label="Payment Method"
                                style={{ width: '65%', marginBottom: '20px' }}
                            /></Grid>
                        <Grid item xs={6}>
                            <TextField
                                id="outlined-textarea"
                                label="Payment Id"
                                style={{ width: '65%', marginLeft: '50px', marginBottom: '20px' }}
                            /></Grid>
                        <Grid item xs={6}>
                            <TextField
                                id="outlined-textarea"
                                label="Transaction Id"
                                style={{ width: '65%', marginBottom: '20px' }}
                            /></Grid>
                        <Grid item xs={6}>
                            <TextField
                                id="outlined-textarea"
                                label="Transaction Date"
                                
                                style={{ width: '65%', marginLeft: '50px', marginBottom: '20px' }}
                            /></Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                <Grid container spacing={2}>

<Grid item xs={5}></Grid>

<Grid item xs={6}>

  <MDButton
onClick={handleClose}
    variant="gradient"

    color="info"

    size="small"

    style={{ borderRadius: "120px" }}

  >

    submit

  </MDButton>

</Grid>

<Grid item xs={4}></Grid>

</Grid>
                </DialogActions>
            </Dialog>
        </div>
    );
}
