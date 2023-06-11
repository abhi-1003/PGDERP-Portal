import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
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
import Typography from "@mui/material/Typography";
import { Navigate, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import {
  Grid,
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
import { BACKEND_URL } from "../config";
import axios from "axios";
import Button from "@mui/material/Button";
import e from "cors";
import { CloudUpload } from "@material-ui/icons";
import DocViewer from "./DocViewer";

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


function Documents() {
    const location = useLocation();
    const navigate = useNavigate();
    const { window } = location.state;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [docSchema, setDocSchema] = React.useState({
        sscEq: '',
        hscEq: '',
        grad: '',
        aadharPassport: '',
        profExp: '',
        otCourses: '',
        selfDeclaration: '',
        feesPayment: ''
    })

    const [docs,setDocs] = React.useState([
        {
            "name": "SSC/Equivalent (Std. X/level 10) Marksheet",
            "status": "Pending",
            "file": null,
            "dbName": "sscEq",
            "filename" : "",
            "originalname" : ""
        },
        {
            "name": "HSC/Equivalent (Std. XII/level 12) Marksheet",
            "status": "Pending",
            "file": null,
            "dbName": "hscEq",
            "filename" : "",
            "originalname" : ""
        },
        {
            "name": "Graduation All Semester Grade Sheets, Passing Certificate, Degree Certificate",
            "status": "Pending",
            "file": null,
            "dbName": "grad",
            "filename" : "",
            "originalname" : ""
        },
        {
            "name": "Aadhar/Passport",
            "status": "Pending",
            "file": null,
            "dbName": "aadharPassport",
            "filename" : "",
            "originalname" : ""
        },
        {
            "name": "Professional Experience",
            "status": "Pending",
            "file": null,
            "dbName": "profExp",
            "filename" : "",
            "originalname" : ""
        },
        {
            "name": "Other Courses",
            "status": "Pending",
            "file": null,
            "dbName": "otCourses",
            "filename" : "",
            "originalname" : ""
        },
        {
            "name": "Single Document Containing Self Declaration form and Education Declaration form",
            "status": "Pending",
            "file": null,
            "dbName": "selfDeclaration",
            "filename" : "",
            "originalname" : ""
        }, 
        {
            "name" : "Fees Payment Receipt",
            "status" : "Pending",
            "file" : null,
            "dbName" : "feesPayment",
            "filename" : "",
            "originalname" : ""
        }
    ])

    function fileUpload(event, index){
        const tempDocs = [...docs];
        const ele = tempDocs[index];
        const data = new FormData();
        data.append('file',event.target.files[0],event.target.files[0].name)
        ele.file = data;
        setDocs(tempDocs);
    }

    function fileSubmit(index){
        const URL = BACKEND_URL + '/files/upload';
        if(docs[index].file !== null){
            axios.post(URL, docs[index]["file"])
            .then(function(response){
                console.log(response)
                var tempDoc = docSchema;
                setDocs({...docs, [docs[index].filename]: response.data.filename, [docs[index].originalname]: response.data.originalname
                })
                tempDoc[docs[index].dbName] = response.data.filename;
                axios.post(BACKEND_URL + '/files/setUser',{'email':location.state.student_data.email,'docName':docs[index]["name"], 'doc': tempDoc})
                .then(function(res){
                    setDocSchema({...docSchema, [docs[index].dbName]: response.data.filename})
                    const tempDocs = [...docs];
                    const ele = tempDocs[index];
                    ele.status = "Submitted";
                    setDocs(tempDocs);
                })
                .catch(function(err){
                    console.log(err);
                })
            })
            .catch(function(error){console.log(error)});
        }
        else{
            alert("Please upload a file!")
        }
    }

    const handleSave = () => {
        let validate = true
        Object.keys(docs).map((row) => {
            if(docs[row]["filename"] === ""){
                validate = false
            }
        })

        if(validate){
          const url = BACKEND_URL + "/student/docFilled";
          const body = {
            id: location.state.student_data._id,
          };
          axios
          .post(url, body, {
            headers: {
              "pgderp-website-jwt": localStorage.getItem("pgderp-website-jwt"),
            },
          })
          .then((res) => {
            alert(res.data.message)
          })
            navigate("/student/home", {
                state: {
                  student_data: location.state.student_data,
                  options: location.state.options,
                },
              })
        }
    }

    React.useEffect(()=>{
        const url = BACKEND_URL + '/student/getDocs';
        axios.get(url, {params: {'email': location.state.student_data.email}})
        .then(function(response){
            if(response.data.doc != undefined && response.data.doc != null){
                var tempDocs = [...docs];
                console.log(response.data.doc)
                for (const [k, v] of Object.entries(response.data.doc)){
                    if(v !== ''){
                        for(var i=0; i<tempDocs.length; i++){
                            if(tempDocs[i].dbName === k){
                                tempDocs[i].filename = response.data.doc[k]
                                tempDocs[i].status = "Submitted";
                                break;
                            }
                        }
                    }
                }
                setDocSchema(response.data.doc);
                setDocs(tempDocs)
            }
        })
        .catch(function(err){
            console.log(err);
        })
        
    }, [])

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
                          options: location.state.options,
                        },
                      })
                    }
                  >
                    <ListItemIcon>
                      {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
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

      return(
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
      >
        <Toolbar />

        <Paper component={Box} p={2}>
          <Grid container spacing={2} style={{ justifyContent: "center" }}>
            <Box mt={1} mb={2}>
              {renderText({ label: "Important Documents Uploading" })}
            </Box>
          </Grid>
        </Paper>

        <TableContainer component={Paper}>
        <Table>
           <TableHead>
            <TableRow>
                <TableCell>Sr. No.</TableCell>
                <TableCell>Document Name</TableCell>
                <TableCell>Upload</TableCell>
                <TableCell>View</TableCell>
                <TableCell>Status</TableCell>
            </TableRow>
            </TableHead> 
            <TableBody>
                {Object.keys(docs).map((row, i) => {
                    return (
                        <TableRow>
                        <TableCell>{i+1}</TableCell>
                        <TableCell>{docs[row]["name"]}</TableCell>
                        <TableCell><input type="file" onChange={(event)=>fileUpload(event, i)}/><CloudUpload style={{cursor: "pointer"}} onClick={()=>fileSubmit(i)}/></TableCell>
                        {docs[row]["filename"] && (
                            <TableCell>
                            <DocViewer filename = {docs[row]["filename"]} contentType="application/pdf"/>
                            </TableCell>
                        )}
                        {
                            !docs[row]["filename"] && (
                                <TableCell>No file
                                    </TableCell>

                            )
                        }
                        <TableCell>{docs[row]["status"]}</TableCell>
                    </TableRow>
                    )
                })}
            </TableBody>
        </Table>
        </TableContainer>

        <Button
          variant="contained"
          onClick={() => handleSave()}
          color="success"
          style={{ margin: "0 auto", display: "flex", marginTop: "3%" }}
        >
          SAVE 
        </Button>

    </Box>
        </Box>
      )
}

Documents.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
  };
  
  export default Documents;