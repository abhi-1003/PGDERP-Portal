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

function setToken() {
  const token = localStorage.getItem("pgderp-website-jwt");
  console.log("Helllo     " + token);
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
              <FormComponent />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/home"
          element={
            <ProtectedRoute allowedRoles={[roles.student]}>
              <StudentHome />
            </ProtectedRoute>
          }
        />

        <Route path="/admin/login" element={<AdminLogin />} exact></Route>
        <Route path="/admin/register" element={<AdminRegister />}></Route>
        <Route
          path="/admin/home"
          element={
            <ProtectedRoute allowedRoles={[roles.admin]}>
              <AdminHome />
            </ProtectedRoute>
          }
        />

        <Route path="/coordinator/*" element={<Coordinator />}></Route>
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
      </Routes>
    </Router>
  );
}

export default App;
