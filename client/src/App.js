import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import UserLogin from "./pages/UserLogin";
import FormComponent from "./components/formComponent";
import UserRegister from "./pages/UserRegister";
import AdminHome from "./pages/AdminHome";
import Home from "./pages/Home";
import CoordinatorRegister from "./pages/CoordinatorRegister";
import Coordinator from "./components/Coordinator/coordinator";
import CoordinatorLogin from "./pages/CoordinatorLogin";
import AdminLogin from "./pages/AdminLogin";
import AdminRegister from "./pages/AdminRegister";
import { roles } from "./adminDetails";
import axios from "axios";
import ProtectedRoute from "./protectedRoute";
import StudentHome from "./pages/StudentHome";
import { OtpScript } from "./components/common/otpScript";
import Docs from "./components/steps/docs";
import DocViewer from "./pages/DocViewer";
import Step4 from "./components/steps/Step4";
import Grid from "./pages/Grid";
import Application from "./components/Coordinator/application";
import ResponsiveStudentHome from "./components/ResposiveDrawer";
import PersonalInfo from "./pages/personalInfo";
import AcademicsInfo from "./pages/academicsInfo";

function setToken() {
  const token = localStorage.getItem("pgderp-website-jwt");
  if (token) {
    axios.defaults.headers.common["pgderp-website-jwt"] = "";
    axios.defaults.headers.common["pgderp-website-jwt"] = token;
  } else {
    axios.defaults.headers.common["pgderp-website-jwt"] = null;
    /*if setting null does not remove `Authorization` header then try     
        delete axios.defaults.headers.common['Authorization'];
      */
  }
}
setToken();

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} exact></Route>
        <Route path="/student/login" element={<UserLogin />} exact></Route>
        <Route path="/student/register" element={<UserRegister />}></Route>
        <Route
          path="/student/form"
          element={
            <ProtectedRoute allowedRoles={[roles.student]}>
              <FormComponent/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/home"
          element={
            <ProtectedRoute allowedRoles={[roles.student]}>
              <ResponsiveStudentHome/>
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/personalInfo"
          element={
            <ProtectedRoute allowedRoles={[roles.student]}>
              <PersonalInfo/>
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/academicsInfo"
          element={
            <ProtectedRoute allowedRoles={[roles.student]}>
              <AcademicsInfo/>
            </ProtectedRoute>
          }
        />

        <Route path="/admin/login" element={<AdminLogin />} exact></Route>
        <Route path="/admin/register" element={<AdminRegister />}></Route>
        <Route
          path="/admin/home"
          element={
            <ProtectedRoute allowedRoles={[roles.admin]}>
              <AdminHome/>
              </ProtectedRoute>
          }
        />

        <Route path="/coordinator" element={
          <ProtectedRoute allowedRoles={[roles.coordinator]}>
          <Coordinator />
        </ProtectedRoute>
        }></Route>
        <Route path="/coordinator/:id" element={
          <ProtectedRoute allowedRoles={[roles.coordinator]}>
          <Application />
        </ProtectedRoute>
        }></Route>
        <Route
          path="/coordinator/login"
          element={<CoordinatorLogin />}
          exact
        ></Route>
        <Route
          path="/admin/registerCoord"
          element={
            <ProtectedRoute allowedRoles={[roles.admin]}>
              <CoordinatorRegister />
              </ProtectedRoute>
          }
        />
        <Route path="/otpscript" element = {<OtpScript />}></Route>
        <Route
          path="/doc-view"
          element = {
            <DocViewer
              filename="a2020d3641851fc69d1be879a9a35bff1685731386851.pdf"
              contentType="application/pdf"
            />
          }
        ></Route>
        <Route path="/admin/grid"
          element = {
            <ProtectedRoute allowedRoles={[roles.admin]}>
          <Grid/>
        </ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
