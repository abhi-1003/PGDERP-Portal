import { React, useState, useEffect } from "react";
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
import CoordinatorDownload from "./coordinatorDownload";
import ArticleIcon from '@mui/icons-material/Article';
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
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
function Coordinator() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  
  const [rows, setRows] = useState(null);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  useEffect(()=>{
    
    axios.get(BACKEND_URL + '/student/coordinatorSections', {params: {'email': localStorage.getItem("email")}})
    .then((response)=>{
        console.log(response.data)
      setRows(response.data)
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
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";
  const exportToCSV = (apiData, fileName) => {
    const ws = XLSX.utils.json_to_sheet(apiData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
};
    
  const download = (i) => {
    const url = BACKEND_URL + '/student/getData';
    axios.get(url, {params: {'course': i}})
    .then((response)=>{
        console.log(151, response.data)
        exportToCSV(response.data, `${i}`)
    })
    .catch((e)=>{
        console.log(e)
    })
  }
  // const container = window !== undefined ? () => window().document.body : undefined;
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
        <Typography variant="h5" sx = {{paddingTop: "1%", paddingBottom: "3%", margin: "auto"}}>Download Student List</Typography>
        </Box>
        <Grid justifyContent="center" container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {rows !== null && (
            rows.map((i)=>{
                return (
                    <Grid item spacing={5}>
                        <Card variant="outlined">
                        <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            Course: {i}
                        </Typography>
                        </CardContent>
                        <CardActions>
                        <Button onClick={()=>download(i)}><DownloadIcon /></Button>
                        </CardActions>
                    </Card>
                    </Grid>
                )
            })
        )}
      </Grid>
      </Box>
      </Box>
  )
}

export default Coordinator