import React, { useMemo, useState, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { BACKEND_URL } from "../config";
import axios from "axios";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Navigate, useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import DownloadIcon from "@mui/icons-material/Download";
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import LogoutIcon from "@mui/icons-material/Logout";
import AppBar from "@mui/material/AppBar";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import { useLocation } from "react-router-dom";
import { Paper } from "@material-ui/core";
import { renderText } from "../components/common/displayComponents";

const drawerWidth = 280;

const FeesDetailsAdmin = () => {
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
                }>
                <ListItemIcon>
                  {index === 0 && <HomeIcon />}
                  {index === 1 && <AppRegistrationIcon />}
                  {index === 2 && <DownloadIcon />}
                  {index === 3 && <AccountBalanceIcon />}
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

  const gridRef = useRef();

  const [rowData, setRowData] = useState();
  let columnDefs = [];

  // Pushing all column fields
  columnDefs.push({ field: "Name" });
  columnDefs.push({ field: "ID" });
  columnDefs.push({ field: "Course" });
  columnDefs.push({ field: "Bank Name" });
  columnDefs.push({ field: "Bank Ref no" });
  columnDefs.push({ field: "Amount Paid" });
  columnDefs.push({ field: "Date of Payment" });
  
  const searchDivStyle = { backgroundColor: "#dedede", padding: 10 };

  const searchStyle = {
    width: "100%",
    padding: "10px 20px",
    borderRadius: 20,
    outline: 0,
    border: "2px #68bf40 solid",
    fontSize: "100%",
  };

  const defaultColDef = useMemo(() => ({
    sortable: true,
    filter: true,
    floatingFilter: true,
    resizable: true,
  }));

  let gridApi;

  const onGridReady = (params) => {
    const url = BACKEND_URL + "/admin/allStudentDetails";
    let all_rows = [];
    axios
      .get(url, {
        headers: {
          "pgderp-website-jwt": localStorage.getItem("pgderp-website-jwt"),
        },
      })
      .then((res) => {
        let students = res.data;
        Object.keys(students).map((student, index) => {
          // console.log(students[student]);
          let row = {};
          if (students[student]["name"]) {
            row["Name"] = students[student]["name"];
          }
          if (students[student]["registrationID"]) {
            row["ID"] = students[student]["registrationID"];
          }
          if (students[student]["course"]) {
            row["Course"] = students[student]["course"];
          }

          //Fees details
          if (students[student]["feesDetails"]) {
            if ("bank" in students[student]["feesDetails"]) {
              row["Bank Name"] = students[student]["feesDetails"]["bank"];
            }
            if ("refNo" in students[student]["feesDetails"]) {
              row["Bank Ref no"] = students[student]["feesDetails"]["refNo"];
            }
            if ("amt" in students[student]["feesDetails"]) {
              row["Amount Paid"] = students[student]["feesDetails"]["amt"];
            }
            if (("date" in students[student]["feesDetails"]) && (students[student]["feesDetails"]["date"].length > 0)) {
                row["Date of Payment"] = 
                    students[student]["feesDetails"]["date"][0] + "-" +
                    students[student]["feesDetails"]["date"][1] + "-" +
                    students[student]["feesDetails"]["date"][2];
            }
          }

          all_rows.push(row);
        });
        setRowData(all_rows);
      });

    gridApi = params.api;
    params.api.paginationGoToPage(0);
  };

  const onExportClick = () => {
    gridRef.current.api.exportDataAsCsv();
  };

  const onPaginationChange = (pageSize) => {
    gridRef.current.api.paginationSetPageSize(Number(pageSize));
  };

  const onFilterTextChange = (e) => {
    gridRef.current.api.setQuickFilter(e.target.value);
  };
  return (
    <Box bgcolor="#E5EDF1" sx={{ display: "flex", minHeight: "100vh" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: "#00ABE4",
        }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}>
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
        aria-label="mailbox folders">
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
          }}>
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
          open>
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}>
        <Toolbar />
        <Paper component={Box} p={2}>
          <Grid container spacing={2} style={{ justifyContent: "center" }}>
            <Box mt={1} mb={2}>
              {renderText({ label: "FEES DETAILS" })}
            </Box>
          </Grid>

          <Button
            variant="contained"
            onClick={() => onExportClick()}
            color="success"
            style={{ margin: "0 auto", display: "flex", marginTop: "3%" }}>
            EXPORT DATA
          </Button>
          <FormControl
            style={{
              width: "50%",
              margin: "0 auto",
              display: "flex",
              marginTop: "1%",
              marginBottom: "1%",
            }}>
            <InputLabel id="demo-simple-select-label">Page Size</InputLabel>
            <Select onChange={(e) => onPaginationChange(e.target.value)}>
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </Select>
          </FormControl>
          <div style={searchDivStyle}>
            <input
              type="search"
              style={searchStyle}
              onChange={onFilterTextChange}
              placeholder="Enter..."
            />
          </div>
          <div
            className="ag-theme-alpine"
            style={{
              height: "80vh",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}>
            <AgGridReact
              ref={gridRef}
              rowData={rowData}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              rowSelection="multiple"
              animateRows={true}
              onGridReady={onGridReady}
              pagination={true}
              paginationPageSize={10}
              suppressDragLeaveHidesColumns={true}
              rowDragManaged={true}
              suppressRowClickSelection={true}
              cacheQuickFilter={true}
            />
          </div>
        </Paper>
      </Box>
    </Box>
  );
};

export default FeesDetailsAdmin;
