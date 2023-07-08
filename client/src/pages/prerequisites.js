import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Navigate, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Grid, Paper } from "@material-ui/core";
import { renderText } from "../components/common/displayComponents";
import Button from "@mui/material/Button";
import CallIcon from '@mui/icons-material/Call';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import HomeIcon from "@mui/icons-material/Home";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import EditIcon from "@mui/icons-material/Edit";
import DownloadIcon from "@mui/icons-material/Download";
import LogoutIcon from "@mui/icons-material/Logout";

const drawerWidth = 280;
function Prerequisites() {
  const location = useLocation();
  const navigate = useNavigate();
  const { window } = location.state;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const download = x => {
    let a = document.createElement("a");
    a.download = x.split("/files/")[1];
    a.href = x;
    a.click();
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div style={{ backgroundColor: "#FFFFE0", minHeight: "100vh" }}>
      <Toolbar />
      <List>
        {location.state.options &&
          Object.keys(location.state.options).map((text, index) => (
            <ListItem key={text}>
              <ListItemButton
                onClick={() =>
                  navigate(location.state.options[text], {
                    state: {
                      student_data: location.state.student_data,
                      options: location.state.options
                    }
                  })
                }
              >
                <ListItemIcon>
                  {index === 0 && <HomeIcon />}
                  {index === 1 && <AppRegistrationIcon />}
                  {index === 2 && <EditIcon />}
                  {index === 3 && <DownloadIcon />}
                  {index === 4 && <LogoutIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;
  // console.log(personalData)

  return (
    <Box bgcolor="#E5EDF1" sx={{ display: "flex", minHeight: "100vh" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: "#00ABE4"
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" style={{padding: "5px"}}>
            COEP Technological University
            <br />
            PG - Diploma Admission Portal
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth
            }
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          bg
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth
            }
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` }
        }}
      >
        <Toolbar />
        <Paper component={Box} p={2}>
          <Grid container spacing={2} style={{ justifyContent: "center" }}>
            <Box mt={1} mb={2}>
              {renderText({ label: "Prerequisites", variant: "h4" })}
            </Box>
          </Grid>

          <Button
            variant="contained"
            onClick={() => {
              download("/files/Self-Declaration.pdf");
            }}
            color="success"
            style={{ margin: "0 auto", display: "flex", marginTop: "3%" }}
          >
            DOWNLOAD SELF DECLARATION
          </Button>

          <Button
            variant="contained"
            onClick={() => {
              download(
                "/files/declaration.pdf"
              );
            }}
            color="success"
            style={{ margin: "0 auto", display: "flex", marginTop: "3%" }}
          >
            DOWNLOAD EDUCATIONAL MARKS DETAILS DECLARATION
          </Button>
          <Paper component={Box} p={2} m={2}>
          <Box mt={1} mb={2}>
                {renderText({
                  label: "Prerequisites for Online Application Submission",
                  variant: "h5"
                })}
              </Box>
            <Grid container spacing={2} style={{ justifyContent: "center" }}>
             
              
              <Box mt={1} mb={2}>
                {renderText({
                  label:
                    "Please be ready with these documents for filling up the application form for PGDERP 2023-24",
                  color: "black",
                  variant: "h7"
                })}
              </Box>
              <Box mt={1} mb={2}>
                {renderText({
                  label:
                    "Before proceeding to fill up the Online Application Form, please ensure that you have the following Scanned Images (Maximum upload size of each document is 512 Kb, Accepted File Types for documents : .pdf & Images : .img):",
                  color: "black",
                  variant: "h7",
                  align: "justify"
                })}
              </Box>
              <Box mt={1} mb={2}>
                <List>
                  <ListItem>1. Aadhar Card/Passport of the Applicant</ListItem>
                  <ListItem>2. SSC Mark Sheet</ListItem>
                  <ListItem>
                    3. One single PDF file containing HSC and / or Diploma (All
                    Semester Grade Sheets, Passing Certificate, Diploma
                    Certificate)
                  </ListItem>
                  <ListItem>
                    4. One single PDF file containing Graduation Details (All
                    Semester Grade Sheets, Passing Certificate, Degree
                    Certificate)
                  </ListItem>
                  <ListItem>
                    5. One single PDF file containing Post-Graduation Details
                    (If any) (All Semester Grade Sheets, Passing Certificate,
                    Post-Graduation Degree Certificate)
                  </ListItem>
                  <ListItem>
                    6. One single PDF file containing other courses certificates
                    (If any)
                  </ListItem>
                  <ListItem>
                    <ListItemText>
                      7. One single PDF File containing Work Experience Details
                      (If any) related documents (Start from the latest
                      experience)
                      <Box>
                        <List>
                          <ListItem>Offer Letter</ListItem>
                          <ListItem>Relieving Letter (If available)</ListItem>
                          <ListItem>Salary Slip (Latest month)</ListItem>
                          <ListItem>Experience Letter (If available)</ListItem>
                        </List>
                      </Box>
                    </ListItemText>
                  </ListItem>
                  <ListItem>
                    8. One single PDF file containing Self-Declaration Document
                    and Educational Marks Details Declaration by College
                  </ListItem>
                  <ListItem>
                    9. Application Fee Receipt which will be generated after
                    Online Payment of Application Fees. DU Number printed on
                    Application Fee Receipt has to entered while filling the
                    Online Application Form
                  </ListItem>
                  <ListItem>
                    10. Soft Copy of I-Card Size Photo of the Applicant
                  </ListItem>
                </List>
              </Box>
            </Grid>
          </Paper>
        </Paper>
        <Box sx={{height:"70px"}} />
      </Box>
      <AppBar position="fixed"  sx={{ top: 'auto', bottom: 0, backgroundColor:"#00ABE4", height:"7%" }}>
        <Toolbar>
        <Box sx={{ flexGrow: 0.4 }} />
        <IconButton color="inherit">
            <ArrowForwardIosIcon/>
          </IconButton>
          <Typography color="inherit">
            <a href="http://www.coep.org.in/" target="_blank" rel="noopener noreferrer">
          http://www.coep.org.in/
          </a>
          </Typography>
          <Box sx={{ flexGrow: 0.3 }} />
          <IconButton color="inherit">
            <MailIcon />
          </IconButton>
          <Typography color="inherit">
          pgdadmission@coeptech.ac.in
          </Typography>
        </Toolbar>
        
      </AppBar>
    </Box>
  );
}

export default Prerequisites;
