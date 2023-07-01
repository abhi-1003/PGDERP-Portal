import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { useLocation } from "react-router-dom";
import { Navigate, useNavigate } from "react-router-dom";
import { BACKEND_URL } from '../config';
import axios from 'axios';

import HomeIcon from '@mui/icons-material/Home';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import EditIcon from '@mui/icons-material/Edit';
import DownloadIcon from '@mui/icons-material/Download';
import LogoutIcon from '@mui/icons-material/Logout';

import CallIcon from '@mui/icons-material/Call';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const drawerWidth = 280;

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#01257D",
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: "#FFFFFF",
    },
    '&:nth-of-type(even)': {
        backgroundColor: "#D3D3D3",
      },
    // hide last border
    // '&:last-child td, &:last-child th': {
    //   border: 0,
    // },
  }));

  function createData(Details, Verification_Status, Completion_Status, Edit, Link) {
    return { Details, Verification_Status, Completion_Status, Edit, Link};
  }
  
  

function ResponsiveStudentHome() {

  const location = useLocation();
  const navigate = useNavigate();
  const [personal_data, setPersonalData] = React.useState(location.state.student_data)
  const [reload, setReload] = React.useState(false);
  const { window } = location.state;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const rows = [
    createData('Personal Information', personal_data["personalInfoVerified"] ? "Verified" : (personal_data["modifications"].length>0 ? "Modification Required": "Not Verified"), personal_data["personalInfoFilled"] ? "Completed" : "Pending", personal_data["personalInfoEditable"] ? "Edit" : "Not Editable", "/student/personalInfo"),
    createData('Academics Information', personal_data["academicsInfoVerified"] ? "Verified" : (personal_data["modifications"].length>0 ? "Modification Required": "Not Verified"), personal_data["academicsInfoFilled"] ? "Completed" : "Pending", personal_data["academicsInfoEditable"] ? "Edit" : "Not Editable", "/student/academicsInfo"),
    createData('Professional Details', personal_data["professionalExperienceVerified"] ? "Verified" : (personal_data["modifications"].length>0 ? "Modification Required": "Not Verified"), personal_data["professionalExperienceFilled"] ? "Completed" : "Pending", personal_data["professionalExperienceEditable"] ? "Edit" : "Not Editable", "/student/professionalExperience"),
    createData('Application Fee Details', personal_data["feesDetailsVerified"] ? "Verified" : (personal_data["modifications"].length>0 ? "Modification Required": "Not Verified"), personal_data["feesDetailsFilled"] ? "Completed" : "Pending", personal_data["feesDetailsEditable"] ? "Edit" : "Not Editable", "/student/fees"),
    createData('Documents Uploaded', personal_data["documentsVerified"] ? "Verified" : (personal_data["modifications"].length>0 ? "Modification Required": "Not Verified"), personal_data["documentsFilled"] ? "Completed" : "Pending", personal_data["documentsEditable"] ? "Edit" : "Not Editable", "/student/documents"),
  ];

  React.useEffect(() => {
    // console.log(location.state.student_data._id)
    if (location.state) {
      if (location.state.student_data._id) {
        let body = { id: location.state.student_data._id };
        let url = BACKEND_URL + "/student/me";
        axios
          .post(url, body, {
            headers: {
              "pgderp-website-jwt": localStorage.getItem("pgderp-website-jwt"),
            },
          })
          .then((res) => {
            setPersonalData(res.data.user)
          });
      }
    }
  }, [reload]);

  const handleSubmit = () => {
    setReload(true)
    const url = BACKEND_URL + "/student/fullComplete";
    const body = {
      id : personal_data._id
    }
    axios
    .post(url, body, {
      headers:{
        "pgderp-website-jwt": localStorage.getItem("pgderp-website-jwt"),
      }
    })
    .then((res) => {
      alert(res.data.message)
      navigate("/student/home", {
        state: {
          student_data : personal_data,
          options: location.state.options
        }
      })
    })
  }

  const drawer = (
    <div style={{backgroundColor:"#FFFFE0", minHeight:"100vh"}}>
      <Toolbar/>
      <List>
      {location.state.options && Object.keys(location.state.options).map((text, index) => (
          <ListItem key={text}>
            <ListItemButton onClick={() => navigate(location.state.options[text], {
              state: {
                student_data : personal_data,
                options: location.state.options
              }
            })}>
              <ListItemIcon>
                {index === 0 && (
                  <HomeIcon />
                )}
                {
                  index === 1 && (
                    <AppRegistrationIcon />
                  )
                }
                {
                  index === 2 && (
                    <EditIcon />
                  )
                }
                {
                  index === 3 && (
                    <DownloadIcon />
                  )
                }
                {
                  index === 4 && (
                    <LogoutIcon />
                  )
                }
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;
  
  return (
    <Box bgcolor = "#E5EDF1" sx={{ display: 'flex', minHeight:"100vh" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor:"#00ABE4"
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div">
            COEP PG - Diploma Admission Portal
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
        bg
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        
        sx={{flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <Box display="flex" justifyContent="center" alignItems="center">
        <Typography variant="h5" sx = {{paddingTop: "1%", paddingBottom: "1%", margin: "auto"}}>Student Information </Typography>
        </Box>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6} sx = {{padding:"1% 1%"}}>
          <Typography variant="h6">Name: {personal_data.name}</Typography>
        </Grid>
        <Grid item xs={6} sx = {{padding:"1% 1%"}}>
          <Typography variant="h6">Email-ID: {personal_data.email}</Typography>
        </Grid>
        <Grid item xs={6} sx = {{padding:"1% 1%"}}>
          <Typography variant="h6">Course: {personal_data.course}</Typography>
        </Grid>
        <Grid item xs={6} sx = {{padding:"1% 1%"}}>
          <Typography variant="h6">Mobile-No: {personal_data.mobile}</Typography>
        </Grid>

        {/* TABLE */}

        <TableContainer sx ={{paddingLeft: "2%", paddingTop: "0.1%"}}>
        <Table  aria-label="customized table" sx ={{paddingLeft: "2%"}}>
        <TableHead>
          <TableRow>
            <StyledTableCell wrap>DETAILS</StyledTableCell>
            <StyledTableCell align="center" wrap>VERIFICATION STATUS</StyledTableCell>
            <StyledTableCell align="center" wrap>COMPLETION STATUS</StyledTableCell>
            <StyledTableCell align="center" wrap>EDITABLE</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.Details}>
              <StyledTableCell component="th" scope="row">
                {row.Details}
              </StyledTableCell>
              <StyledTableCell align="center">{row.Verification_Status}</StyledTableCell>
              <StyledTableCell align="center">{row.Completion_Status}</StyledTableCell>
              <StyledTableCell align="center"><Button onClick={() => navigate(row.Link, {
              state: {
                student_data : personal_data,
                options: location.state.options
              }
            })} sx = {{background : "#feca0a", color:"#012d5e", ":hover":{
              background : "#00ABE4"
            }}}>{row.Edit}</Button></StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

        <Button variant="contained" onClick = {() => handleSubmit()}color="success" style={{margin: '0 auto', display: "flex", marginTop:"3%" }}>
        Submit Application
        </Button>

      </Grid>
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

ResponsiveStudentHome.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveStudentHome;
