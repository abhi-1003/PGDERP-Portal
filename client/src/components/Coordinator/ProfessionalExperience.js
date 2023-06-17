import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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

function EducationalDetails({setStep}) {
  const {id} = useParams();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [candidateDetails, setCandidateDetails] = useState({})
  const navigate = useNavigate();
  const [rows, setRows] = useState();
  const [verificationStatus, setVerificationStatus] = useState('');
  const [data, setData] = useState(null);
  const [remarks, setRemarks] = useState('');
  const [toBeModified, setToBeModified] = useState([]);
  const [toBeVerified, setToBeVerified] = useState([]);
  const [k, setK] = useState(2);
  const [nowVerified, setNowVerified] = useState([]);
  
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
  useEffect(()=>{
    const url = BACKEND_URL + '/student/professionalDetails';
    let t = k;
    console.log(url)
    axios.get(url, {params: {'id': localStorage.getItem('studentId')}})
    .then((response)=>{
      console.log(response.data)
      if(['professionalExperience', 'profExp'].every((i)=>response.data.verified.includes(i))){
        t -= 2
      }
      if(response.data.professionalExperience.exps.length === 0 && t!=0){
        t -= 2
      }
      setData(response.data.professionalExperience);
      setNowVerified(response.data.verified)
      setK(t)
    })
    .catch((err)=>{
      console.log(err);
    })
  }, [])
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
    axios.post(url, {'studentId': localStorage.getItem('studentId'), 'modifications': toBeModified, 'remarks': remarks, 'verified': toBeVerified, 'type': 'professionalExperience'})
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
  const goToPrev = (event) => {
    const currStep = parseInt(localStorage.getItem("step"));
    localStorage.setItem('step', null);
    localStorage.setItem('step', `${currStep-1}`);
    setStep(`${currStep-1}`);
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
        <Typography variant="h5" sx = {{paddingTop: "1%", paddingBottom: "1%", margin: "auto"}}>Professional Experience in reverse Chronological Order</Typography>
        </Box>
        <Box display="flex" justifyContent="center" alignItems="center">
        {data !== null && <Grid container style={{alignItems: 'center', alignContent: 'center'}} rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <TableContainer component={Paper} className={classes.tableContainer}>
        <Typography variant='h6' margin={2} >Professional Experience</Typography>
        <Table className={classes.table}>
              <TableHead className={classes.tableHead}>
              <TableRow>
                    <StyledTableCell className={classes.tableHeadCell} width="25%"><b>Name of the Company</b></StyledTableCell>
                    <StyledTableCell className={classes.tableHeadCell} width="25%"><b>Designation and Rank</b></StyledTableCell>
                    <StyledTableCell className={classes.tableHeadCell} width="10%"><b>From</b></StyledTableCell>
                    <StyledTableCell className={classes.tableHeadCell} width="10%"><b>To</b></StyledTableCell>
                    <StyledTableCell className={classes.tableHeadCell} width="20%"><b>Nature of Work</b></StyledTableCell>
                    <StyledTableCell className={classes.tableHeadCell} width="20%"><b>View Document</b></StyledTableCell>
                    <StyledTableCell className={classes.tableHeadCell} width="10%"><b>Verification</b></StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {data['exps'].map((item, index) => {
                return (
                  <TableRow>
                    <StyledTableCell className={classes.StyledTableCell} width="25%"><b>{item['companyName']}</b></StyledTableCell>
                    <StyledTableCell className={classes.StyledTableCell} width="25%">{item['rankDesignation']}</StyledTableCell>
                    <StyledTableCell className={classes.StyledTableCell} width="10%">{item['periodFrom']}</StyledTableCell>
                    <StyledTableCell className={classes.StyledTableCell} width="10%">{item['periodTo']}</StyledTableCell>
                    <StyledTableCell className={classes.StyledTableCell} width="20%">{item['workNature']}</StyledTableCell>
                    <StyledTableCell className={classes.StyledTableCell} width="25%"><DocViewer filename={data['profExp']} contentType="application/pdf"/></StyledTableCell>
                    <StyledTableCell className={classes.tabStyledTableCellleHeadCell} width="10%">
                    {['professionalExperience', 'profExp'].every((i)=>nowVerified.includes(i))?
                    <FormControl>
                    <RadioGroup>
                    <FormControlLabel value="Modification Required" control={<Radio disabled onChange={changeVerificationStatus} id={["professionalExperience", 'profExp']} value="modification"/>} label="Modification Required" />
                    <FormControlLabel value="Accepted" control={<Radio disabled onChange={changeVerificationStatus} id={["professionalExperience", 'profExp']} value="accepted"/>} label="Accepted" />
                    </RadioGroup>
                  </FormControl>:
                  <FormControl>
                  <RadioGroup>
                  <FormControlLabel value="Modification Required" control={<Radio onChange={changeVerificationStatus} id={["professionalExperience", 'profExp']} value="modification"/>} label="Modification Required" />
                  <FormControlLabel value="Accepted" control={<Radio onChange={changeVerificationStatus} id={["professionalExperience", 'profExp']} value="accepted"/>} label="Accepted" />
                  </RadioGroup>
                </FormControl>}
                    </StyledTableCell>
                  </TableRow>
                )
              })}
              </TableBody>
            </Table>
        </TableContainer>
      </Grid>}
        </Box>
      <Grid container direction="row" justifyContent="space-around">
      <Grid item>
          {(toBeModified.length > 0) && <TextField value={remarks} onChange={(e)=>setRemarks(e.target.value)} required variant="outlined" label="Remarks" multiline minRows={5}/>}
      </Grid>
      </Grid>
      {data!== null && <Grid container direction="row" justifyContent="space-between">
        <Grid item>
            <Button onClick={goToPrev} variant="contained" style={{backgroundColor: "#01257D", color: "#FFFFFF"}}>
                Prev
            </Button>
        </Grid>
          <Grid item>
              {((toBeModified.length + toBeVerified.length)!==k)? 
              <Button disabled variant="contained" >
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
      </Grid>}
      </Box>
      </Box>
  )
}

export default EducationalDetails;