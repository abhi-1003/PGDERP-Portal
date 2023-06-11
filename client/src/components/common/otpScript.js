import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { useLocation } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { BACKEND_URL } from "../../config";
import axios from "axios";
import Button from "@mui/material/Button";
import { Navigate, useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

export const OtpScript = () => {
  const form = useRef();
  const location = useLocation();
  const navigate = useNavigate();
  const [correctotp, setCorrectotp] = useState("");
  const [open, setOpen] = React.useState(false);
  const [otp, setOtp] = React.useState("");

  // Setting correct otp
  var o = Math.floor(100000 + Math.random() * 900000);

  const handleClickOpen = () => {
    setOpen(true);
    if (otp) {
    } else {
      alert("Please enter otp");
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOTPChange = event => {
    setOtp(event.target.value);
  };

  const handleSubmit = e => {
    const url = BACKEND_URL + "/student/userRegister";
    let data = location.state.data;
    if (otp === correctotp + "") {
      axios
        .post(url, data)
        .then(res => {
          alert(res.data.message);
          navigate("/student/login");
        })
        .catch(res => {
          alert("User already exists");
          navigate("/student/register");
        });
    } else {
      alert("Incorrect otp");
      navigate("/student/register");
    }
  };

  const sendEmail = e => {
    e.preventDefault();

    if (location.state.data) {
      setCorrectotp(o);
      emailjs
        .sendForm(
          "service_1b1vta1",
          "template_h0rjjjp",
          form.current,
          "Fzahey56Ues6-1qtI"
        )
        .then(
          result => {
            alert("Email sent successfully");
          },
          error => {
            alert(error.text);
          }
        );
    }
  };

  return (
    <div
      style={{
        background: "linear-gradient(to bottom, #42a7f5, #dae9eb)",
        position: "absolute",
        top: "0px",
        right: "0px",
        bottom: "0px",
        left: "0px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Container
        component="main"
        maxWidth="xs"
        style={{
          backgroundColor: "rgba(215, 198, 165, 0.4)",
          borderRadius: "32px"
        }}
      >
        <Typography component="h6" variant="h6">
              Please Verify your details after OTP Verification these details cannot be modified
        </Typography>
        <form
          ref={form}
          onSubmit={sendEmail}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <div
            style={{
              margin: "8px",
              fontSize: "24px",
              display: "flex",
              flexDirection: "column",
              width: "100%",
              justifyContent: "space-evenly",
              alignItems: "start",
              backgroundColor: "rgba(255, 255, 200, 0.5)",
              padding: "10px",
              borderRadius: "16px"
            }}
          >
            <label>Name</label>
            <input
              type="text"
              name="user_name"
              style={{
                fontSize: "24px",
                borderRadius: "8px",
                border: "0px",
                padding: "4px"
              }}
              value={location.state.data.name}
            />
          </div>
          <div
            style={{
              margin: "8px",
              fontSize: "24px",
              display: "flex",
              flexDirection: "column",
              width: "100%",
              justifyContent: "space-evenly",
              alignItems: "start",
              backgroundColor: "rgba(255, 255, 200, 0.5)",
              padding: "10px",
              borderRadius: "16px",
            }}
          >
            <label>Email</label>
            <input
              type="email"
              name="user_email"
              value={location.state.data.email}
              style={{
                fontSize: "24px",
                borderRadius: "8px",
                border: "0px",
                padding: "4px"
              }}
            />
          </div>

          <div
            style={{
              margin: "8px",
              fontSize: "24px",
              display: "flex",
              flexDirection: "column",
              width: "100%",
              justifyContent: "space-evenly",
              alignItems: "start",
              backgroundColor: "rgba(255, 255, 200, 0.5)",
              padding: "10px",
              borderRadius: "16px"
            }}
          >
            <label>Mobile</label>
            <input
              type="text"
              name="user_mobile"
              value={location.state.data.mobile}
              style={{
                fontSize: "24px",
                borderRadius: "8px",
                border: "0px",
                padding: "4px"
              }}
            />
          </div>

          <div
            style={{
              margin: "8px",
              fontSize: "24px",
              display: "flex",
              flexDirection: "column",
              width: "100%",
              justifyContent: "space-evenly",
              alignItems: "start",
              backgroundColor: "rgba(255, 255, 200, 0.5)",
              padding: "10px",
              borderRadius: "16px"
            }}
          >
            <label>Course</label>
            <input
              type="text"
              name="user_course"
              value={location.state.data.course}
              style={{
                fontSize: "24px",
                borderRadius: "8px",
                border: "0px",
                padding: "4px"
              }}
            />
          </div>

          <label style={{ display: "none" }}>OTP</label>
          <input name="user_otp" value={o} style={{ display: "none" }} />
          <input
            style={{
              fontSize: "24px",
              backgroundColor: "#feca0a",
              color: "#012d5e",
              borderRadius: "4px",
              borderRadius: "12px",
              cursor: "pointer",
              fontWeight: "bold",
              padding: "10px 15px",
              textAlign: "center",
              transition: "200ms",
              width: "100%",
              boxSizing: "border-box",
              border: "0",
              fontSize: "16px",
              userSelect: "none",
              lineHeight: "28px"
            }}
            type="submit"
            value="Send Email"
          />
          <Button
            style={{
              fontSize: "24px",
              backgroundColor: "#feca0a",
              color: "#012d5e",
              borderRadius: "4px",
              borderRadius: "12px",
              cursor: "pointer",
              fontWeight: "bold",
              padding: "10px 15px",
              textAlign: "center",
              transition: "200ms",
              width: "100%",
              boxSizing: "border-box",
              border: "0",
              fontSize: "16px",
              userSelect: "none",
              touchAction: "manipulation",
              margin: "10px"
            }}
            onClick={() => handleClickOpen()}
          >
            Enter OTP
          </Button>

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
      </Container>
    </div>
  );
};
