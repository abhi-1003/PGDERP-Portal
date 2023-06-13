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
import { Fragment } from "react";
import { useLocation } from "react-router-dom";
import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableContainer,
  TextField
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
  renderInputTextDisabled
} from "../components/common/displayComponents";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { BACKEND_URL } from "../config";
import axios from "axios";
import Button from "@mui/material/Button";
import e from "cors";
import dataa from "../components/steps/data.json";
import ReadOnlyRow from "../components/ReadOnlyRow";
import { nanoid } from "nanoid";

const drawerWidth = 280;

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#01257D",
    color: theme.palette.common.white
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#FFFFFF"
  },
  "&:nth-of-type(even)": {
    backgroundColor: "#FFFFFF"
  }
  // hide last border
  // '&:last-child td, &:last-child th': {
  //   border: 0,
  // },
}));

function AcademicsInfo() {
  const location = useLocation();
  const navigate = useNavigate();
  const { window } = location.state;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [personalData, setPersonalData] = React.useState([]);
  const [validate1, setValidate1] = React.useState(false);
  const [validate2, setValidate2] = React.useState(false);
  const [validate3, setValidate3] = React.useState(false);

  const [contacts, setContacts] = React.useState(dataa);
  const [addFormData, setAddFormData] = React.useState({
    courseName: "",
    uniName: "",
    specialization: "",
    periodFrom: "",
    periodTo: "",
    grade: ""
  });
  const [otherCoursesError, setOtherCoursesError] = React.useState("");
  const [stateVar, setStateVar] = React.useState({
    data: {
      InstituteSSC: "",
      InstituteHSC: "",
      SSCTo: [],
      HSCTo: [],
      SSCFrom: [],
      HSCFrom: [],
      SSCmarks: "",
      HSCmarks: "",
      InstituteDiploma: "",
      DiplomaTo: [],
      DiplomaFrom: [],
      Diplomamarks: "",
      InstituteGrad: "",
      SpecializationGrad: "",
      GradFrom: [],
      GradTo: [],
      FinalYearMarksGrad: "",
      AggregateMarksGrad: "",
      DeadBacklogsGrad: "0",
      AliveBacklogGrad: "0",
      InstitutePostGrad: "",
      SpecializationPostGrad: "",
      PostGradFrom: [],
      PostGradTo: [],
      FinalYearMarksPostGrad: "",
      AggregateMarksPostGrad: "",
      DeadBacklogsPostGrad: "0",
      AliveBacklogPostGrad: "0",
      DiplomaFilled: false,
      DropToGrad: 0,
      GradPeriod: 0,
      GradtoPostGrad: 0,
      HSCFilled: 0,
      HSCtoDiploma: 0,
      SSCtoDiploma: 0,
      SSCtoHSC: 0,
      otherCourses: [],
      TotalGapsSchool: 0
    },
    errors: {}
  });

  React.useEffect(() => {
    if (location.state) {
      if (location.state.student_data._id) {
        let body = { id: location.state.student_data._id };
        let url = BACKEND_URL + "/student/me";
        axios
          .post(url, body, {
            headers: {
              "pgderp-website-jwt": localStorage.getItem("pgderp-website-jwt")
            }
          })
          .then(res => {
            setPersonalData(res.data.user);
          });
      }
    }
  }, []);

  const otherCoursesChange = () => {
    setValidate3(false);
  };

  React.useEffect(() => {
    let copyErrors = { ...stateVar.errors };
    let copyData = { ...stateVar.data };
    if ("academicsInfo" in personalData) {
      if ("DiplomaFilled" in personalData.academicsInfo) {
        copyData = {
          ...copyData,
          DiplomaFilled: personalData.academicsInfo.DiplomaFilled
        };
      }
      if ("DroptoGrad" in personalData.academicsInfo) {
        copyData = {
          ...copyData,
          DroptoGrad: personalData.academicsInfo.DroptoGrad
        };
      }
      if ("GradPeriod" in personalData.academicsInfo) {
        copyData = {
          ...copyData,
          GradPeriod: personalData.academicsInfo.GradPeriod
        };
      }
      if ("GradtoPostGrad" in personalData.academicsInfo) {
        copyData = {
          ...copyData,
          GradtoPostGrad: personalData.academicsInfo.GradtoPostGrad
        };
      }
      if ("HSCFilled" in personalData.academicsInfo) {
        copyData = {
          ...copyData,
          HSCFilled: personalData.academicsInfo.HSCFilled
        };
      }
      if ("HSCtoDiploma" in personalData.academicsInfo) {
        copyData = {
          ...copyData,
          HSCtoDiploma: personalData.academicsInfo.HSCtoDiploma
        };
      }
      if ("SSCtoDiploma" in personalData.academicsInfo) {
        copyData = {
          ...copyData,
          SSCtoDiploma: personalData.academicsInfo.SSCtoDiploma
        };
      }
      if ("SSCtoHSC" in personalData.academicsInfo) {
        copyData = {
          ...copyData,
          SSCtoHSC: personalData.academicsInfo.SSCtoHSC
        };
      }
      if ("TotalGapsSchool" in personalData.academicsInfo) {
        copyData = {
          ...copyData,
          TotalGapsSchool: personalData.academicsInfo.TotalGapsSchool
        };
      }
      if (
        "InstituteSSC" in personalData.academicsInfo &&
        personalData.academicsInfo.InstituteSSC
      ) {
        copyData = {
          ...copyData,
          InstituteSSC: personalData.academicsInfo.InstituteSSC
        };
      }
      if (
        "InstituteHSC" in personalData.academicsInfo &&
        personalData.academicsInfo.InstituteHSC
      ) {
        copyData = {
          ...copyData,
          InstituteHSC: personalData.academicsInfo.InstituteHSC
        };
      }
      if (
        "SSCFrom" in personalData.academicsInfo &&
        personalData.academicsInfo.SSCFrom
      ) {
        copyData = {
          ...copyData,
          SSCFrom: personalData.academicsInfo.SSCFrom
        };
      }
      if (
        "HSCFrom" in personalData.academicsInfo &&
        personalData.academicsInfo.HSCFrom
      ) {
        copyData = {
          ...copyData,
          HSCFrom: personalData.academicsInfo.HSCFrom
        };
      }
      if (
        "SSCTo" in personalData.academicsInfo &&
        personalData.academicsInfo.SSCTo
      ) {
        copyData = {
          ...copyData,
          SSCTo: personalData.academicsInfo.SSCTo
        };
      }
      if (
        "HSCTo" in personalData.academicsInfo &&
        personalData.academicsInfo.HSCTo
      ) {
        copyData = {
          ...copyData,
          HSCTo: personalData.academicsInfo.HSCTo
        };
      }
      if (
        "SSCmarks" in personalData.academicsInfo &&
        personalData.academicsInfo.SSCmarks
      ) {
        copyData = {
          ...copyData,
          SSCmarks: personalData.academicsInfo.SSCmarks
        };
      }
      if (
        "HSCmarks" in personalData.academicsInfo &&
        personalData.academicsInfo.HSCmarks
      ) {
        copyData = {
          ...copyData,
          HSCmarks: personalData.academicsInfo.HSCmarks
        };
      }
      if (
        "InstituteDiploma" in personalData.academicsInfo &&
        personalData.academicsInfo.InstituteDiploma
      ) {
        copyData = {
          ...copyData,
          InstituteDiploma: personalData.academicsInfo.InstituteDiploma
        };
      }
      if (
        "DiplomaFrom" in personalData.academicsInfo &&
        personalData.academicsInfo.DiplomaFrom
      ) {
        copyData = {
          ...copyData,
          DiplomaFrom: personalData.academicsInfo.DiplomaFrom
        };
      }
      if (
        "DiplomaTo" in personalData.academicsInfo &&
        personalData.academicsInfo.DiplomaTo
      ) {
        copyData = {
          ...copyData,
          DiplomaTo: personalData.academicsInfo.DiplomaTo
        };
      }
      if (
        "Diplomamarks" in personalData.academicsInfo &&
        personalData.academicsInfo.Diplomamarks
      ) {
        copyData = {
          ...copyData,
          Diplomamarks: personalData.academicsInfo.Diplomamarks
        };
      }
      if (
        "InstituteGrad" in personalData.academicsInfo &&
        personalData.academicsInfo.InstituteGrad
      ) {
        copyData = {
          ...copyData,
          InstituteGrad: personalData.academicsInfo.InstituteGrad
        };
      }
      if (
        "SpecializationGrad" in personalData.academicsInfo &&
        personalData.academicsInfo.SpecializationGrad
      ) {
        copyData = {
          ...copyData,
          SpecializationGrad: personalData.academicsInfo.SpecializationGrad
        };
      }
      if (
        "GradFrom" in personalData.academicsInfo &&
        personalData.academicsInfo.GradFrom
      ) {
        copyData = {
          ...copyData,
          GradFrom: personalData.academicsInfo.GradFrom
        };
      }
      if (
        "GradTo" in personalData.academicsInfo &&
        personalData.academicsInfo.GradTo
      ) {
        copyData = {
          ...copyData,
          GradTo: personalData.academicsInfo.GradTo
        };
      }
      if (
        "FinalYearMarksGrad" in personalData.academicsInfo &&
        personalData.academicsInfo.FinalYearMarksGrad
      ) {
        copyData = {
          ...copyData,
          FinalYearMarksGrad: personalData.academicsInfo.FinalYearMarksGrad
        };
      }
      if (
        "AggregateMarksGrad" in personalData.academicsInfo &&
        personalData.academicsInfo.AggregateMarksGrad
      ) {
        copyData = {
          ...copyData,
          AggregateMarksGrad: personalData.academicsInfo.AggregateMarksGrad
        };
      }
      if (
        "DeadBacklogsGrad" in personalData.academicsInfo &&
        personalData.academicsInfo.DeadBacklogsGrad
      ) {
        copyData = {
          ...copyData,
          DeadBacklogsGrad: personalData.academicsInfo.DeadBacklogsGrad
        };
      }
      if (
        "AliveBacklogGrad" in personalData.academicsInfo &&
        personalData.academicsInfo.AliveBacklogGrad
      ) {
        copyData = {
          ...copyData,
          AliveBacklogGrad: personalData.academicsInfo.AliveBacklogGrad
        };
      }
      if (
        "InstitutePostGrad" in personalData.academicsInfo &&
        personalData.academicsInfo.InstitutePostGrad
      ) {
        copyData = {
          ...copyData,
          InstitutePostGrad: personalData.academicsInfo.InstitutePostGrad
        };
      }
      if (
        "SpecializationPostGrad" in personalData.academicsInfo &&
        personalData.academicsInfo.SpecializationPostGrad
      ) {
        copyData = {
          ...copyData,
          SpecializationPostGrad:
            personalData.academicsInfo.SpecializationPostGrad
        };
      }
      if (
        "PostGradFrom" in personalData.academicsInfo &&
        personalData.academicsInfo.PostGradFrom
      ) {
        copyData = {
          ...copyData,
          PostGradFrom: personalData.academicsInfo.PostGradFrom
        };
      }
      if (
        "PostGradTo" in personalData.academicsInfo &&
        personalData.academicsInfo.PostGradTo
      ) {
        copyData = {
          ...copyData,
          PostGradTo: personalData.academicsInfo.PostGradTo
        };
      }
      if (
        "FinalYearMarksPostGrad" in personalData.academicsInfo &&
        personalData.academicsInfo.FinalYearMarksPostGrad
      ) {
        copyData = {
          ...copyData,
          FinalYearMarksPostGrad:
            personalData.academicsInfo.FinalYearMarksPostGrad
        };
      }
      if (
        "AggregateMarksPostGrad" in personalData.academicsInfo &&
        personalData.academicsInfo.AggregateMarksPostGrad
      ) {
        copyData = {
          ...copyData,
          AggregateMarksPostGrad:
            personalData.academicsInfo.AggregateMarksPostGrad
        };
      }
      if (
        "DeadBacklogsPostGrad" in personalData.academicsInfo &&
        personalData.academicsInfo.DeadBacklogsPostGrad
      ) {
        copyData = {
          ...copyData,
          DeadBacklogsPostGrad: personalData.academicsInfo.DeadBacklogsPostGrad
        };
      }
      if (
        "AliveBacklogPostGrad" in personalData.academicsInfo &&
        personalData.academicsInfo.AliveBacklogPostGrad
      ) {
        copyData = {
          ...copyData,
          AliveBacklogPostGrad: personalData.academicsInfo.AliveBacklogPostGrad
        };
      }
      if (
        "otherCourses" in personalData.academicsInfo &&
        personalData.academicsInfo.otherCourses
      ) {
        copyData = {
          ...copyData,
          otherCourses: personalData.academicsInfo.otherCourses
        };
      }
      if (
        "professionalExperience" in personalData.academicsInfo &&
        personalData.academicsInfo.professionalExperience
      ) {
        copyData = {
          ...copyData,
          professionalExperience:
            personalData.academicsInfo.professionalExperience
        };
      }
      if (
        "otherCourses" in personalData.academicsInfo &&
        personalData.academicsInfo.otherCourses.length > 0
      ) {
        setContacts(personalData.academicsInfo.otherCourses);
      }
    }
    setStateVar({ data: copyData, errors: copyErrors });
  }, [personalData]);

  console.log(personalData);

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
                      options: location.state.options
                    }
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

  const handleOnChange = ({ target }) => {
    let errors = { ...stateVar.errors };
    let data = { ...stateVar.data };
    data[target.name] = target.value;
    setStateVar({ data: data, errors: errors });
  };

  const today = dayjs();

  const handleOnChangeDate = (name, value) => {
    let { data, errors } = stateVar;
    data[name] = [value.$D, value.$M + 1, value.$y];
    setStateVar({ data: data, errors: errors });
  };

  const handleDeleteClick = contactId => {
    const newContacts = [...contacts];

    const index = contacts.findIndex(contact => contact.id === contactId);

    newContacts.splice(index, 1);
    setAddFormData(newContacts);
    setContacts(newContacts);
    // state.professionalExperienceChange(newContacts)
  };

  const handleAddFormSubmit = event => {
    event.preventDefault();
    if (
      addFormData.periodFrom.length == 4 &&
      addFormData.periodTo.length == 4
    ) {
      setOtherCoursesError("");
      const newContact = {
        id: nanoid(),
        courseName: addFormData.courseName,
        uniName: addFormData.uniName,
        specialization: addFormData.specialization,
        periodFrom: addFormData.periodFrom,
        periodTo: addFormData.periodTo,
        grade: addFormData.grade
      };

      const newContacts = [...contacts, newContact];
      setContacts(newContacts);
      otherCoursesChange();
    } else {
      setOtherCoursesError("Please enter a valid year");
    }

    // console.log(newContacts);
  };

  const handleAddFormChange = event => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleSave1 = () => {
    const { data, errors } = stateVar;
    if (data.InstituteSSC === "") {
      errors["InstituteSSC"] = "Field cannot be empty";
    } else {
      errors["InstituteSSC"] = "";
    }

    if (data.SSCFrom === [] || data.SSCFrom.length != 3) {
      errors["SSCFrom"] = "Please enter Date";
    } else {
      errors["SSCFrom"] = "";
    }

    if (data.SSCTo === [] || data.SSCTo.length != 3) {
      errors["SSCTo"] = "Please enter Date";
    } else {
      errors["SSCTo"] = "";
    }

    if (data.SSCmarks === "") {
      errors["SSCmarks"] = "Field cannot be empty";
    } else {
      if (Number(data.SSCmarks) > 100 || Number(data.SSCmarks) < 0) {
        errors["SSCmarks"] = "Enter marks less than 100 and greater than 0";
      } else {
        errors["SSCmarks"] = "";
      }
    }

    if (data.InstituteHSC !== "") {
      if (data.HSCFrom === [] || data.HSCFrom.length != 3) {
        errors["HSCFrom"] = "Please enter Date";
      } else {
        errors["HSCFrom"] = "";
      }

      if (data.HSCTo === [] || data.HSCTo.length != 3) {
        errors["HSCTo"] = "Please enter Date";
      } else {
        errors["HSCTo"] = "";
      }

      if (data.HSCmarks === "") {
        errors["HSCmarks"] = "Field cannot be empty";
      } else {
        if (Number(data.HSCmarks) > 100 || Number(data.HSCmarks) < 0) {
          errors["HSCmarks"] = "Enter marks less than 100 and greater than 0";
        } else {
          errors["HSCmarks"] = "";
        }
      }

      if (
        errors["HSCFrom"] === "" &&
        errors["HSCTo"] === "" &&
        errors["HSCmarks"] === ""
      ) {
        data["HSCFilled"] = true;
      }
    } else {
      errors["HSCFrom"] = "";
      errors["HSCTo"] = "";
      errors["HSCmarks"] = "";
      data["HSCFrom"] = [];
      data["HSCTo"] = [];
      data["HSCmarks"] = "";
      data["HSCFilled"] = false;
    }

    if (data.InstituteDiploma !== "") {
      if (data.DiplomaFrom === [] || data.DiplomaFrom.length != 3) {
        errors["DiplomaFrom"] = "Please enter Date";
      } else {
        errors["DiplomaFrom"] = "";
      }

      if (data.DiplomaTo === [] || data.DiplomaTo.length != 3) {
        errors["DiplomaTo"] = "Please enter Date";
      } else {
        errors["DiplomaTo"] = "";
      }

      if (data.Diplomamarks === "") {
        errors["Diplomamarks"] = "Field cannot be empty";
      } else {
        if (Number(data.Diplomamarks) > 100 || Number(data.Diplomamarks) < 0) {
          errors["Diplomamarks"] =
            "Enter marks less than 100 and greater than 0";
        } else {
          errors["Diplomamarks"] = "";
        }
      }

      if (
        errors["DiplomaFrom"] === "" &&
        errors["DiplomaTo"] === "" &&
        errors["Diplomamarks"] === ""
      ) {
        data["DiplomaFilled"] = true;
      }
    } else {
      errors["DiplomaFrom"] = "";
      errors["DiplomaTo"] = "";
      errors["Diplomamarks"] = "";
      data["DiplomaFrom"] = [];
      data["DiplomaTo"] = [];
      data["Diplomamarks"] = "";
      data["DiplomaFilled"] = false;
    }

    setStateVar({ data: data, errors: errors });

    let validate = true;

    Object.keys(errors).map(error => {
      if (errors[error] !== "") {
        validate = false;
      }
    });

    if (validate) {
      const { data, errors } = stateVar;
      if (data.SSCTo.length === 3 && data.HSCFrom.length === 3) {
        data.SSCtoHSC = data.HSCFrom[2] - data.SSCTo[2];
      } else {
        data.SSCtoHSC = 0;
      }

      if (data.SSCTo.length === 3 && data.DiplomaFrom.length === 3) {
        data.SSCtoDiploma = data.DiplomaFrom[2] - data.SSCTo[2];
      } else {
        data.SSCtoDiploma = 0;
      }
      if (data.HSCTo.length === 3 && data.DiplomaFrom.length === 3) {
        data.HSCtoDiploma = data.DiplomaFrom[2] - data.HSCTo[2];
      } else {
        data.HSCtoDiploma = 0;
      }

      let a = data.SSCtoHSC;
      let b = data.SSCtoDiploma;
      let c = data.HSCtoDiploma;

      if (data.HSCTo.length === 3 && data.DiplomaTo.length === 3) {
        data.TotalGapsSchool = a + c;
      } else if (data.HSCTo.length === 3) {
        data.TotalGapsSchool = a;
      } else if (data.DiplomaTo.length === 3) {
        data.TotalGapsSchool = b;
      }
      setStateVar({ data: data, errors: errors });
      alert("SSC, HSC and Diploma Academics Details");
    }

    setValidate1(validate);
  };

  const handleSave2 = () => {
    const { data, errors } = stateVar;
    if (data.InstituteGrad === "") {
      errors["InstituteGrad"] = "Field cannot be empty";
    } else {
      errors["InstituteGrad"] = "";
    }

    if (data.SpecializationGrad === "") {
      errors["SpecializationGrad"] = "Field cannot be empty";
    } else {
      errors["SpecializationGrad"] = "";
    }

    if (data.GradFrom === [] || data.GradFrom.length != 3) {
      errors["GradFrom"] = "Please enter Date";
    } else {
      errors["GradFrom"] = "";
    }

    if (data.GradTo === [] || data.GradTo.length != 3) {
      errors["GradTo"] = "Please enter Date";
    } else {
      errors["GradTo"] = "";
    }

    if (data.FinalYearMarksGrad === "") {
      errors["FinalYearMarksGrad"] = "Field cannot be empty";
    } else {
      if (
        Number(data.FinalYearMarksGrad) > 100 ||
        Number(data.FinalYearMarksGrad) < 0
      ) {
        errors["FinalYearMarksGrad"] =
          "Enter marks less than 100 and greater than 0";
      } else {
        errors["FinalYearMarksGrad"] = "";
      }
    }

    if (data.AggregateMarksGrad === "") {
      errors["AggregateMarksGrad"] = "Field cannot be empty";
    } else {
      if (
        Number(data.AggregateMarksGrad) > 100 ||
        Number(data.AggregateMarksGrad) < 0
      ) {
        errors["AggregateMarksGrad"] =
          "Enter marks less than 100 and greater than 0";
      } else {
        errors["AggregateMarksGrad"] = "";
      }
    }

    if (data.InstitutePostGrad !== "") {
      if (data.SpecializationPostGrad === "") {
        errors["SpecializationPostGrad"] = "Field cannot be empty";
      } else {
        errors["SpecializationPostGrad"] = "";
      }

      if (data.PostGradFrom === [] || data.PostGradFrom.length != 3) {
        errors["PostGradFrom"] = "Please enter Date";
      } else {
        errors["PostGradFrom"] = "";
      }

      if (data.PostGradTo === [] || data.PostGradTo.length != 3) {
        errors["PostGradTo"] = "Please enter Date";
      } else {
        errors["PostGradTo"] = "";
      }

      if (data.FinalYearMarksPostGrad === "") {
        errors["FinalYearMarksPostGrad"] = "Field cannot be empty";
      } else {
        if (
          Number(data.FinalYearMarksPostGrad) > 100 ||
          Number(data.FinalYearMarksPostGrad) < 0
        ) {
          errors["FinalYearMarksPostGrad"] =
            "Enter marks less than 100 and greater than 0";
        } else {
          errors["FinalYearMarksPostGrad"] = "";
        }
      }

      if (data.AggregateMarksPostGrad === "") {
        errors["AggregateMarksPostGrad"] = "Field cannot be empty";
      } else {
        if (
          Number(data.AggregateMarksPostGrad) > 100 ||
          Number(data.AggregateMarksPostGrad) < 0
        ) {
          errors["AggregateMarksPostGrad"] =
            "Enter marks less than 100 and greater than 0";
        } else {
          errors["AggregateMarksPostGrad"] = "";
        }
      }
    } else {
      errors["SpecializationPostGrad"] = "";
      errors["PostGradFrom"] = "";
      errors["PostGradTo"] = "";
      errors["FinalYearMarksPostGrad"] = "";
      errors["AggregateMarksPostGrad"] = "";
      data["SpecializationPostGrad"] = "";
      data["PostGradFrom"] = [];
      data["PostGradTo"] = [];
      data["FinalYearMarksPostGrad"] = "";
      data["AggregateMarksPostGrad"] = "";
      data["DeadBacklogsPostGrad"] = "";
    }

    setStateVar({ data: data, errors: errors });

    let validate = true;

    Object.keys(errors).map(error => {
      if (errors[error] !== "") {
        validate = false;
      }
    });

    if (validate) {
      const { data, errors } = stateVar;
      data["GradPeriod"] = data.GradTo[2] - data.GradFrom[2];

      if (data["PostGradFrom"].length === 3) {
        data["GradtoPostGrad"] = data.PostGradFrom[2] - data.GradTo[2];
      }
      setStateVar({ data: data, errors: errors });
      alert("Graduation and Post-Graduation Academics Details Saved!");
    }
    setValidate2(validate);
  };

  const handleSave3 = () => {
    let { data, errors } = stateVar;
    data = { ...data, otherCourses: contacts };
    setStateVar({ data: data, errors: errors });
    setValidate3(true);
    alert("Other Courses Details Saved Successfully");
  };

  const handleSave = () => {
    console.log(validate1, validate2);

    if (validate1 && validate2 && validate3) {
      const { data, errors } = stateVar;
      let validate = true;

      Object.keys(errors).map(error => {
        if (errors[error] !== "") {
          validate = false;
        }
      });

      if (validate) {
        const academicsInfo = data;
        const url = BACKEND_URL + "/student/editStudentInfo";
        const body = {
          personalInfo: personalData.personalInfo,
          academicsInfo: academicsInfo,
          professionalExperience: personalData.professionalExperience,
          id: personalData._id,
          message: "Academics Info Completed"
        };

        axios
          .post(url, body, {
            headers: {
              "pgderp-website-jwt": localStorage.getItem("pgderp-website-jwt")
            }
          })
          .then(res => {
            alert(res.data.message);
            navigate("/student/professionalExperience", {
              state: {
                student_data: location.state.student_data,
                options: location.state.options
              }
            });
          });
      } else {
        alert("Please fill all data first");
      }
    } else {
      alert("First Save details of all sections");
    }
  };

  return (
    <Box bgcolor="#E5EDF1" sx={{ display: "flex", minHeight: "100vh" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: "#00ABE4"
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
            keepMounted: true // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth
            }
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
              width: drawerWidth
            }
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
          width: { sm: `calc(100% - ${drawerWidth}px)` }
        }}
      >
        <Toolbar />
        <Paper component={Box} p={2}>
          <Grid container spacing={2} style={{ justifyContent: "center" }}>
            <Box mt={1} mb={2}>
              {renderText({ label: "SSC, HSC and Diploma Academics Details" })}
            </Box>
          </Grid>
          <TableContainer component={Paper}>
            <Table aria-label="School and High School Educational Qualifications">
              <TableHead>
                <TableRow>
                  <TableCell>Examination</TableCell>
                  <TableCell>Name of the Institute or University</TableCell>
                  <TableCell>From (MM/DD/YYYY)</TableCell>
                  <TableCell>To (MM/DD/YYYY)</TableCell>
                  <TableCell>Percentage of Marks</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <StyledTableRow>
                  <StyledTableCell sx={{ padding: "4px" }}>SSC</StyledTableCell>

                  <StyledTableCell>
                    {renderInputText({
                      label: "",
                      name: "InstituteSSC",
                      stateVar,
                      handleOnChange: handleOnChange
                    })}
                  </StyledTableCell>

                  {/* SSC FROM */}
                  {personalData &&
                    "academicsInfo" in personalData &&
                    "SSCFrom" in personalData.academicsInfo &&
                    personalData.academicsInfo.SSCFrom.length === 3 && (
                      <StyledTableCell sx={{ padding: "4px" }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DemoContainer components={["DatePicker"]}>
                            {" "}
                            <DemoItem label="">
                              <DatePicker
                                disableFuture
                                // views={['year', 'month', 'day']}
                                name="SSCFrom"
                                defaultValue={dayjs(
                                  personalData.academicsInfo.SSCFrom[2] +
                                    "-" +
                                    personalData.academicsInfo.SSCFrom[1] +
                                    "-" +
                                    personalData.academicsInfo.SSCFrom[0]
                                )}
                                onChange={value =>
                                  handleOnChangeDate("SSCFrom", value)
                                }
                              ></DatePicker>
                              <Typography sx={{ width: "100%", color: "red" }}>
                                {stateVar["errors"]["SSCFrom"]}
                              </Typography>
                            </DemoItem>
                          </DemoContainer>
                        </LocalizationProvider>
                      </StyledTableCell>
                    )}

                  {personalData &&
                    "academicsInfo" in personalData &&
                    "SSCFrom" in personalData.academicsInfo &&
                    personalData.academicsInfo.SSCFrom.length === 0 && (
                      <StyledTableCell sx={{ padding: "4px" }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DemoContainer components={["DatePicker"]}>
                            {" "}
                            <DemoItem label="">
                              <DatePicker
                                disableFuture
                                // views={['year', 'month', 'day']}
                                name="SSCFrom"
                                onChange={value =>
                                  handleOnChangeDate("SSCFrom", value)
                                }
                              />
                              <Typography sx={{ width: "100%", color: "red" }}>
                                {stateVar["errors"]["SSCFrom"]}
                              </Typography>
                            </DemoItem>
                          </DemoContainer>
                        </LocalizationProvider>
                      </StyledTableCell>
                    )}

                  {/* SSC TO */}

                  {personalData &&
                    "academicsInfo" in personalData &&
                    "SSCTo" in personalData.academicsInfo &&
                    personalData.academicsInfo.SSCTo.length === 3 && (
                      <StyledTableCell sx={{ padding: "4px" }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DemoContainer components={["DatePicker"]}>
                            {" "}
                            <DemoItem label="">
                              <DatePicker
                                disableFuture
                                // views={['year', 'month', 'day']}
                                name="SSCTo"
                                defaultValue={dayjs(
                                  personalData.academicsInfo.SSCTo[2] +
                                    "-" +
                                    personalData.academicsInfo.SSCTo[1] +
                                    "-" +
                                    personalData.academicsInfo.SSCTo[0]
                                )}
                                onChange={value =>
                                  handleOnChangeDate("SSCTo", value)
                                }
                              ></DatePicker>
                              <Typography sx={{ width: "100%", color: "red" }}>
                                {stateVar["errors"]["SSCTo"]}
                              </Typography>
                            </DemoItem>
                          </DemoContainer>
                        </LocalizationProvider>
                      </StyledTableCell>
                    )}

                  {personalData &&
                    "academicsInfo" in personalData &&
                    "SSCTo" in personalData.academicsInfo &&
                    personalData.academicsInfo.SSCTo.length === 0 && (
                      <StyledTableCell sx={{ padding: "4px" }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DemoContainer components={["DatePicker"]}>
                            {" "}
                            <DemoItem label="">
                              <DatePicker
                                disableFuture
                                // views={['year', 'month', 'day']}
                                name="SSCTo"
                                onChange={value =>
                                  handleOnChangeDate("SSCTo", value)
                                }
                              />
                              <Typography sx={{ width: "100%", color: "red" }}>
                                {stateVar["errors"]["SSCTo"]}
                              </Typography>
                            </DemoItem>
                          </DemoContainer>
                        </LocalizationProvider>
                      </StyledTableCell>
                    )}
                  <StyledTableCell sx={{ padding: "4px" }}>
                    {renderInputText({
                      label: "",
                      name: "SSCmarks",
                      stateVar,
                      handleOnChange: handleOnChange
                    })}
                  </StyledTableCell>
                </StyledTableRow>

                <StyledTableRow>
                  <StyledTableCell sx={{ padding: "4px" }}>HSC</StyledTableCell>

                  <StyledTableCell sx={{ padding: "4px" }}>
                    {renderInputText({
                      label: "",
                      name: "InstituteHSC",
                      stateVar,
                      handleOnChange: handleOnChange
                    })}
                  </StyledTableCell>

                  {/* HSC FROM */}
                  {personalData &&
                    "academicsInfo" in personalData &&
                    "HSCFrom" in personalData.academicsInfo &&
                    personalData.academicsInfo.HSCFrom.length === 3 && (
                      <StyledTableCell sx={{ padding: "4px" }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DemoContainer components={["DatePicker"]}>
                            {" "}
                            <DemoItem label="">
                              <DatePicker
                                disableFuture
                                // views={['year', 'month', 'day']}
                                name="HSCFrom"
                                defaultValue={dayjs(
                                  personalData.academicsInfo.HSCFrom[2] +
                                    "-" +
                                    personalData.academicsInfo.HSCFrom[1] +
                                    "-" +
                                    personalData.academicsInfo.HSCFrom[0]
                                )}
                                onChange={value =>
                                  handleOnChangeDate("HSCFrom", value)
                                }
                              ></DatePicker>
                              <Typography sx={{ width: "100%", color: "red" }}>
                                {stateVar["errors"]["HSCFrom"]}
                              </Typography>
                            </DemoItem>
                          </DemoContainer>
                        </LocalizationProvider>
                      </StyledTableCell>
                    )}

                  {personalData &&
                    "academicsInfo" in personalData &&
                    "HSCFrom" in personalData.academicsInfo &&
                    personalData.academicsInfo.HSCFrom.length === 0 && (
                      <StyledTableCell sx={{ padding: "4px" }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DemoContainer components={["DatePicker"]}>
                            {" "}
                            <DemoItem label="">
                              <DatePicker
                                disableFuture
                                // views={['year', 'month', 'day']}
                                name="HSCFrom"
                                onChange={value =>
                                  handleOnChangeDate("HSCFrom", value)
                                }
                              />
                              <Typography sx={{ width: "100%", color: "red" }}>
                                {stateVar["errors"]["HSCFrom"]}
                              </Typography>
                            </DemoItem>
                          </DemoContainer>
                        </LocalizationProvider>
                      </StyledTableCell>
                    )}

                  {/* HSC TO */}

                  {personalData &&
                    "academicsInfo" in personalData &&
                    "HSCTo" in personalData.academicsInfo &&
                    personalData.academicsInfo.HSCTo.length === 3 && (
                      <StyledTableCell sx={{ padding: "4px" }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DemoContainer components={["DatePicker"]}>
                            {" "}
                            <DemoItem label="">
                              <DatePicker
                                disableFuture
                                // views={['year', 'month', 'day']}
                                name="HSCTo"
                                defaultValue={dayjs(
                                  personalData.academicsInfo.HSCTo[2] +
                                    "-" +
                                    personalData.academicsInfo.HSCTo[1] +
                                    "-" +
                                    personalData.academicsInfo.HSCTo[0]
                                )}
                                onChange={value =>
                                  handleOnChangeDate("HSCTo", value)
                                }
                              ></DatePicker>
                              <Typography sx={{ width: "100%", color: "red" }}>
                                {stateVar["errors"]["HSCTo"]}
                              </Typography>
                            </DemoItem>
                          </DemoContainer>
                        </LocalizationProvider>
                      </StyledTableCell>
                    )}

                  {personalData &&
                    "academicsInfo" in personalData &&
                    "HSCTo" in personalData.academicsInfo &&
                    personalData.academicsInfo.HSCTo.length === 0 && (
                      <StyledTableCell sx={{ padding: "4px" }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DemoContainer components={["DatePicker"]}>
                            {" "}
                            <DemoItem label="">
                              <DatePicker
                                disableFuture
                                // views={['year', 'month', 'day']}
                                name="HSCTo"
                                onChange={value =>
                                  handleOnChangeDate("HSCTo", value)
                                }
                              />
                              <Typography sx={{ width: "100%", color: "red" }}>
                                {stateVar["errors"]["HSCTo"]}
                              </Typography>
                            </DemoItem>
                          </DemoContainer>
                        </LocalizationProvider>
                      </StyledTableCell>
                    )}
                  <StyledTableCell sx={{ padding: "4px" }}>
                    {renderInputText({
                      label: "",
                      name: "HSCmarks",
                      stateVar,
                      handleOnChange: handleOnChange
                    })}
                  </StyledTableCell>
                </StyledTableRow>

                {/* DIPLOMA */}
                <StyledTableRow>
                  <StyledTableCell sx={{ padding: "4px" }}>
                    Diploma
                  </StyledTableCell>

                  <StyledTableCell>
                    {renderInputText({
                      label: "",
                      name: "InstituteDiploma",
                      stateVar,
                      handleOnChange: handleOnChange
                    })}
                  </StyledTableCell>

                  {/* DIPLOMA FROM */}
                  {personalData &&
                    "academicsInfo" in personalData &&
                    "DiplomaFrom" in personalData.academicsInfo &&
                    personalData.academicsInfo.DiplomaFrom.length === 3 && (
                      <StyledTableCell sx={{ padding: "4px" }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DemoContainer components={["DatePicker"]}>
                            {" "}
                            <DemoItem label="">
                              <DatePicker
                                disableFuture
                                // views={['year', 'month', 'day']}
                                name="DiplomaFrom"
                                defaultValue={dayjs(
                                  personalData.academicsInfo.DiplomaFrom[2] +
                                    "-" +
                                    personalData.academicsInfo.DiplomaFrom[1] +
                                    "-" +
                                    personalData.academicsInfo.DiplomaFrom[0]
                                )}
                                onChange={value =>
                                  handleOnChangeDate("DiplomaFrom", value)
                                }
                              ></DatePicker>
                              <Typography sx={{ width: "100%", color: "red" }}>
                                {stateVar["errors"]["DiplomaFrom"]}
                              </Typography>
                            </DemoItem>
                          </DemoContainer>
                        </LocalizationProvider>
                      </StyledTableCell>
                    )}

                  {personalData &&
                    "academicsInfo" in personalData &&
                    "DiplomaFrom" in personalData.academicsInfo &&
                    personalData.academicsInfo.DiplomaFrom.length === 0 && (
                      <StyledTableCell sx={{ padding: "4px" }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DemoContainer components={["DatePicker"]}>
                            {" "}
                            <DemoItem label="">
                              <DatePicker
                                disableFuture
                                // views={['year', 'month', 'day']}
                                name="DiplomaFrom"
                                onChange={value =>
                                  handleOnChangeDate("DiplomaFrom", value)
                                }
                              />
                              <Typography sx={{ width: "100%", color: "red" }}>
                                {stateVar["errors"]["DiplomaFrom"]}
                              </Typography>
                            </DemoItem>
                          </DemoContainer>
                        </LocalizationProvider>
                      </StyledTableCell>
                    )}

                  {/* DIPLOMA TO */}

                  {personalData &&
                    "academicsInfo" in personalData &&
                    "DiplomaTo" in personalData.academicsInfo &&
                    personalData.academicsInfo.DiplomaTo.length === 3 && (
                      <StyledTableCell sx={{ padding: "4px" }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DemoContainer components={["DatePicker"]}>
                            {" "}
                            <DemoItem label="">
                              <DatePicker
                                disableFuture
                                // views={['year', 'month', 'day']}
                                name="DiplomaTo"
                                defaultValue={dayjs(
                                  personalData.academicsInfo.DiplomaTo[2] +
                                    "-" +
                                    personalData.academicsInfo.DiplomaTo[1] +
                                    "-" +
                                    personalData.academicsInfo.DiplomaTo[0]
                                )}
                                onChange={value =>
                                  handleOnChangeDate("DiplomaTo", value)
                                }
                              ></DatePicker>
                              <Typography sx={{ width: "100%", color: "red" }}>
                                {stateVar["errors"]["DiplomaTo"]}
                              </Typography>
                            </DemoItem>
                          </DemoContainer>
                        </LocalizationProvider>
                      </StyledTableCell>
                    )}

                  {personalData &&
                    "academicsInfo" in personalData &&
                    "DiplomaTo" in personalData.academicsInfo &&
                    personalData.academicsInfo.DiplomaTo.length === 0 && (
                      <StyledTableCell sx={{ padding: "4px" }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DemoContainer components={["DatePicker"]}>
                            {" "}
                            <DemoItem label="">
                              <DatePicker
                                disableFuture
                                // views={['year', 'month', 'day']}
                                name="DiplomaTo"
                                onChange={value =>
                                  handleOnChangeDate("DiplomaTo", value)
                                }
                              />
                              <Typography sx={{ width: "100%", color: "red" }}>
                                {stateVar["errors"]["DiplomaTo"]}
                              </Typography>
                            </DemoItem>
                          </DemoContainer>
                        </LocalizationProvider>
                      </StyledTableCell>
                    )}
                  <StyledTableCell sx={{ padding: "4px" }}>
                    {renderInputText({
                      label: "",
                      name: "Diplomamarks",
                      stateVar,
                      handleOnChange: handleOnChange
                    })}
                  </StyledTableCell>
                </StyledTableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Button
            variant="contained"
            onClick={() => handleSave1()}
            color="success"
            style={{ margin: "0 auto", display: "flex", marginTop: "3%" }}
          >
            SAVE DETAILS
          </Button>
          {validate1 && (
            <div
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: "8px"
              }}
            >
              <Typography align="center">
                SSC To HSC Gap : {stateVar.data.SSCtoHSC} years
              </Typography>
              <Typography align="center">
                SSC To Diploma Gap : {stateVar.data.SSCtoDiploma} years
              </Typography>
              <Typography align="center">
                HSC To Diploma Gap : {stateVar.data.HSCtoDiploma} years
              </Typography>
              <Typography align="center">
                Total Gaps : {stateVar.data.TotalGapsSchool} years
              </Typography>
            </div>
          )}
        </Paper>

        <Paper component={Box} p={2}>
          <Grid container spacing={2} style={{ justifyContent: "center" }}>
            <Box mt={1} mb={2}>
              {renderText({
                label: "Graduation and Post-Graduation Academics Details"
              })}
            </Box>
          </Grid>
          <TableContainer component={Paper}>
            <Table aria-label="Graduation and Post-Graduation Academics Details">
              <TableHead>
                <TableRow>
                  <TableCell>Examination</TableCell>
                  <TableCell>Name of the Institute or University</TableCell>
                  <TableCell>Specialization</TableCell>
                  <TableCell>From (MM/DD/YYYY)</TableCell>
                  <TableCell>To (MM/DD/YYYY)</TableCell>
                  <TableCell>Final Year Percentage of marks</TableCell>
                  <TableCell>Aggregate Percentage of marks</TableCell>
                  <TableCell>Backlogs</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <StyledTableRow>
                  <StyledTableCell sx={{ padding: "4px" }}>
                    Graduation(passed)
                  </StyledTableCell>

                  <StyledTableCell>
                    {renderInputText({
                      label: "",
                      name: "InstituteGrad",
                      stateVar,
                      handleOnChange: handleOnChange
                    })}
                  </StyledTableCell>

                  {/* <StyledTableCell>
                    {renderInputText({
                      label: "",
                      name: "SpecializationGrad",
                      stateVar,
                      handleOnChange: handleOnChange
                    })}
                  </StyledTableCell> */}
                  {/* PHY DISABILITY */}

                  <StyledTableCell>
                    {renderInputSelect({
                      label: "",
                      name: "SpecializationGrad",
                      stateVar,
                      handleOnChange: handleOnChange,
                      arr: [
                        { value: "Agriculture & Food Engineering", label: "" },
                        {
                          value: "Automobile Engineering",
                          label: "Automobile Engineering"
                        },
                        {
                          value: "Chemical Engineering",
                          label: "Chemical Engineering"
                        },
                        {
                          value: "Civil Engineering",
                          label: "Civil Engineering"
                        },
                        {
                          value: "Computer Engineering",
                          label: "Computer Engineering"
                        },
                        {
                          value: "Electrical Engineering",
                          label: "Electrical Engineering"
                        },
                        {
                          value: "Electronics Engineering",
                          label: "Electronics Engineering"
                        },
                        {
                          value:
                            "Electronics and Telecommunication Engineering",
                          label: "Electronics and Telecommunication Engineering"
                        },
                        {
                          value: "Industrial and Production Engineering",
                          label: "Industrial and Production Engineering"
                        },
                        {
                          value: "Industrial Engineering",
                          label: "Industrial Engineering"
                        },
                        {
                          value: "Information Technology Engineering",
                          label: "Information Technology Engineering"
                        },
                        {
                          value: "Instrumentation Engineering",
                          label: "Instrumentation Engineering"
                        },
                        {
                          value: "Mechanical Engineering",
                          label: "Mechanical Engineering"
                        },
                        {
                          value: "Metallurgical Engineering",
                          label: "Metallurgical Engineering"
                        },
                        {
                          value: "Petroleum Engineering",
                          label: "Petroleum Engineering"
                        },
                        {
                          value: "Production Engineering",
                          label: "Production Engineering"
                        },
                        {
                          value: "Textile Engineering",
                          label: "Textile Engineering"
                        },
                        {
                          value: "Bachelor of Science - B. Sc.",
                          label: "Bachelor of Science - B. Sc."
                        },
                        {
                          value: "Bachelor of Commerce - B.Com.",
                          label: "Bachelor of Commerce - B.Com."
                        },
                        {
                          value: "Bachelor of Computer Applications - B.C.A.",
                          label: "Bachelor of Computer Applications - B.C.A."
                        }
                      ]
                    })}
                  </StyledTableCell>

                  {/* GRADUATION FROM */}
                  {personalData &&
                    "academicsInfo" in personalData &&
                    "GradFrom" in personalData.academicsInfo &&
                    personalData.academicsInfo.GradFrom.length === 3 && (
                      <StyledTableCell sx={{ padding: "4px" }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DemoContainer components={["DatePicker"]}>
                            {" "}
                            <DemoItem label="">
                              <DatePicker
                                disableFuture
                                // views={['year', 'month', 'day']}
                                name="GradFrom"
                                defaultValue={dayjs(
                                  personalData.academicsInfo.GradFrom[2] +
                                    "-" +
                                    personalData.academicsInfo.GradFrom[1] +
                                    "-" +
                                    personalData.academicsInfo.GradFrom[0]
                                )}
                                onChange={value =>
                                  handleOnChangeDate("GradFrom", value)
                                }
                              ></DatePicker>
                              <Typography sx={{ width: "100%", color: "red" }}>
                                {stateVar["errors"]["GradFrom"]}
                              </Typography>
                            </DemoItem>
                          </DemoContainer>
                        </LocalizationProvider>
                      </StyledTableCell>
                    )}

                  {personalData &&
                    "academicsInfo" in personalData &&
                    "GradFrom" in personalData.academicsInfo &&
                    personalData.academicsInfo.GradFrom.length === 0 && (
                      <StyledTableCell sx={{ padding: "4px" }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DemoContainer components={["DatePicker"]}>
                            {" "}
                            <DemoItem label="">
                              <DatePicker
                                disableFuture
                                // views={['year', 'month', 'day']}
                                name="GradFrom"
                                onChange={value =>
                                  handleOnChangeDate("GradFrom", value)
                                }
                              />
                              <Typography sx={{ width: "100%", color: "red" }}>
                                {stateVar["errors"]["GradFrom"]}
                              </Typography>
                            </DemoItem>
                          </DemoContainer>
                        </LocalizationProvider>
                      </StyledTableCell>
                    )}

                  {/* GRAD TO */}

                  {personalData &&
                    "academicsInfo" in personalData &&
                    "GradTo" in personalData.academicsInfo &&
                    personalData.academicsInfo.GradTo.length === 3 && (
                      <StyledTableCell sx={{ padding: "4px" }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DemoContainer components={["DatePicker"]}>
                            {" "}
                            <DemoItem label="">
                              <DatePicker
                                disableFuture
                                // views={['year', 'month', 'day']}
                                name="GradTo"
                                defaultValue={dayjs(
                                  personalData.academicsInfo.GradTo[2] +
                                    "-" +
                                    personalData.academicsInfo.GradTo[1] +
                                    "-" +
                                    personalData.academicsInfo.GradTo[0]
                                )}
                                onChange={value =>
                                  handleOnChangeDate("GradTo", value)
                                }
                              ></DatePicker>
                              <Typography sx={{ width: "100%", color: "red" }}>
                                {stateVar["errors"]["GradTo"]}
                              </Typography>
                            </DemoItem>
                          </DemoContainer>
                        </LocalizationProvider>
                      </StyledTableCell>
                    )}

                  {personalData &&
                    "academicsInfo" in personalData &&
                    "GradTo" in personalData.academicsInfo &&
                    personalData.academicsInfo.GradTo.length === 0 && (
                      <StyledTableCell sx={{ padding: "4px" }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DemoContainer components={["DatePicker"]}>
                            {" "}
                            <DemoItem label="">
                              <DatePicker
                                disableFuture
                                // views={['year', 'month', 'day']}
                                name="GradTo"
                                onChange={value =>
                                  handleOnChangeDate("GradTo", value)
                                }
                              />
                              <Typography sx={{ width: "100%", color: "red" }}>
                                {stateVar["errors"]["GradTo"]}
                              </Typography>
                            </DemoItem>
                          </DemoContainer>
                        </LocalizationProvider>
                      </StyledTableCell>
                    )}
                  <StyledTableCell sx={{ padding: "4px" }}>
                    {renderInputText({
                      label: "",
                      name: "FinalYearMarksGrad",
                      stateVar,
                      handleOnChange: handleOnChange
                    })}
                  </StyledTableCell>
                  <StyledTableCell sx={{ padding: "4px" }}>
                    {renderInputText({
                      label: "",
                      name: "AggregateMarksGrad",
                      stateVar,
                      handleOnChange: handleOnChange
                    })}
                  </StyledTableCell>
                  <StyledTableCell>
                    {renderInputText({
                      label: "",
                      name: "DeadBacklogsGrad",
                      stateVar,
                      handleOnChange: handleOnChange
                    })}
                  </StyledTableCell>
                </StyledTableRow>

                <StyledTableRow>
                  <StyledTableCell sx={{ padding: "4px" }}>
                    Post Graduation
                  </StyledTableCell>

                  <StyledTableCell>
                    {renderInputText({
                      label: "",
                      name: "InstitutePostGrad",
                      stateVar,
                      handleOnChange: handleOnChange
                    })}
                  </StyledTableCell>

                  <StyledTableCell>
                    {renderInputSelect({
                      label: "",
                      name: "SpecializationPostGrad",
                      stateVar,
                      handleOnChange: handleOnChange,
                      arr: [
                        { value: "M.E/M.Tech", label: "M.E/M.Tech" },
                        { value: "MBA", label: "MBA" },
                        { value: "M.Com.", label: "M.Com." }
                      ]
                    })}
                  </StyledTableCell>

                  {/* GRADUATION FROM */}
                  {personalData &&
                    "academicsInfo" in personalData &&
                    "PostGradFrom" in personalData.academicsInfo &&
                    personalData.academicsInfo.PostGradFrom.length === 3 && (
                      <StyledTableCell sx={{ padding: "4px" }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DemoContainer components={["DatePicker"]}>
                            {" "}
                            <DemoItem label="">
                              <DatePicker
                                disableFuture
                                // views={['year', 'month', 'day']}
                                name="PostGradFrom"
                                defaultValue={dayjs(
                                  personalData.academicsInfo.PostGradFrom[2] +
                                    "-" +
                                    personalData.academicsInfo.PostGradFrom[1] +
                                    "-" +
                                    personalData.academicsInfo.PostGradFrom[0]
                                )}
                                onChange={value =>
                                  handleOnChangeDate("PostGradFrom", value)
                                }
                              ></DatePicker>
                              <Typography sx={{ width: "100%", color: "red" }}>
                                {stateVar["errors"]["PostGradFrom"]}
                              </Typography>
                            </DemoItem>
                          </DemoContainer>
                        </LocalizationProvider>
                      </StyledTableCell>
                    )}

                  {personalData &&
                    "academicsInfo" in personalData &&
                    "PostGradFrom" in personalData.academicsInfo &&
                    personalData.academicsInfo.PostGradFrom.length === 0 && (
                      <StyledTableCell sx={{ padding: "4px" }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DemoContainer components={["DatePicker"]}>
                            {" "}
                            <DemoItem label="">
                              <DatePicker
                                disableFuture
                                // views={['year', 'month', 'day']}
                                name="PostGradFrom"
                                onChange={value =>
                                  handleOnChangeDate("PostGradFrom", value)
                                }
                              />
                              <Typography sx={{ width: "100%", color: "red" }}>
                                {stateVar["errors"]["PostGradFrom"]}
                              </Typography>
                            </DemoItem>
                          </DemoContainer>
                        </LocalizationProvider>
                      </StyledTableCell>
                    )}

                  {/* GRAD TO */}

                  {personalData &&
                    "academicsInfo" in personalData &&
                    "PostGradTo" in personalData.academicsInfo &&
                    personalData.academicsInfo.PostGradTo.length === 3 && (
                      <StyledTableCell sx={{ padding: "4px" }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DemoContainer components={["DatePicker"]}>
                            {" "}
                            <DemoItem label="">
                              <DatePicker
                                disableFuture
                                // views={['year', 'month', 'day']}
                                name="GradTo"
                                defaultValue={dayjs(
                                  personalData.academicsInfo.PostGradTo[2] +
                                    "-" +
                                    personalData.academicsInfo.PostGradTo[1] +
                                    "-" +
                                    personalData.academicsInfo.PostGradTo[0]
                                )}
                                onChange={value =>
                                  handleOnChangeDate("PostGradTo", value)
                                }
                              ></DatePicker>
                              <Typography sx={{ width: "100%", color: "red" }}>
                                {stateVar["errors"]["PostGradTo"]}
                              </Typography>
                            </DemoItem>
                          </DemoContainer>
                        </LocalizationProvider>
                      </StyledTableCell>
                    )}

                  {personalData &&
                    "academicsInfo" in personalData &&
                    "PostGradTo" in personalData.academicsInfo &&
                    personalData.academicsInfo.PostGradTo.length === 0 && (
                      <StyledTableCell sx={{ padding: "4px" }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DemoContainer components={["DatePicker"]}>
                            {" "}
                            <DemoItem label="">
                              <DatePicker
                                disableFuture
                                // views={['year', 'month', 'day']}
                                name="PostGradTo"
                                onChange={value =>
                                  handleOnChangeDate("PostGradTo", value)
                                }
                              />
                              <Typography sx={{ width: "100%", color: "red" }}>
                                {stateVar["errors"]["PostGradTo"]}
                              </Typography>
                            </DemoItem>
                          </DemoContainer>
                        </LocalizationProvider>
                      </StyledTableCell>
                    )}
                  <StyledTableCell sx={{ padding: "4px" }}>
                    {renderInputText({
                      label: "",
                      name: "FinalYearMarksPostGrad",
                      stateVar,
                      handleOnChange: handleOnChange
                    })}
                  </StyledTableCell>
                  <StyledTableCell sx={{ padding: "4px" }}>
                    {renderInputText({
                      label: "",
                      name: "AggregateMarksPostGrad",
                      stateVar,
                      handleOnChange: handleOnChange
                    })}
                  </StyledTableCell>
                  <StyledTableCell>
                    {renderInputText({
                      label: "",
                      name: "DeadBacklogsPostGrad",
                      stateVar,
                      handleOnChange: handleOnChange
                    })}
                  </StyledTableCell>
                </StyledTableRow>

                {/* POST GRAD */}
              </TableBody>
            </Table>
          </TableContainer>
          <Button
            variant="contained"
            onClick={() => handleSave2()}
            color="success"
            style={{ margin: "0 auto", display: "flex", marginTop: "3%" }}
          >
            SAVE DETAILS
          </Button>
          {validate2 && (
            <div
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: "8px"
              }}
            >
              <Typography align="center">
                Total Graduation Period : {stateVar.data.GradPeriod} years
              </Typography>
              <Typography align="center">
                Gap in UG and PG : {stateVar.data.GradtoPostGrad} years
              </Typography>
            </div>
          )}
        </Paper>

        <Paper component={Box} p={2}>
          <Grid container spacing={2} style={{ justifyContent: "center" }}>
            <Box mt={1} mb={2}>
              {renderText({ label: "Other Courses Details" })}
              {renderText({
                label: otherCoursesError,
                variant: "subtitle1",
                color: "error"
              })}
            </Box>
          </Grid>

          <TableContainer component={Paper}>
            <div className="app-container">
              <form>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name of Course Name</TableCell>
                      <TableCell>Name of University</TableCell>
                      <TableCell>Specialization</TableCell>
                      <TableCell>Period From (Enter Year Only)</TableCell>
                      <TableCell>Period To (Enter Year Only)</TableCell>
                      <TableCell>Grade/Marks(%)</TableCell>

                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {contacts.map(contact => (
                      <Fragment>
                        <ReadOnlyRow
                          contact={contact}
                          //handleEditClick={handleEditClick}
                          handleDeleteClick={handleDeleteClick}
                        />
                      </Fragment>
                    ))}
                  </TableBody>
                </Table>
              </form>
              <Paper component={Box} p={2}>
                <Grid container spacing={2} p={2}>
                  <form
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      overflow: "scroll",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    <TextField
                      label="Course Name"
                      // color={color ? color : "primary"}
                      variant="outlined"
                      name="courseName"
                      // fullWidth={true}
                      size="small"
                      onChange={handleAddFormChange}
                      style={{ margin: "1px" }}
                    />
                    <TextField
                      label="University Name"
                      // color={color ? color : "primary"}
                      variant="outlined"
                      name="uniName"
                      // fullWidth={true}
                      size="small"
                      style={{ margin: "1px" }}
                      onChange={handleAddFormChange}
                    />
                    <TextField
                      label="Specialization"
                      // color={color ? color : "primary"}
                      variant="outlined"
                      name="specialization"
                      // fullWidth={true}
                      size="small"
                      style={{ margin: "1px" }}
                      onChange={handleAddFormChange}
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
                    />
                    <TextField
                      label="Grade"
                      // color={color ? color : "primary"}
                      variant="outlined"
                      name="grade"
                      // fullWidth={true}
                      size="small"
                      style={{ margin: "1px" }}
                      onChange={handleAddFormChange}
                    />

                    {renderButton({
                      label: "Add",
                      handleOnClick: handleAddFormSubmit
                    })}
                  </form>
                  <Button
                    variant="contained"
                    onClick={() => handleSave3()}
                    color="success"
                    style={{
                      margin: "0 auto",
                      display: "flex",
                      marginTop: "3%"
                    }}
                  >
                    SAVE DETAILS
                  </Button>
                </Grid>
              </Paper>
            </div>
          </TableContainer>
        </Paper>
        <Button
          variant="contained"
          onClick={() => handleSave()}
          color="success"
          style={{ margin: "0 auto", display: "flex", marginTop: "3%" }}
        >
          SAVE & GO TO NEXT
        </Button>
      </Box>
    </Box>
  );
}

AcademicsInfo.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func
};

export default AcademicsInfo;
