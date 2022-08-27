
import * as React from 'react';
// import Button from '@mui/material/Button';
import MDButton from 'components/MDButton';
import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import DialogTitle from '@mui/material/DialogTitle';
// import TextField from '@mui/material/TextField';
// import { Grid } from '@mui/material';
// import { borderRadius } from '@mui/system';
// import CustomizedSnackbars from './SubmitSnackBar';
import  { useState, useCallback, useMemo } from "react";
import ImageCapture from "react-image-data-capture";
export default function FormDialog() {
    const [open, setOpen] = React.useState(false);
    const [showImgCapture, setShowImgCapture] = useState(true);
    const config = useMemo(() => ({ video: true }), []);
    /*
      { video: true } - Default Camera View
      { video: { facingMode: environment } } - Back Camera
      { video: { facingMode: "user" } } - Front Camera
    */
    const [imgSrc, setImgSrc] = useState(null);
    const [imgFile, setImgFile] = useState(null);
    const onCapture = (imageData) => {
      // read as webP
      setImgSrc(imageData.webP);
      // read as file
      setImgFile(imageData.file);
      // Unmount component to stop the video track and release camera
      setShowImgCapture(false);
    };
    const onError = useCallback((error) => {
      console.log(error);
    }, []);
  
    // imgFile can be used as a file upload form submission
    const formData = new FormData();
    formData.append("file", imgFile);

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

<MDButton



variant="gradient"

color="info"

size="medium"

onClick={handleClickOpen}

style={{ borderRadius: "120px"}}

>

<CameraAltIcon/>

</MDButton>
            <Dialog open={open} onClose={handleClose} maxWidth='lg'>
                <DialogTitle>Capture Image</DialogTitle>
                <br />
                <DialogContent>
                    
                {showImgCapture && (
        <ImageCapture
          onCapture={onCapture}
          onError={onError}
          width={300}
          userMediaConfig={config}
        />
      )}
      {imgSrc && (
        <div>
          <div>Captured Image:</div>
          <img src={imgSrc} alt="captured-img" />
        </div>)}
                   
                </DialogContent>
      
            </Dialog>
        </div>
    );
}
