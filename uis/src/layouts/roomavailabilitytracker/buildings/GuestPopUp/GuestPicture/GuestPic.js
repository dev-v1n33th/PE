import React from 'react'
import { Image, Row, Col, Container } from 'react-bootstrap';
import { useEffect } from 'react';
import axios from '../../../../../Uri'
import { Grid, Avatar } from '@mui/material';
import { pic } from './GuestPic.css';
import Button from '@mui/material/Button';
import MDButton from 'components/MDButton';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function GuestPic(props) {
  // console.log(props.guestdetails)
  // console.log(props.GuestPic)
  const [guestPicUrl, setGuestPicUrl] = React.useState({});
  const [File, setFile] = React.useState(null);
  // console.log(props.guestdetails.id);


  const UploadPhoto = (event) => {
    // console.log(event.target.files[0])
    setFile(event.target.files[0]);

    if (event.target.files[0].size >= 1000000) {
      toast.warning("Please select file with less than 1 MB");
    }
    // console.log(File);


  }
  // console.log(File);
  if (File !== null) {
    const formData = new FormData();
    // console.log(file);
    formData.append("file", File);
    formData.append("fileName", File.name);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    // console.log(formData);
    // console.log(config);

    axios
      .post(`guest/upload/${props.guestdetails.id}/`, formData, config)
      .then((response) => {
        // console.log(response.data);
        toast.success(
          "guest picture uploaded successfully"
        );
      })
      .catch((error) => {
        console.log(error);
        // toast.warning("File s")
        console.log("Not uploaded");
      });
  }


  useEffect(async () => {
    await axios

      .get(`/guest/files/${props.guestdetails.id}`)
      .then((res) => {
        setGuestPicUrl(res.data)
        // console.log(res.data)
      })
      .catch((err) => {
        console.log(err)

      });
  }, [props.guestdetails.id]);

  return (

    <Grid container>
      <Grid item xs={12}>
        <Image className='pic' alt={`${props.guestdetails.firstName} ${props.guestdetails.lastName}`} src={`data:image/jpeg;base64,${guestPicUrl.data}`} height={230} width={200} />
      </Grid>
      {props.guestdetails.guestStatus == 'VACATED' ? (<></>) : (<MDButton
        width="20%"
        variant="contained"
        color="info"
        size="medium"
        justify="center"
        style={{ borderRadius: 10 }}

        component="label"
      >
        change photo
        <input hidden accept="image/*" multiple type="file" onChange={UploadPhoto} />
      </MDButton>)}

      <ToastContainer
        position="top-right"
        min-width="2%"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Grid>


  )
}

export default GuestPic