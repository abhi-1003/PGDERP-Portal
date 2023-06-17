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
import ArticleIcon from '@mui/icons-material/Article';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';

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
  const [nowVerified, setNowVerified] = useState([]);
  const urlParams = new URLSearchParams(window.location.search);
  const [k, setK] = useState(5);
  useEffect(()=>{
    let t = k;
    const url = BACKEND_URL + '/student/personalDetails';
    axios.get(url, {params: {'studentId': localStorage.getItem('studentId')}})
    .then((response)=>{
      console.log(response.data)
      if(['dob', 'age'].every((i)=>response.data.verified.includes(i))){
        t -= 2;
      }
      if(['domicileState', 'nationality'].every((i)=>response.data.verified.includes(i))){
        t -= 2
      }
      if(response.data.verified.includes('aadharPassport')){
        t -= 1
      }
      setK(t)
      setData(response.data.personalDetails);
      // setToBeVerified(response.data.verified);
      setNowVerified(response.data.verified);
      
    })
    .catch((err)=>{
      console.log(err)
    })
  }, [])
  
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const options = [
    {
      "value": "Home",
      "icons": <HomeIcon />
    },
    {
      "value": "Logout",
      "icons": <LogoutIcon />
    },
    {
      "value": "Download Individual Applications",
      "icons": <DocumentScannerIcon />
    },
    {
      "value": "Download List",
      "icons": <ArticleIcon />
    }
  ];
  const changeStatus = (e) => {
    handleDrawerToggle();
    if (e.target.textContent === "Logout") {
      localStorage.clear();
      navigate("/");
    } else if (e.target.textContent === "Home"){
      navigate("/coordinator");
    }
    else if(e.target.textContent === "Download List"){
      navigate("/coordinator/list")
    }
    else if(e.target.textContent === "Download Individual Applications"){
      navigate("/coordinator/download")
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
    let e = event.target.id.split(',');
    console.log(e)
    console.log(event.target.value)
    if(event.target.value === 'modification'){
      for(var i = 0; i<e.length; i++){
        if(!temp.includes(e[i])){
          temp.push(e[i]);
        }
        if(temp2.includes(e[i])){
          temp2.splice(temp2.indexOf(e[i]), 1);
        }
      }
    }
    else{
      for(var j = 0; j <e.length; j++){
        var i = temp.indexOf(e[j]);
        if(i>-1){
          temp.splice(i, 1);
        }
        if(!temp2.includes(e[j])){
          temp2.push(e[j]);
        }
      }
    }
    console.log(temp2);
    console.log(temp)
    setToBeVerified(temp2);
    setToBeModified(temp);
  }
  const goToNext = (event) => {
    // push the verification status and go to next page
    const url = BACKEND_URL + '/student/modification';
    axios.post(url, {'studentId': localStorage.getItem('studentId'), 'modifications': toBeModified, 'remarks': remarks, 'verified': toBeVerified, 'type': 'personalInfo'})
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
                      <StyledTableCell className={classes.tableHeadCell} width="45%"><b></b></StyledTableCell>
                      <StyledTableCell className={classes.tableHeadCell} width="25%">Verification</StyledTableCell>
                  </TableRow>
              </TableHead>
              <TableBody>

                  <StyledTableRow>
                      <StyledTableCell className={classes.StyledTableCell} width="10%">1</StyledTableCell>
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
                      <StyledTableCell>
                        <DocViewer 
                        filename={data['aadharPassport']}
                        contentType="application/pdf"/>
                      </StyledTableCell>
                      <StyledTableCell className={classes.StyledTableCell} width="25%">
                        {(nowVerified.includes('dob') && nowVerified.includes('age'))? <FormControl>
                        <RadioGroup>
                        <FormControlLabel value="Modification Required" control={<Radio disabled onChange={changeVerificationStatus} value="modification" id={['dob', 'age', 'aadharPassport']}/>} label="Modification Required" />
                        <FormControlLabel value="Accepted" control={<Radio disabled defaultChecked onChange={changeVerificationStatus} value="accepted" id={['dob', 'age', 'aadharPassport']}/>} label="Accepted" />
                        </RadioGroup>
                        </FormControl>:
                        <FormControl>
                        <RadioGroup>
                        <FormControlLabel value="Modification Required" control={<Radio onChange={changeVerificationStatus} value="modification" id={['dob', 'age', 'aadharPassport']}/>} label="Modification Required" />
                        <FormControlLabel value="Accepted" control={<Radio onChange={changeVerificationStatus} value="accepted" id={['dob', 'age', 'aadharPassport']}/>} label="Accepted" />
                        </RadioGroup>
                        </FormControl>}
                      </StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                      <StyledTableCell className={classes.StyledTableCell} width="10%">2</StyledTableCell>
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
                      <StyledTableCell>
                        <DocViewer 
                        filename={data['aadharPassport']}
                        contentType="application/pdf"/>
                      </StyledTableCell>
                      <StyledTableCell className={classes.StyledTableCell} width="25%">
                        {(nowVerified.includes('domicileState') && nowVerified.includes('nationality'))?
                        <FormControl>
                        <RadioGroup>
                        <FormControlLabel value="Modification Required" control={<Radio disabled onChange={changeVerificationStatus} value="modification" id={['domicileState', 'nationality', 'aadharPassport']}/>} label="Modification Required" />
                        <FormControlLabel value="Accepted" control={<Radio disabled defaultChecked onChange={changeVerificationStatus} value="accepted" id={['domicileState', 'nationality', 'aadharPassport']}/>} label="Accepted" />
                        </RadioGroup>
                        </FormControl>:
                        <FormControl>
                        <RadioGroup>
                        <FormControlLabel value="Modification Required" control={<Radio onChange={changeVerificationStatus} value="modification" id={['domicileState', 'nationality', 'aadharPassport']}/>} label="Modification Required" />
                        <FormControlLabel value="Accepted" control={<Radio onChange={changeVerificationStatus} value="accepted" id={['domicileState', 'nationality', 'aadharPassport']}/>} label="Accepted" />
                        </RadioGroup>
                        </FormControl>}
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
        {console.log(k)}
          <Grid item>
              {((toBeModified.length + toBeVerified.length)!==k)? 
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