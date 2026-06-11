import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "../component/mainpage/MainPage";
import UserRegister from "../component/auth.pages/UserRegister";
import UserLogin from "../component/auth.pages/UserLogin";
import FoodPartnerRegister from "../component/auth.pages/PartnerRegister";
import FoodPartnerLogin from "../component/auth.pages/PartnerLogin";
import AppRoutes from "./AppRoutes";
import ProtectRoute from "../protectRoute/ProtectRoute";

const homeRoute = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
                <MainPage />
            }
          />
          <Route path="/food/*" element={<AppRoutes />} />
          <Route path="/user/register" element={<UserRegister />} />
          <Route path="/user/login" element={<UserLogin />} />
          <Route path="/food-partner/register" element={<FoodPartnerRegister />}/>
          <Route path="/food-partner/login" element={<FoodPartnerLogin />} />
        </Routes>
      </Router>
    </>
  );
};

export default homeRoute;
