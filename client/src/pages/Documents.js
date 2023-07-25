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
import CircularProgress from "@mui/material/CircularProgress";
import CallIcon from '@mui/icons-material/Call';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

import HomeIcon from "@mui/icons-material/Home";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import EditIcon from "@mui/icons-material/Edit";
import DownloadIcon from "@mui/icons-material/Download";
import LogoutIcon from "@mui/icons-material/Logout";

import { saveAs } from "file-saver";

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
  const [loading1, setLoading1] = React.useState(false);
  const [loading2, setLoading2] = React.useState(false);
  const [loading3, setLoading3] = React.useState(false);
  const [loading4, setLoading4] = React.useState(false);
  const [loading5, setLoading5] = React.useState(false);
  const [loading6, setLoading6] = React.useState(false);
  const [loading7, setLoading7] = React.useState(false);
  const [loading8, setLoading8] = React.useState(false);
  const [loading9, setLoading9] = React.useState(false);
  const [loading10, setLoading10] = React.useState(false);
  const [loading11, setLoading11] = React.useState(false);
  const [ot, setOt] = React.useState(true);
  const [pf, setPf] = React.useState(true);
  const [pg, setPg] = React.useState(true);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [docSchema, setDocSchema] = React.useState({
    sscEq: "",
    hscEq: "",
    grad: "",
    postGrad: "",
    aadharPassport: "",
    profExp: "",
    otCourses: "",
    selfDeclaration: "",
    feesPayment: "",
    photo: "",
  });

  const [docs, setDocs] = React.useState([
    {
      name: "SSC/Equivalent (Std. X/level 10) Marksheet",
      status: "Pending",
      file: null,
      dbName: "sscEq",
      filename: "",
      originalname: "",
    },
    {
      name: "HSC/Diploma (All semester grade sheets, passing certificate)",
      status: "Pending",
      file: null,
      dbName: "hscEq",
      filename: "",
      originalname: "",
    },
    {
      name:
        "Graduation All Semester Grade Sheets, Passing Certificate, Degree Certificate",
      status: "Pending",
      file: null,
      dbName: "grad",
      filename: "",
      originalname: "",
    },
    {
      name:
        "Post Graduation All Semester Grade Sheets, Passing Certificate, Degree Certificate",
      status: "Pending",
      file: null,
      dbName: "postGrad",
      filename: "",
      originalname: "",
    },
    {
      name: "Aadhar/Passport",
      status: "Pending",
      file: null,
      dbName: "aadharPassport",
      filename: "",
      originalname: "",
    },
    {
      name: "Professional Experience",
      status: "Pending",
      file: null,
      dbName: "profExp",
      filename: "",
      originalname: "",
    },
    {
      name: "Other Courses",
      status: "Pending",
      file: null,
      dbName: "otCourses",
      filename: "",
      originalname: "",
    },
    {
      name:
        "Single Document Containing Self Declaration form and Education Declaration form",
      status: "Pending",
      file: null,
      dbName: "selfDeclaration",
      filename: "",
      originalname: "",
    },
    {
      name: "Fees Payment Receipt",
      status: "Pending",
      file: null,
      dbName: "feesPayment",
      filename: "",
      originalname: "",
    },
    {
      name: "Candidate Photograph",
      status: "Pending",
      file: null,
      dbName: "photo",
      filename: "",
      originalname: "",
    },
    {
      name: "Candidate Signature",
      status: "Pending",
      file: null,
      dbName: "sign",
      filename: "",
      originalname: "",
    },
  ]);

  function fileUpload(event, index) {
    const tempDocs = [...docs];
    const ele = tempDocs[index];
    const data = new FormData();
    let v = true;
    if (index == 9 || index == 10) {
      if (event.target.files[0].type != "image/png") {
        v = false;
        alert("Please Upload PNG file");
      }
    } else {
      if (event.target.files[0].type != "application/pdf") {
        v = false;
        alert("Please Upload PDF file");
      }
    }

    const fileSizeLimit = 512 * 1024;
    if (event.target.files[0].size > fileSizeLimit) {
      v = false;
      alert("Please upload a file smaller than 512kb.");
    }


    if (v) {
      data.append("file", event.target.files[0], event.target.files[0].name);
      ele.file = data;
      setDocs(tempDocs);
    }
  }

  function fileSubmit(index) {
    const URL = BACKEND_URL + "/files/upload";
    let v = true;
    if (v) {
      //console.log(docs[index])
      if (docs[index].file !== null) {
        if (index == 0) {
          setLoading1(true);
        }
        if (index == 1) {
          setLoading2(true);
        }
        if (index == 2) {
          setLoading3(true);
        }
        if (index == 3) {
          setLoading4(true);
        }
        if (index == 4) {
          setLoading5(true);
        }
        if (index == 5) {
          setLoading6(true);
        }
        if (index == 6) {
          setLoading7(true);
        }
        if (index == 7) {
          setLoading8(true);
        }
        if (index == 8) {
          setLoading9(true);
        }
        if (index == 9) {
          setLoading10(true);
        }
        if (index == 10) {
          setLoading11(true);
        }

        axios
          .post(URL, docs[index]["file"])
          .then(function(response) {
            var tempDoc = docSchema;
            setDocs({
              ...docs,
              [docs[index].filename]: response.data.filename,
              [docs[index].originalname]: response.data.originalname,
            });
            tempDoc[docs[index].dbName] = response.data.filename;
            axios
              .post(BACKEND_URL + "/files/setUser", {
                email: location.state.student_data.email,
                docName: docs[index]["name"],
                doc: tempDoc,
              })
              .then(function(res) {
                setDocSchema({
                  ...docSchema,
                  [docs[index].dbName]: response.data.filename,
                });
                const tempDocs = [...docs];
                const ele = tempDocs[index];
                ele.status = "Submitted";
                setDocs(tempDocs);
                if (index == 0) {
                  setLoading1(false);
                }
                if (index == 1) {
                  setLoading2(false);
                }
                if (index == 2) {
                  setLoading3(false);
                }
                if (index == 3) {
                  setLoading4(false);
                }
                if (index == 4) {
                  setLoading5(false);
                }
                if (index == 5) {
                  setLoading6(false);
                }
                if (index == 6) {
                  setLoading7(false);
                }
                if (index == 7) {
                  setLoading8(false);
                }
                if (index == 8) {
                  setLoading9(false);
                }
                if (index == 9) {
                  setLoading10(false);
                }
                if (index == 10) {
                  setLoading11(false);
                }
              })
              .catch(function(err) {
                console.log(err);
              });
          })
          .catch(function(error) {
            console.log(error);
          });
      } else {
        alert("Please choose a file!");
      }
    }
  }

  const handleSave = () => {
    let validate = true;
    Object.keys(docs).map((row) => {
      if (row == 3 && pg) {
        if (docs[row]["filename"] === "") {
          validate = false;
        }
      }

      if (row == 5 && pf) {
        if (docs[row]["filename"] === "") {
          validate = false;
        }
      }

      if (row == 6 && ot) {
        if (docs[row]["filename"] === "") {
          validate = false;
        }
      }

      if (row != 5 && row != 6 && row != 3) {
        if (docs[row]["filename"] === "") {
          validate = false;
        }
      }
    });

    if (validate == false) {
      alert("All mandatory documents are to be uploaded!");
    }

    if (
      validate &&
      !loading1 &&
      !loading2 &&
      !loading3 &&
      !loading4 &&
      !loading5 &&
      !loading6 &&
      !loading7 &&
      !loading8 &&
      !loading9
    ) {
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
          alert(res.data.message);
          navigate("/student/home", {
            state: {
              student_data: location.state.student_data,
              options: location.state.options,
            },
          });
        });
    }
  };

  React.useEffect(() => {
    const url = BACKEND_URL + "/student/getDocs";
    axios
      .get(url, { params: { email: location.state.student_data.email } })
      .then(function(response) {
        if (response.data.doc != undefined && response.data.doc != null) {
          var tempDocs = [...docs];
          //   console.log(response.data.doc);
          for (const [k, v] of Object.entries(response.data.doc)) {
            if (v !== "") {
              for (var i = 0; i < tempDocs.length; i++) {
                if (tempDocs[i].dbName === k) {
                  tempDocs[i].filename = response.data.doc[k];
                  tempDocs[i].status = "Submitted";
                  break;
                }
              }
            }
          }
          setDocSchema(response.data.doc);
          setDocs(tempDocs);
        }
      })
      .catch(function(err) {
        console.log(err);
      });
  }, [
    loading1,
    loading2,
    loading3,
    loading4,
    loading5,
    loading6,
    loading7,
    loading8,
    loading9,
    loading10,
    loading11,
  ]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleChangepg = (event) => {
    if (event.target.value == "yes") {
      setPg(true);
    } else {
      setPg(false);
    }
  };

  const handleChangeot = (event) => {
    if (event.target.value == "yes") {
      setOt(true);
    } else {
      setOt(false);
    }
  };

  const handleChangepf = (event) => {
    if (event.target.value == "yes") {
      setPf(true);
    } else {
      setPf(false);
    }
  };

  const downloadImage = (filename, docName) => {
    let contentType = "image/png";
    axios
      .get(BACKEND_URL + "/files/get/" + filename, {
        responseType: "blob",
      })
      .then((response) => {
        //console.log(response)
        const file = new Blob([response.data], { type: contentType });
        const fileURL = URL.createObjectURL(file);
        saveAs(fileURL, docName + ".png");
      });
  };

  //console.log(docs)

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
          <Grid container spacing={2} style={{ justifyContent: "center" }}>
          <Box mt={1} mb={2}>
              {renderText({ label: "Document No. 1-9: PDF & Document 10-11: PNG" })}
            </Box>
          </Grid>
        </Paper>

        <TableContainer component={Paper}>
          <Table>
            <TableHead />
            <TableBody>
              <TableRow>
                <TableCell>
                  <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label">
                      Do you have Post Graduate Documents?
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                      defaultValue={"yes"}
                    >
                      <FormControlLabel
                        value="yes"
                        control={<Radio onChange={handleChangepg} />}
                        label="Yes"
                        align
                      />
                      <FormControlLabel
                        value="no"
                        control={<Radio onChange={handleChangepg} />}
                        label="No"
                      />
                    </RadioGroup>
                  </FormControl>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label">
                      Do you have Other Courses Documents?
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                      defaultValue={"yes"}
                    >
                      <FormControlLabel
                        value="yes"
                        control={<Radio onChange={handleChangeot} />}
                        label="Yes"
                        align
                      />
                      <FormControlLabel
                        value="no"
                        control={<Radio onChange={handleChangeot} />}
                        label="No"
                      />
                    </RadioGroup>
                  </FormControl>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label">
                      Do you have Professional Experience Documents?
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                      defaultValue={"yes"}
                    >
                      <FormControlLabel
                        value="yes"
                        control={<Radio onChange={handleChangepf} />}
                        label="Yes"
                      />
                      <FormControlLabel
                        value="no"
                        control={<Radio onChange={handleChangepf} />}
                        label="No"
                      />
                    </RadioGroup>
                  </FormControl>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Sr. No.</TableCell>
                <TableCell>Document Name</TableCell>
                <TableCell>Choose File</TableCell>
                <TableCell>Upload</TableCell>
                <TableCell>View</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.keys(docs).map((row, i) => {
                //console.log(location.state.student_data.modifications)
                return (
                  <>
                    <TableRow>
                      <TableCell>{i + 1}</TableCell>
                      <TableCell>
                        {docs[row]["name"]}
                        {i != 3 && i != 5 && i != 6 && (
                          <Typography color="red">Mandatory</Typography>
                        )}

                        {i == 3 && pg && (
                          <Typography color="red">Mandatory</Typography>
                        )}

                        {i == 5 && pf && (
                          <Typography color="red">Mandatory</Typography>
                        )}

                        {i == 6 && ot && (
                          <Typography color="red">Mandatory</Typography>
                        )}
                      </TableCell>
                      
                      <TableCell>
                      {
                        i == 0 && ((location.state.student_data.modifications.includes("sscEq") || location.state.student_data.applicationFilled == false) ? (
                            <input
                              type="file"
                              onChange={(event) => fileUpload(event, i)}
                              style={{ color: "transparent" }}
                            />
                        ) : (
                            <Typography>Document Submitted</Typography>
                        )
              )}

{
                        i == 1 && ((location.state.student_data.modifications.includes("hscEq") || location.state.student_data.applicationFilled == false) ? (
                            <input
                              type="file"
                              onChange={(event) => fileUpload(event, i)}
                              style={{ color: "transparent" }}
                            />
                        ) : (
                            <Typography>Document Submitted</Typography>
                        )
              )}


              {i == 2 && ((location.state.student_data.modifications.includes("grad") || location.state.student_data.applicationFilled == false) ? (
                            <input
                              type="file"
                              onChange={(event) => fileUpload(event, i)}
                              style={{ color: "transparent" }}
                            />
                        ) : (
                            <Typography>Document Submitted</Typography>
                        )
              )}

{i == 3 && ((location.state.student_data.modifications.includes("postGrad") || location.state.student_data.applicationFilled == false) ? (
                            <input
                              type="file"
                              onChange={(event) => fileUpload(event, i)}
                              style={{ color: "transparent" }}
                            />
                        ) : (
                            <Typography>Document Submitted</Typography>
                        )
              )}

{i == 5 && ((location.state.student_data.modifications.includes("profExp") || location.state.student_data.applicationFilled == false) ? (
                            <input
                              type="file"
                              onChange={(event) => fileUpload(event, i)}
                              style={{ color: "transparent" }}
                            />
                        ) : (
                            <Typography>Document Submitted</Typography>
                        )
              )}

{i == 6 && ((location.state.student_data.modifications.includes("otCourses") || location.state.student_data.applicationFilled == false) ? (
                            <input
                              type="file"
                              onChange={(event) => fileUpload(event, i)}
                              style={{ color: "transparent" }}
                            />
                        ) : (
                            <Typography>Document Submitted</Typography>
                        )
              )}

              {

                [0, 1,  2, 3, 5, 6].includes(i) == false && (
                  location.state.student_data.applicationFilled == false ? (
                    <input
                              type="file"
                              onChange={(event) => fileUpload(event, i)}
                              style={{ color: "transparent" }}
                            />
                  ) : (
                    <Typography>Document Submitted</Typography>
                  )
                )

              }
                      </TableCell>


                        <TableCell>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              flexWrap: "wrap",
                            }}
                          >
                            <div 
                              style={{ cursor: "pointer",
                                       display: "flex",
                                       alignItems: "center", }}
                              onClick={() => fileSubmit(i)}>
                              <CloudUpload />
                              <span>Upload</span>
                            </div>
                          </div>
                        </TableCell>
                      {/* )} */}

                      {docs[row]["filename"] && i != 9 && i != 10 && (
                        <TableCell>
                          <DocViewer
                            filename={docs[row]["filename"]}
                            contentType="application/pdf"
                          />
                        </TableCell>
                      )}
                      {docs[row]["filename"] && (i == 9 || i == 10) && (
                        <TableCell>
                          <Button
                            onClick={() => {
                              downloadImage(
                                docs[row]["filename"],
                                docs[row]["dbName"]
                              );
                            }}
                          >
                            Click to View
                          </Button>
                        </TableCell>
                      )}
                      {!docs[row]["filename"] && <TableCell>No file</TableCell>}
                      {i == 0 && loading1 && (
                        <TableCell>
                          <CircularProgress />
                          {docs[row]["status"]}
                        </TableCell>
                      )}
                      {i == 0 && !loading1 && (
                        <TableCell>{docs[row]["status"]}</TableCell>
                      )}

                      {i == 1 && loading2 && (
                        <TableCell>
                          <CircularProgress />
                          {docs[row]["status"]}
                        </TableCell>
                      )}
                      {i == 1 && !loading2 && (
                        <TableCell>{docs[row]["status"]}</TableCell>
                      )}

                      {i == 2 && loading3 && (
                        <TableCell>
                          <CircularProgress />
                          {docs[row]["status"]}
                        </TableCell>
                      )}
                      {i == 2 && !loading3 && (
                        <TableCell>{docs[row]["status"]}</TableCell>
                      )}

                      {i == 3 && loading4 && (
                        <TableCell>
                          <CircularProgress />
                          {docs[row]["status"]}
                        </TableCell>
                      )}
                      {i == 3 && !loading4 && (
                        <TableCell>{docs[row]["status"]}</TableCell>
                      )}

                      {i == 4 && loading5 && (
                        <TableCell>
                          <CircularProgress />
                          {docs[row]["status"]}
                        </TableCell>
                      )}
                      {i == 4 && !loading5 && (
                        <TableCell>{docs[row]["status"]}</TableCell>
                      )}

                      {i == 5 && loading6 && (
                        <TableCell>
                          <CircularProgress />
                          {docs[row]["status"]}
                        </TableCell>
                      )}
                      {i == 5 && !loading6 && (
                        <TableCell>{docs[row]["status"]}</TableCell>
                      )}

                      {i == 6 && loading7 && (
                        <TableCell>
                          <CircularProgress />
                          {docs[row]["status"]}
                        </TableCell>
                      )}
                      {i == 6 && !loading7 && (
                        <TableCell>{docs[row]["status"]}</TableCell>
                      )}

                      {i == 7 && loading8 && (
                        <TableCell>
                          <CircularProgress />
                          {docs[row]["status"]}
                        </TableCell>
                      )}
                      {i == 7 && !loading8 && (
                        <TableCell>{docs[row]["status"]}</TableCell>
                      )}
                      {i == 8 && loading9 && (
                        <TableCell>
                          <CircularProgress />
                          {docs[row]["status"]}
                        </TableCell>
                      )}
                      {i == 8 && !loading9 && (
                        <TableCell>{docs[row]["status"]}</TableCell>
                      )}
                      {i == 9 && loading10 && (
                        <TableCell>
                          <CircularProgress />
                          {docs[row]["status"]}
                        </TableCell>
                      )}
                      {i == 9 && !loading10 && (
                        <TableCell>{docs[row]["status"]}</TableCell>
                      )}

{i == 10 && loading11 && (
                        <TableCell>
                          <CircularProgress />
                          {docs[row]["status"]}
                        </TableCell>
                      )}
                      {i == 10 && !loading11 && (
                        <TableCell>{docs[row]["status"]}</TableCell>
                      )}
                    </TableRow>
                  </>
                );
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
        <Box sx={{height:"70px"}} />
      </Box>
      <AppBar position="fixed"  sx={{ top: 'auto', bottom: 0, backgroundColor:"#00ABE4", height:"7%" }}>
        <Toolbar>
        <Box sx={{ flexGrow: 0.4 }} />
        <IconButton color="inherit">
            <ArrowForwardIosIcon/>
          </IconButton>
          <Typography color="inherit">
            <a href="https://www.coep.org.in/content/postgraduatediplomaprogram" target="_blank" rel="noopener noreferrer">
          https://www.coep.org.in/content/postgraduatediplomaprogram
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

Documents.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Documents;
