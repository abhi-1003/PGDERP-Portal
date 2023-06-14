import { React, useState, useEffect } from "react";
import { Form, useParams } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
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
import axios from 'axios';
import { BACKEND_URL } from '../../config';
import DownloadIcon from '@mui/icons-material/Download';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, Navigate, useNavigate } from "react-router-dom";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { TextField } from "@mui/material";
import DocViewer from "../../pages/DocViewer";

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
const useStyles = makeStyles((theme) => ({
  homeContent: {
      padding: theme.spacing(4),

  },
  title: {
      fontFamily: 'Franklin Gothic Medium',
      fontSize: '2rem',
      color: '#057BDB',
  },
  tableContainer: {
      margin: 'auto',
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
      borderRadius: "5px",
      marginLeft: "2%"
  },
  table: {
      borderRadius: "5px",
      paddingLeft: "2%"
  },
  tableHeadCell: {
      fontWeight: 'bold',
      fontSize: '1rem',
      background: "#05AAE2",
      paddingLeft: theme.spacing(3),
      color: 'white',
  },
}));

function CandidateDetails({setStep}) {
  const {id} = useParams();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [candidateDetails, setCandidateDetails] = useState({})
  const navigate = useNavigate();
  const [rows, setRows] = useState();
  const [verificationStatus, setVerificationStatus] = useState('');
  const [remarks, setRemarks] = useState('');
  const [toBeModified, setToBeModified] = useState([]);
  const [toBeVerified, setToBeVerified] = useState([]);
  const [data, setData] = useState(null);
  const urlParams = new URLSearchParams(window.location.search);

  useEffect(()=>{
    const url = BACKEND_URL + '/student/personalDetails';
    axios.get(url, {params: {'studentId': localStorage.getItem('studentId')}})
    .then((response)=>{
      console.log(response.data)
      setData(response.data);
    })
    .catch((err)=>{
      console.log(err)
    })
  }, [])
  const options = [
    {
      "value": "Home",
      "icons": <HomeIcon />
    },
    {
      "value": "Logout",
      "icons": <LogoutIcon />
    }
  ];
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const changeStatus = (e) => {
    handleDrawerToggle();
    if (e.target.textContent === "Logout") {
      localStorage.clear();
      navigate("/");
    } else if (e.target.textContent === "Home"){
      navigate("/coordinator");
    }
  };
  const drawer = (
    <div style={{backgroundColor:"#FFFFE0", minHeight:"100vh"}}>
      <Toolbar/>
      <List>
        {options && options.map((item, index) => (
          <ListItem key={item.value}>
            <ListItemButton onClick={changeStatus}>
              <ListItemIcon>
                {item.icons}
              </ListItemIcon>
              <ListItemText primary={item.value} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
  const classes = useStyles();
  const changeVerificationStatus = (event) => {
    let temp = [...toBeModified];
    let temp2 = [...toBeVerified];
    if(event.target.value === 'modification'){
      if(!temp.includes(event.target.id)){
        temp.push(event.target.id);
      }
      if(temp2.includes(event.target.id)){
        temp2.splice(temp2.indexOf(event.target.id), 1);
      }
    }
    else{
      const i = temp.indexOf(event.target.id);
      if(i>-1){
        temp.splice(i, 1);
      }
      if(!temp2.includes(event.target.id)){
        temp2.push(event.target.id);
      }
    }
    setToBeVerified(temp2);
    setToBeModified(temp);
  }
  const goToNext = (event) => {
    // push the verification status and go to next page
    const url = BACKEND_URL + '/student/modification';
    console.log(189, toBeModified)
    if(toBeModified.length > 0){
      console.log('hello')
      axios.post(url, {'studentId': localStorage.getItem('studentId'), 'modifications': toBeModified, 'remarks': remarks, 'type': 'candidateDetails'})
      .then((response)=>{
        console.log(response.data)
        if(response.data.status){
          alert('Saved successfully')
        }
        else{
          alert('Not saved successfully')
        }
      })
      .catch((err)=>{
        console.log(200, err);
      })
    }
    const currStep = parseInt(localStorage.getItem("step"));
    console.log(153, currStep);
    localStorage.setItem('step', null);
    localStorage.setItem('step', `${currStep+1}`);
    setStep(`${currStep+1}`);
  }
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
            COEP PG - Diploma Coordinator Portal
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
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
        <Typography variant="h5" sx = {{paddingTop: "1%", paddingBottom: "1%", margin: "auto"}}>Candidate Details</Typography>
        </Box>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <TableContainer component={Paper} className={classes.tableContainer}>
          {data !== null && <Table className={classes.table}>
              <TableHead className={classes.tableHead}>
                  <TableRow>
                      <StyledTableCell className={classes.tableHeadCell} width="10%"><b>Sr.No.</b></StyledTableCell>
                      <StyledTableCell className={classes.tableHeadCell} width="20%"><b>Candidate Details</b></StyledTableCell>
                      <StyledTableCell className={classes.tableHeadCell} width="45%"><b></b></StyledTableCell>
                      <StyledTableCell className={classes.tableHeadCell} width="25%">Verification</StyledTableCell>
                  </TableRow>
              </TableHead>
              <TableBody>
                  <StyledTableRow>
                      <StyledTableCell className={classes.StyledTableCell} width="10%">1</StyledTableCell>
                      <StyledTableCell className={classes.StyledTableCell} width="20%"><b>Candidate Id</b></StyledTableCell>
                      <StyledTableCell className={classes.StyledTableCell} width="45%">{data["registrationId"]}</StyledTableCell>
                      <StyledTableCell className={classes.StyledTableCell} width="25%">
                        <FormControl>
                        <RadioGroup>
                        <FormControlLabel value="Modification Required" control={<Radio onChange={changeVerificationStatus} id="registrationID" value="modification"/>} label="Modification Required" />
                        <FormControlLabel value="Accepted" control={<Radio onChange={changeVerificationStatus} id="registrationID" value="accepted"/>} label="Accepted" />
                        </RadioGroup>
                        </FormControl>
                      </StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                      <StyledTableCell className={classes.StyledTableCell} width="10%">2</StyledTableCell>
                      <StyledTableCell className={classes.StyledTableCell} width="20%"><b>Course</b></StyledTableCell>
                      <StyledTableCell className={classes.StyledTableCell} width="45%">{data["course"]}</StyledTableCell>
                      <StyledTableCell className={classes.StyledTableCell} width="25%">
                        <FormControl>
                        <RadioGroup>
                        <FormControlLabel value="Modification Required" control={<Radio onChange={changeVerificationStatus} id="course" value="modification"/>} label="Modification Required" />
                        <FormControlLabel value="Accepted" control={<Radio onChange={changeVerificationStatus} value="accepted" id="course"/>} label="Accepted" />
                        </RadioGroup>
                        </FormControl>
                      </StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                      <StyledTableCell className={classes.StyledTableCell} width="10%">3</StyledTableCell>
                      <StyledTableCell className={classes.StyledTableCell} width="20%"><b>Campus Preferences</b></StyledTableCell>
                      <StyledTableCell className={classes.StyledTableCell} width="45%">
                          <Grid container spacing={2} style={{ marginBottom: "1px" }}>
                              {data.campusPreference!==undefined? data.campusPreference.map((pre) => {
                                  return (
                                      <Grid item xs={12} sm={4}>
                                          {pre}
                                      </Grid>
                                  )
                              }):null}
                              
                          </Grid>
                          
                      </StyledTableCell>
                      <StyledTableCell className={classes.StyledTableCell} width="25%">
                        <FormControl>
                          <RadioGroup>
                          <FormControlLabel value="Modification Required" control={<Radio onChange={changeVerificationStatus} id="campusPreference" value="modification"/>} label="Modification Required" />
                        <FormControlLabel value="Accepted" control={<Radio onChange={changeVerificationStatus} value="accepted" id="campusPreference"/>} label="Accepted" />
                          </RadioGroup>
                        </FormControl>
                      </StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                      <StyledTableCell className={classes.StyledTableCell} width="10%">4</StyledTableCell>
                      <StyledTableCell className={classes.StyledTableCell} width="20%"><b>Name</b></StyledTableCell>
                      <StyledTableCell className={classes.StyledTableCell} width="45%">
                          <Grid container spacing={2} style={{ marginBottom: "1px" }}>
                              <Grid item xs={12} sm={4}>
                                  {data['lastName']} <br/> <b>Surname</b>
                              </Grid>
                              <Grid item xs={12} sm={4}>
                                  {data['firstName']} <br/> <b>First Name</b>
                              </Grid>
                              <Grid item xs={12} sm={4}>
                                  {data['middleName']} <br/> <b>Father/Husband's Name</b>
                              </Grid>
                          </Grid>
                          
                      </StyledTableCell>
                      <StyledTableCell className={classes.StyledTableCell} width="25%">
                        <FormControl>
                        <RadioGroup>
                        <FormControlLabel value="Modification Required" control={<Radio onChange={changeVerificationStatus} value="modification" id="name"/>} label="Modification Required" />
                        <FormControlLabel value="Accepted" control={<Radio onChange={changeVerificationStatus} value="accepted" id="name"/>} label="Accepted" />
                        </RadioGroup>
                        </FormControl>
                      </StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                      <StyledTableCell className={classes.StyledTableCell} width="10%">5</StyledTableCell>
                      <StyledTableCell className={classes.StyledTableCell} width="20%"><b>Postal Address</b></StyledTableCell>
                      <StyledTableCell className={classes.StyledTableCell} width="45%">{data['postalAddress']}</StyledTableCell>
                      <StyledTableCell className={classes.StyledTableCell} width="25%">
                        <FormControl>
                        <RadioGroup>
                        <FormControlLabel value="Modification Required" control={<Radio onChange={changeVerificationStatus} value="modification" id="Address"/>} label="Modification Required" />
                        <FormControlLabel value="Accepted" control={<Radio onChange={changeVerificationStatus} value="accepted" id="Address"/>} label="Accepted" />
                        </RadioGroup>
                        </FormControl>
                      </StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                      <StyledTableCell className={classes.StyledTableCell} width="10%">6</StyledTableCell>
                      <StyledTableCell className={classes.StyledTableCell} width="20%"><b>Permanent Address</b></StyledTableCell>
                      <StyledTableCell className={classes.StyledTableCell} width="45%">{data['permanentAddress']}</StyledTableCell>
                      <StyledTableCell className={classes.StyledTableCell} width="25%">
                       <FormControl>
                       <RadioGroup>
                       <FormControlLabel value="Modification Required" control={<Radio onChange={changeVerificationStatus} value="modification" id="permanentAddress"/>} label="Modification Required" />
                        <FormControlLabel value="Accepted" control={<Radio onChange={changeVerificationStatus} value="accepted" id="permanentAddress"/>} label="Accepted" />
                       </RadioGroup>
                       </FormControl>
                      </StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                      <StyledTableCell className={classes.StyledTableCell} width="10%">7</StyledTableCell>
                      <StyledTableCell className={classes.StyledTableCell} width="20%"><b>Email-Id</b></StyledTableCell>
                      <StyledTableCell className={classes.StyledTableCell} width="45%">{data['email']}</StyledTableCell>
                      <StyledTableCell className={classes.StyledTableCell} width="25%">
                        <FormControl>
                        <RadioGroup>
                        <FormControlLabel value="Modification Required" control={<Radio onChange={changeVerificationStatus} value="modification" id="email"/>} label="Modification Required" />
                        <FormControlLabel value="Accepted" control={<Radio onChange={changeVerificationStatus} value="accepted" id="email"/>} label="Accepted" />
                        </RadioGroup>
                        </FormControl>
                      </StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                      <StyledTableCell className={classes.StyledTableCell} width="10%">8</StyledTableCell>
                      <StyledTableCell className={classes.StyledTableCell} width="20%"><b>Gender</b></StyledTableCell>
                      <StyledTableCell className={classes.StyledTableCell} width="45%">{data['gender']}</StyledTableCell>
                      <StyledTableCell className={classes.StyledTableCell} width="25%">
                        <FormControl>
                        <RadioGroup>
                        <FormControlLabel value="Modification Required" control={<Radio onChange={changeVerificationStatus} value="modification" id="gender"/>} label="Modification Required" />
                        <FormControlLabel value="Accepted" control={<Radio onChange={changeVerificationStatus} value="accepted" id="gender"/>} label="Accepted" />
                        </RadioGroup>
                        </FormControl>
                      </StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                      <StyledTableCell className={classes.StyledTableCell} width="10%">9</StyledTableCell>
                      <StyledTableCell className={classes.StyledTableCell} width="20%"><b>Physical Disabilities</b></StyledTableCell>
                      <StyledTableCell className={classes.StyledTableCell} width="45%">{data['phyDis']}</StyledTableCell>
                      <StyledTableCell className={classes.StyledTableCell} width="25%">
                        <FormControl>
                        <RadioGroup>
                        <FormControlLabel value="Modification Required" control={<Radio onChange={changeVerificationStatus} value="modification" id="phyDis"/>} label="Modification Required" />
                        <FormControlLabel value="Accepted" control={<Radio onChange={changeVerificationStatus} value="accepted" id="phyDis"/>} label="Accepted" />
                        </RadioGroup>
                        </FormControl>
                      </StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                      <StyledTableCell className={classes.StyledTableCell} width="10%">10</StyledTableCell>
                      <StyledTableCell className={classes.StyledTableCell} width="20%"><b>Phone No. with STD Code</b></StyledTableCell>
                      <StyledTableCell className={classes.StyledTableCell} width="45%">{data['mobile']}</StyledTableCell>
                      <StyledTableCell className={classes.StyledTableCell} width="25%">
                        <FormControl>
                        <RadioGroup>
                        <FormControlLabel value="Modification Required" control={<Radio onChange={changeVerificationStatus} value="modification" id="mobile"/>} label="Modification Required" />
                        <FormControlLabel value="Accepted" control={<Radio onChange={changeVerificationStatus} value="accepted" id="mobile"/>} label="Accepted" />
                        </RadioGroup>
                        </FormControl>
                      </StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                      <StyledTableCell className={classes.StyledTableCell} width="10%">11</StyledTableCell>
                      <StyledTableCell className={classes.StyledTableCell} width="20%"><b>Parents/Husband's Name</b></StyledTableCell>
                      <StyledTableCell className={classes.StyledTableCell} width="45%">{data['PHname']}</StyledTableCell>
                      <StyledTableCell className={classes.StyledTableCell} width="25%">
                        <FormControl>
                        <RadioGroup>
                        <FormControlLabel value="Modification Required" control={<Radio onChange={changeVerificationStatus} value="modification" id="PHname"/>} label="Modification Required" />
                        <FormControlLabel value="Accepted" control={<Radio onChange={changeVerificationStatus} value="accepted" id="PHname"/>} label="Accepted" />
                        </RadioGroup>
                        </FormControl>
                      </StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                      <StyledTableCell className={classes.StyledTableCell} width="10%">12</StyledTableCell>
                      <StyledTableCell className={classes.StyledTableCell} width="20%"><b>Parents/Husband's Email-Id</b></StyledTableCell>
                      <StyledTableCell className={classes.StyledTableCell} width="45%">{data['PHemail']}</StyledTableCell>
                      <StyledTableCell className={classes.StyledTableCell} width="25%">
                        <FormControl>
                        <RadioGroup>
                        <FormControlLabel value="Modification Required" control={<Radio onChange={changeVerificationStatus} value="modification" id="PHemail"/>} label="Modification Required" />
                        <FormControlLabel value="Accepted" control={<Radio onChange={changeVerificationStatus} value="accepted" id="PHemail"/>} label="Accepted" />
                        </RadioGroup>
                        </FormControl>
                      </StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                      <StyledTableCell className={classes.StyledTableCell} width="10%">13</StyledTableCell>
                      <StyledTableCell className={classes.StyledTableCell} width="20%"><b>Parents/Husband's Mobile No.</b></StyledTableCell>
                      <StyledTableCell className={classes.StyledTableCell} width="45%">{data['PHnumber']}</StyledTableCell>
                      <StyledTableCell className={classes.StyledTableCell} width="25%">
                        <FormControl>
                        <RadioGroup></RadioGroup>
                        <FormControlLabel value="Modification Required" control={<Radio onChange={changeVerificationStatus} value="modification" id="PHnumber"/>} label="Modification Required" />
                        <FormControlLabel value="Accepted" control={<Radio onChange={changeVerificationStatus} value="accepted" id="PHnumber"/>} label="Accepted" />
                        </FormControl>
                      </StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                      <StyledTableCell className={classes.StyledTableCell} width="10%">14</StyledTableCell>
                      <StyledTableCell className={classes.StyledTableCell} width="20%"><b>Date of Birth</b></StyledTableCell>
                      <StyledTableCell className={classes.StyledTableCell} width="45%">
                          <Grid container spacing={2} style={{ marginBottom: "1px" }}>
                              <Grid item xs={12} sm={4}>
                                {data['dob'][0]} / {data['dob'][1]} / {data['dob'][2]}
                              </Grid>
                              <Grid item xs={12} sm={4}>
                                  <b>Age as on date:</b> {data['age']}
                              </Grid>
                              <Grid item xs={12} sm={4}>
                              </Grid>
                          </Grid>
                      </StyledTableCell>
                      <StyledTableCell className={classes.StyledTableCell} width="25%">
                        <FormControl>
                        <RadioGroup>
                        <FormControlLabel value="Modification Required" control={<Radio onChange={changeVerificationStatus} value="modification" id="dob"/>} label="Modification Required" />
                        <FormControlLabel value="Accepted" control={<Radio onChange={changeVerificationStatus} value="accepted" id="dob"/>} label="Accepted" />
                        </RadioGroup>
                        </FormControl>
                      </StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                      <StyledTableCell className={classes.StyledTableCell} width="10%">15</StyledTableCell>
                      <StyledTableCell className={classes.StyledTableCell} width="20%"><b>Domicile State of Candidate</b></StyledTableCell>
                      <StyledTableCell className={classes.StyledTableCell} width="45%">
                          <Grid container spacing={2} style={{ marginBottom: "1px" }}>
                              <Grid item xs={12} sm={4}>
                                {data['domicileState']}
                              </Grid>
                              <Grid item xs={12} sm={4}>
                                  <b>Nationality: </b>
                              </Grid>
                              <Grid item xs={12} sm={4}>
                                  {data['nationality']}
                              </Grid>
                          </Grid>
                      </StyledTableCell>
                      <StyledTableCell className={classes.StyledTableCell} width="25%">
                        <FormControl>
                        <RadioGroup>
                        <FormControlLabel value="Modification Required" control={<Radio onChange={changeVerificationStatus} value="modification" id="domicileState"/>} label="Modification Required" />
                        <FormControlLabel value="Accepted" control={<Radio onChange={changeVerificationStatus} value="accepted" id="domicileState"/>} label="Accepted" />
                        </RadioGroup>
                        </FormControl>
                      </StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                      <StyledTableCell className={classes.StyledTableCell} width="10%">16</StyledTableCell>
                      <StyledTableCell className={classes.StyledTableCell} width="20%"><b>Caste</b></StyledTableCell>
                      <StyledTableCell className={classes.StyledTableCell} width="45%">{data['caste']}</StyledTableCell>
                      <StyledTableCell className={classes.StyledTableCell} width="25%">
                        <FormControl>
                        <RadioGroup>
                        <FormControlLabel value="Modification Required" control={<Radio onChange={changeVerificationStatus} value="modification" id="caste"/>} label="Modification Required" />
                        <FormControlLabel value="Accepted" control={<Radio onChange={changeVerificationStatus} value="accepted" id="caste"/>} label="Accepted" />
                        </RadioGroup>
                        </FormControl>
                      </StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                      <StyledTableCell className={classes.StyledTableCell} width="10%">17</StyledTableCell>
                      <StyledTableCell className={classes.StyledTableCell} width="20%"><b>Aadhar / Passport Document</b></StyledTableCell>
                      <StyledTableCell className={classes.StyledTableCell} width="45%">
                        <DocViewer 
                        filename={data['aadharPassport']}
                        contentType="application/pdf"/>
                      </StyledTableCell>
                      <StyledTableCell className={classes.StyledTableCell} width="25%">
                        <FormControl>
                        <RadioGroup>
                        <FormControlLabel value="Modification Required" control={<Radio onChange={changeVerificationStatus} value="modification" id="aadharPassport"/>} label="Modification Required" />
                        <FormControlLabel value="Accepted" control={<Radio onChange={changeVerificationStatus} value="accepted" id="aadharPassport"/>} label="Accepted" />
                        </RadioGroup>
                        </FormControl>
                      </StyledTableCell>
                  </StyledTableRow>
              </TableBody>
          </Table>  }
      </TableContainer>
      
      </Grid>
      <Grid container direction="row" justifyContent="space-around">
      <Grid item>
          {(toBeModified.length > 0) && <TextField value={remarks} onChange={(e)=>setRemarks(e.target.value)} required variant="outlined" label="Remarks" multiline minRows={5}/>}
      </Grid>
      </Grid>
      <Grid container direction="row" justifyContent="flex-end">
        {console.log(toBeVerified.length, toBeModified.length)}
          <Grid item>
              {((toBeModified.length + toBeVerified.length)!==17)? 
              <Button disabled variant="contained">
                Next
              </Button>:
              (toBeModified.length>0 && remarks.length===0)?
              <Button disabled variant="contained">
                Next
              </Button>:
              <Button onClick={goToNext} variant="contained" style={{backgroundColor: "#01257D", color: "#FFFFFF"}}>
              Next
            </Button>
              }
          </Grid>
      </Grid>
      </Box>
      </Box>
  )
}

export default CandidateDetails;