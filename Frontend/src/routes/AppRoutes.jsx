import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import UserRegister from '../component/UserRegister'
import UserLogin from "../component/UserLogin"
import FoodPartnerRegister from "../component/PartnerRegister"
import FoodPartnerLogin from "../component/PartnerLogin"
import Home from '../component/home/Home'
import Save from '../component/home/Save'
import CreateFood from '../component/food/CreateFood'
import PartnerProfile from '../component/food/PartnerProfile'

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/user/register" element={<UserRegister />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/food-partner/register" element={<FoodPartnerRegister />} />
        <Route path="/food-partner/login" element={<FoodPartnerLogin />} />
        <Route path="/" element={<UserRegister />} />
        <Route path="/home" element={<Home />} />
  <Route path="/save" element={<Save />} />
        <Route path="/create-food" element={<CreateFood />} />
        <Route path="/partner-profile" element={<PartnerProfile />} />
      </Routes>
    </Router>
  )
}

export default AppRoutes