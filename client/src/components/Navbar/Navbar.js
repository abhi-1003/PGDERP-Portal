// import { Button } from "@material-ui/core"
import { React, useState, useEffect } from "react";
import Helmet from "react-helmet";
import logo from "./logo_trans.png";
// import { Route } from 'react-router-dom'
// import MenuIcon from '@mui/icons-material/Menu';

import "./Navbar.css";

export default function NavBar(props) {
//   let history = useHistory();
  const [loggedIn, setLoggedIn] = useState(props.loggedin);

  useEffect(() => {
    if (localStorage.getItem("pgderp-website-jwt")) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  });

  const toggle = (event) => {
    if (loggedIn) {
      localStorage.clear();
    //   history.push("/");
      setLoggedIn(!loggedIn);
    } else {
    //   history.push("/");
    }
  };

  const homeClick = (event) => {
    if (loggedIn) {
      let role = localStorage.getItem("pgderp-website-role");
      if (role === "admin") {
        // history.push("/");
      } else if (role === "phdCord") {
        // history.push("/");
      } else if (role === "accountSec") {
        // history.push("/");
      } else if (role === "student") {
        // history.push("/");
      }
    }
  };

  let btnTxt = loggedIn ? "Logout" : "Login";
  return (
    <nav className="NavbarItems" style={{ width: "100%" }}>
      <Helmet>
        <title>COEP - PGDERP admission Portal</title>
        <meta name="title" content="COEP PGDERP Admission Portal"></meta>
      </Helmet>

      <ul className="ul-class">
        <li className="li-class">
          <a href="/">
            <img
              src={logo}
              alt="logo"
              style={{ width: "60px", height: "70px" }}
            ></img>
          </a>
        </li>
        <li className="li-class">
          <a href="/">
            <h1 id="big-screen">
              PGDERP Admission Portal - COEP Technological University
            </h1>
            <h1 id="small-screen">PGDERP Admission Portal - COEP Tech</h1>
          </a>
        </li>

        {/* <li className="li-class" style={{ float: "right", marginRight: '10px' }}>
                    <div>
                        <h3>
                            <Button color="light" onClick={toggle} value={btnTxt}>{btnTxt}</Button>
                        </h3>
                    </div>
                    </li>
                    <li className="li-class" onClick={homeClick} style={{ float: "right", marginRight: '10px' }}>
                        <div>
                            <h3>
                                <Button color="light">Home</Button>
                            </h3>
                        </div>
                    </li> */}
      </ul>
    </nav>
  );
}
