import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { useLocation } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { BACKEND_URL } from '../../config';
import axios from "axios";
import Button from "@mui/material/Button";
import { Navigate, useNavigate } from "react-router-dom";

export const OtpScript = () => {
  const form = useRef();
  const location = useLocation();
  const navigate = useNavigate();
  const [correctotp, setCorrectotp] = useState("");
  const [open, setOpen] = React.useState(false);
  const [otp, setOtp] = React.useState("");
  console.log('location', location)

  // Setting correct otp
  var o = Math.floor(100000 + Math.random() * 900000);
  
  console.log(o);

  const handleClickOpen = () => {
    setOpen(true);
    if(otp){
      console.log(otp);
    }
    else{
      alert("Please enter otp");
    }
  };

  const handleClose = () => {
    setOpen(false);
  }

  const handleOTPChange = (event) => {
    setOtp(event.target.value)
    console.log(event.target.value)
  };

  const handleSubmit = (e) => {
    const url = BACKEND_URL + "/student/userRegister";
    console.log(otp, correctotp)
    let data = location.state.data
    if(otp === correctotp + ""){
      axios
          .post(url, data)
          .then((res) => {
            alert(res.data.message);
            navigate("/student/login");
          })
          .catch((res) => {
            alert("User already exists")
            navigate("/student/register")
          });
    }
    else{
      alert("Incorrect otp");
      navigate("/student/register")
    }
  }

  const sendEmail = (e) => {
    
    e.preventDefault();

    if(location.state.data){
      setCorrectotp(o);
      console.log(form.current)
      emailjs.sendForm('service_1b1vta1', 'template_h0rjjjp', form.current, 'Fzahey56Ues6-1qtI')
        .then((result) => {
            console.log(result.text);
            alert("Email sent successfully")
        }, (error) => {
            console.log(error.text);
        });
    }
    
  };
  
  return (
    <form ref={form} onSubmit={sendEmail}>
      <label>Name</label>
      <input type="text" name="user_name" value = {location.state.data.name}/>
      <label>Email</label>
      <input type="email" name="user_email" value = {location.state.data.email}/>
      <label style={{display: "none"}}>OTP</label>
      <input name="user_otp" value = {o} style={{display: "none"}}/>
      <input type="submit" value="Send Email"/>
      <Button onClick={() => handleClickOpen()}>Enter OTP</Button>

      <Dialog open={open} onClose={() => handleClose()}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To register, please enter OTP you recieved on your email ID
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="OTP"
            fullWidth
            variant="standard"
            onChange={handleOTPChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose()}>Cancel</Button>
          <Button onClick={() => handleSubmit()}>Submit OTP</Button>
        </DialogActions>
      </Dialog>
    </form>
  );
};