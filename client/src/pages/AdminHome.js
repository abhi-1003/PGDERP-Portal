import { React, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
// import NavBar from "../components/Navbar/Navbar";
import { useForm, Form } from "./Form";
import { Navigate, useNavigate } from "react-router-dom";
import Input from "./Input";
import { BACKEND_URL } from "../config";
import axios from "axios";
import HomeIcon from '@mui/icons-material/Home';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import EditIcon from '@mui/icons-material/Edit';
import DownloadIcon from '@mui/icons-material/Download';
import LogoutIcon from '@mui/icons-material/Logout';
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Divider from "@mui/material/Divider";
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
import { useLocation } from "react-router-dom";
import {
  Paper,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableContainer,
  TextField,
} from "@material-ui/core";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  renderText,
  renderButton,
  renderInputText,
  renderText1,
  renderMultiInputText,
  renderInputSelect,
  renderDate,
  RenderDate,
  MultipleSelect,
  renderInputTextDisabled,
} from "../components/common/displayComponents";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";

const theme = createTheme();
const drawerWidth = 280;

const exportToExcel = () => {
  const url = BACKEND_URL + "/student/allStudentData";
  const excel_data = [];
  const XLSX = require("xlsx");
  axios.get(url).then((res) => {
    let student_data = res.data;
    // console.log(student_data);
    student_data.forEach((student) => {
      let course = "";
      let lastName = "";
      let firstName = "";
      if (student.personalInfo.course) {
        course = student.personalInfo.course;
      }
      if (student.personalInfo.lastName) {
        lastName = student.personalInfo.lastName;
      }

      if (student.personalInfo.firstName) {
        firstName = student.personalInfo.firstName;
      }

    //   console.log(course, lastName, firstName);

      excel_data.push({
        course,
        lastName,
        firstName,
      });
    });
    // console.log(excel_data);

    const XLSX = require("xlsx");
    const workSheet = XLSX.utils.json_to_sheet(excel_data);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, "Students Data");
    XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
    XLSX.writeFile(workBook, "Students Data.xlsx");
  });
};

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
  "&:nth-of-type(odd)": {
    backgroundColor: "#FFFFFF",
  },
  "&:nth-of-type(even)": {
    backgroundColor: "#FFFFFF",
  },
  // hide last border
  // '&:last-child td, &:last-child th': {
  //   border: 0,
  // },
}));

export default function AdminHome() {
  const location = useLocation();
  const navigate = useNavigate();
  const { window } = location.state;
  const [mobileOpen, setMobileOpen] = useState(false);

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
                      options: location.state.options,
                    },
                  })
                }
              >
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
                    <DownloadIcon />
                  )
                }
                {
                  index === 3 && (
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

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const registerCoordinator = () => {
    navigate("/admin/registerCoord");
  };

  const wholeData = () => {
    navigate("/admin/grid")
  }

  return (
    <Box bgcolor="#E5EDF1" sx={{ display: "flex", minHeight: "100vh" }}>
    <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: "#00ABE4",
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
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
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
              width: drawerWidth,
            },
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
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      > <Toolbar />
        <Paper component={Box} p={2}>
        <Grid container spacing={2} style={{ justifyContent: "center" }}>
            <Box mt={1} mb={2}>
              {renderText({ label: "ADMIN HOME" })}
            </Box>
          </Grid>
        </Paper>
      </Box>
    </Box>
      
   
  );
}
