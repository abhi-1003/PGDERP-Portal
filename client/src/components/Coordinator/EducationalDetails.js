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
  const [remarks, setRemarks] = useState('');
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
    console.log(147, event.target.value)
    setVerificationStatus(event.target.value);
  }
  const goToNext = (event) => {
    // push the verification status and go to next page
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
        <Typography variant="h5" sx = {{paddingTop: "1%", paddingBottom: "1%", margin: "auto"}}>Educational Details</Typography>
        </Box>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <TableContainer component={Paper} className={classes.tableContainer}>
        <Table className={classes.table}>
              <TableHead className={classes.tableHead}>
              <TableRow>
                    <StyledTableCell className={classes.tableHeadCell} width="25%"><b>Examination</b></StyledTableCell>
                    <StyledTableCell className={classes.tableHeadCell} width="40%"><b>Name Of the Institute/University</b></StyledTableCell>
                    <StyledTableCell className={classes.tableHeadCell} width="10%"><b>From</b></StyledTableCell>
                    <StyledTableCell className={classes.tableHeadCell} width="10%"><b>To</b></StyledTableCell>
                    <StyledTableCell className={classes.tableHeadCell} width="25%"><b>Percentage Marks%</b></StyledTableCell>
                </TableRow>
              </TableHead>
            </Table>
        {/* <Table className={classes.table}>
            <TableHead className={classes.tableHead}>
                <TableRow>
                    <StyledTableCell className={classes.tableHeadCell} width="25%"><b>Examination</b></StyledTableCell>
                    <StyledTableCell className={classes.tableHeadCell} width="40%"><b>Name Of the Institute/University</b></StyledTableCell>
                    <StyledTableCell className={classes.tableHeadCell} width="20%" style={{ textAlign: "center" }}><b>Duration</b>
                        <Grid container spacing={2} style={{ marginBottom: "1px" }}>
                            <Grid item xs={12} sm={6} style={{ marginTop: "6px" }}>
                                From
                            </Grid>
                            <Grid item xs={12} sm={6} style={{ marginTop: "6px" }}>
                                To
                            </Grid>
                        </Grid>
                    </StyledTableCell>
                    <StyledTableCell className={classes.tableHeadCell} width="15%"><b>Percentage Marks%</b></StyledTableCell>
                </TableRow>
            </TableHead>
        </Table> */}
        </TableContainer>
      </Grid>
      <Grid container direction="row" justifyContent="space-around">
      <Grid item>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        <FormControlLabel value="Modification Required" control={<Radio onChange={changeVerificationStatus} value="modification"/>} label="Modification Required" />
        <FormControlLabel value="Accepted" control={<Radio onChange={changeVerificationStatus} value="accepted"/>} label="Accepted" />
      </RadioGroup>
      </Grid>
      <Grid item>
          {verificationStatus==="modification" && <TextField value={remarks} onChange={(e)=>setRemarks(e.target.value)} required variant="outlined" label="Remarks" multiline minRows={5}/>}
      </Grid>
      </Grid>
      <Grid container direction="row" justifyContent="space-between">
        <Grid item>
            <Button variant="contained" style={{backgroundColor: "#01257D", color: "#FFFFFF"}}>
                Prev
            </Button>
        </Grid>
          <Grid item>
              {(verificationStatus === '' || (verificationStatus==="modification" && remarks===''))? 
              <Button disabled variant="contained">
                Next
              </Button>:
              <Button onClick={goToNext} variant="contained" style={{backgroundColor: "#01257D", color: "#FFFFFF"}}>
              Next
            </Button>}
          </Grid>
      </Grid>
      </Box>
      </Box>
  )
}

export default EducationalDetails;