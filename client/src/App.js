import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import Home from "./pages/Home";
import Contact from "./components/Contact";
import Register from "./pages/Register";
import StudentLogIn from "./pages/StudentLogIn";
import FacLogIn from "./pages/FacLogIn";
import LoginAccountSection from "./pages/LoginAccountSection";
import ForgetPassword from "./pages/ForgetPassword";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} exact></Route>
        <Route path="/register" element={<Register/>} exact></Route>
        <Route path="/login/candidate" element={<StudentLogIn/>} exact></Route>
        <Route path="/login/staff" element={<FacLogIn/>} exact></Route>
        <Route path="/forgetpassword" element={<ForgetPassword/>} exact></Route>
        <Route
          path="/login/account-section"
          element={<LoginAccountSection/>}
          exact
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;
