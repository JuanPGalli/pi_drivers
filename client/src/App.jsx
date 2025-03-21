import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./Views/Home/Home";
import Landing from "./Views/Landing/Landing";
import Navbar from "./Components/Navbar/Navbar";
import Form from "./Views/Form/Form";
import Detail from "./Views/Detail/Detail";
import axios from "axios";

axios.defaults.baseURL = "https://pidrivers-production.up.railway.app/";

function App() {
  const location = useLocation();
  const showNavbar =
    location.pathname === "/home" || location.pathname.startsWith("/detail");
  return (
    <div className="App">
      {showNavbar && <Navbar />}
      <Routes>
        <Route exact path={"/"} element={<Landing />} />
        <Route path={"/home"} element={<Home />} />

        <Route path={"/create"} element={<Form />} />

        <Route path={"/detail/:id"} element={<Detail />} />
      </Routes>
    </div>
  );
}

export default App;
