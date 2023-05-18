import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import UserLogin from "./pages/UserLogin";
import FormComponent from "./components/formComponent";
import UserRegister from "./pages/UserRegister";
import Coordinator from "./components/Coordinator/coordinator";
import AdminLogin from "./pages/AdminLogin";
import AdminRegister from "./pages/AdminRegister";
import { roles } from "./adminDetails";
import axios from "axios";
import ProtectedRoute from "./protectedRoute";

function setToken() {
  const token = localStorage.getItem("pgderp-website-jwt");
  if (token) {
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
        <Route path="/" element={<UserLogin />} exact></Route>
        <Route path="/register" element={<UserRegister />}></Route>
        <Route path="/register_admin" element={<AdminRegister />}></Route>
        <Route
          path="/student_form"
          element={
            <ProtectedRoute allowedRoles={[roles.student]}>
              <FormComponent />
            </ProtectedRoute>
          }
        />
        <Route path="/coordinator/*" element={<Coordinator />}></Route>
        <Route path="/admin_login" element={<AdminLogin />} exact></Route>
        <Route
          path="/admin_landing_page"
          element={
            <ProtectedRoute allowedRoles={[roles.admin]}>
              <p>Hello Admin</p>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
