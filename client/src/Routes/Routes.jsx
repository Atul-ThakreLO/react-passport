import { Route, Routes } from "react-router-dom";
import Login from "../components/Login";
import Home from "../Home";
import MainPage from "../MainPage";

export const RoutesPaths = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/main" element={<MainPage />}/>
    </Routes>
  );
};
