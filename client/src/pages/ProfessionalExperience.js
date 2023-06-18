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
import CallIcon from '@mui/icons-material/Call';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
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
import { nanoid } from "nanoid";
import data from "../components/steps/data.json"
import ReadOnlyRowExp from "../components/ReadOnlyRowExp";
import { CloudUpload } from "@material-ui/icons";
import { Fragment  } from "react";

import HomeIcon from '@mui/icons-material/Home';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import EditIcon from '@mui/icons-material/Edit';
import DownloadIcon from '@mui/icons-material/Download';
import LogoutIcon from '@mui/icons-material/Logout';

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

function ProfessionalExperience() {
  const location = useLocation();
  const navigate = useNavigate();
  const { window } = location.state;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [personalData, setPersonalData] = React.useState([]);
  const [stateVar, setStateVar] = React.useState({
    data: {
      professionalExperience: [],
    },
    errors: {},
  });

  const [contacts, setContacts] = React.useState(data);
	const [editContactId, setEditContactId] = React.useState(null);
	const [editFormData, setEditFormData] = React.useState({
		companyName: "",
		rankDesignation: "",
		periodFrom: "",
		periodFrom: "",
		workNature: "",
	});

    const [addFormData, setAddFormData] = React.useState({
		companyName: "",
		rankDesignation: "",
		periodFrom: "",
		periodFrom: "",
		workNature: "",
	});

    const professionalExperienceChange = (value) => {
        // console.log(contacts)
    }

    const handleAddFormSubmitDisabled = (event) => {
      //
    }

    const handleAddFormSubmit = (event) => {
		event.preventDefault();
		// console.log("run");
		// companyName: ""
		// rankDesignation: ""
		// periodFrom: ""
		// periodFrom: ""
		// workNature: ""

		const newContact = {
			id: nanoid(),
			companyName: addFormData.companyName,
			rankDesignation: addFormData.rankDesignation,
			periodFrom: addFormData.periodFrom,
			periodTo: addFormData.periodTo,
			workNature: addFormData.workNature,
		};
// console.log(newContact.companyName);
		const newContacts = [...contacts, newContact];
		setContacts(newContacts);
    var getValue1= document.getElementById("t1");
      getValue1.value = "";
      var getValue2= document.getElementById("t2");
      getValue2.value = "";
      var getValue3= document.getElementById("t3");
      getValue3.value = "";
      var getValue4= document.getElementById("t4");
      getValue4.value = "";
      var getValue5= document.getElementById("t5");
      getValue5.value = "";
		professionalExperienceChange(newContacts)
	};
	const handleDeleteClick = (contactId) => {
		const newContacts = [...contacts];

		const index = contacts.findIndex((contact) => contact.id === contactId);

		newContacts.splice(index, 1);

		setContacts(newContacts);
		professionalExperienceChange(newContacts)
	};

  const handleDeleteClickDisabled = (contactId) => {
    //
  }

	const handleEditClick = (event, contact) => {
		event.preventDefault();
		setEditContactId(contact.id);

		const formValues = {
			companyName: contact.companyName,
			rankDesignation: contact.rankDesignation,
			periodFrom: contact.periodFrom,
			periodTo: contact.periodTo,
			workNature: contact.workNature,
		};

		setEditFormData(formValues);
	};
	const handleAddFormChange = (event) => {
		event.preventDefault();

		const fieldName = event.target.getAttribute("name");
		const fieldValue = event.target.value;

		const newFormData = { ...addFormData };
		newFormData[fieldName] = fieldValue;

		setAddFormData(newFormData);
	};



React.useEffect(() => {
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
          setPersonalData(res.data.user);
        });
    }
  }
}, []);

React.useEffect(() => {
  if ("professionalExperience" in personalData) {
    if (personalData.professionalExperience.length > 0) {
        setContacts(personalData.professionalExperience)
    }
  }
}, [personalData]);

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

const container =
  window !== undefined ? () => window().document.body : undefined;


  const handleSave = () => {
    let { data, errors} = stateVar;
    data = {...data, professionalExperience : contacts}
    const url = BACKEND_URL + "/student/editStudentInfo"
    const body = {
        personalInfo: personalData.personalInfo,
        academicsInfo: personalData.academicsInfo,
        professionalExperience: data.professionalExperience,
        feesDetails: personalData.feesDetails,
        id : personalData._id,
        message: "Professional Experience Completed"
    }

    axios
        .post(url, body, { 
            headers: {
                "pgderp-website-jwt": localStorage.getItem("pgderp-website-jwt"),
              },
        })
        .then((res) => {
            alert(res.data.message)
            navigate("/student/fees", {
              state: {
                student_data: location.state.student_data,
                options: location.state.options,
              },
            })
        })

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
            {renderText({ label: "Professional Experience Details" })}
          </Box>
        </Grid>
        <TableContainer component={Paper} style={{marginBottom : "20px"}}>

        <TableHead>
					<TableRow>
						<TableCell>Company Name</TableCell>
						<TableCell>Designation or Rank</TableCell>
						<TableCell>From</TableCell>
						<TableCell>To</TableCell>
						<TableCell>Nature of Work</TableCell>

						<TableCell>Actions</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
          {personalData && personalData["applicationFilled"] && !personalData["modifications"].includes("professionalExperience") && (
            contacts.map((contact) => (
              <Fragment>
                <ReadOnlyRowExp
                  contact={contact}
                  handleEditClick={handleEditClick}
                  handleDeleteClick={handleDeleteClickDisabled}
                />
              </Fragment>
            ))
          )}
          {personalData && (personalData["applicationFilled"]==false || (personalData["professionalExperienceFilled"] == false && personalData["modifications"].includes("professionalExperience"))) &&  (
            contacts.map((contact) => (
              <Fragment>
                <ReadOnlyRowExp
                  contact={contact}
                  handleEditClick={handleEditClick}
                  handleDeleteClick={handleDeleteClick}
                />
              </Fragment>
            ))
          )}
				</TableBody>
                </TableContainer>
			<form
      style={{
        display: "flex",
        flexDirection: "row",
        overflow: "scroll",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px"
      }}
    >
				<TextField
					label="Name of the company"
					// color={color ? color : "primary"}
					variant="outlined"
					name="companyName"
					// fullWidth={true}
					size="small"
					onChange={handleAddFormChange}
					style={{ margin: "1px" }}
          id = "t1"
				/>
				<TextField
					label="Designation and Rank"
					// color={color ? color : "primary"}
					variant="outlined"
					name="rankDesignation"
					// fullWidth={true}
					size="small"
					style={{ margin: "1px" }}
					onChange={handleAddFormChange}
          id = "t2"
				/>

				<TextField
					label="Period From"
					// color={color ? color : "primary"}
					variant="outlined"
					name="periodFrom"
					// fullWidth={true}
					size="small"
					style={{ margin: "1px" }}
					onChange={handleAddFormChange}
          id = "t3"
				/>
				<TextField
					label="Period To"
					// color={color ? color : "primary"}
					variant="outlined"
					name="periodTo"
					// fullWidth={true}
					size="small"
					style={{ margin: "1px" }}
					onChange={handleAddFormChange}
          id = "t4"
				/>
				<TextField
					label="Nature of Work"
					// color={color ? color : "primary"}
					variant="outlined"
					name="workNature"
					// fullWidth={true}
					size="small"
					style={{ margin: "1px" }}
					onChange={handleAddFormChange}
          id = "t5"
				/>
				{/* <input
          type="text"
          name="address"
          required="required"
          placeholder="Enter an addres..."
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="phoneNumber"
          required="required"
          placeholder="Enter a phone number..."
          onChange={handleAddFormChange}
        />
        <input
          type="email"
          name="email"
          required="required"
          placeholder="Enter an email..."
          onChange={handleAddFormChange}
        /> */}

        {
          personalData && personalData["applicationFilled"] && personalData["modifications"].includes("professionalExperience") == false && (
            renderButton({
              label: "Add",
              handleOnClick: handleAddFormSubmitDisabled,
            })
          )
        }

{
          personalData && (personalData["applicationFilled"]==false || (personalData["professionalExperienceFilled"] == false && personalData["modifications"].includes("professionalExperience"))) && (
            renderButton({
              label: "Add",
              handleOnClick: handleAddFormSubmit,
            })
          )
        }

			</form>
        
      </Paper>

      <Button
          variant="contained"
          onClick={() => handleSave()}
          color="success"
          style={{ margin: "0 auto", display: "flex", marginTop: "3%" }}
        >
          SAVE & GO TO NEXT
        </Button>
        <Box sx={{height:"70px"}} />
    </Box>
    <AppBar position="fixed"  sx={{ top: 'auto', bottom: 0, backgroundColor:"#00ABE4", height:"7%" }}>
        <Toolbar>
        <Box sx={{ flexGrow: 0.4 }} />
        <IconButton color="inherit">
            <ArrowForwardIosIcon />
          </IconButton>
          <Typography color="inherit">
          http://www.coep.org.in/
          </Typography>
          <Box sx={{ flexGrow: 0.2 }} />
          <IconButton color="inherit">
            <MailIcon />
          </IconButton>
          <Typography color="inherit">
          pgdadmission@coeptech.ac.in
          </Typography>
          <Box sx={{ flexGrow: 0.2 }} />
          <IconButton color="inherit">
            <CallIcon />
          </IconButton>
          <Typography color="inherit">
          9876543210
          </Typography>
        </Toolbar>
      </AppBar>
  </Box>
);
}

ProfessionalExperience.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ProfessionalExperience;
