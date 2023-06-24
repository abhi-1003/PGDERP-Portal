import React from "react";
import HomeIcon from "@material-ui/icons/Home";
// import InfoIcon from "@mui/icons-material/Info";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import LogoutIcon from "@mui/icons-material/Logout";
import AddLinkIcon from "@mui/icons-material/AddLink";
// import DownloadIcon from "@mui/icons-material/Download";
import ModeIcon from "@mui/icons-material/Mode";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import AddLink from "../pages/Link";

export const SidebarData = [
  {
    title: "Home",
    user: "Candidate",
    icon: <HomeIcon />,
    link: "/student/home",
  },
  {
    title: "Fill Application Form",
    user: "Candidate",
    icon: <ModeIcon />,
    link: "/student/form",
  },
  {
    title: "Logout",
    user: "Candidate",
    icon: <LogoutIcon />,
    link: "/",
  },
];
