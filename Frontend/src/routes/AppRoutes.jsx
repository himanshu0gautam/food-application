import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import UserRegister from '../component/auth.pages/UserRegister'
import UserLogin from "../component/auth.pages/UserLogin"
import FoodPartnerRegister from "../component/auth.pages/PartnerRegister"
import FoodPartnerLogin from "../component/auth.pages/PartnerLogin"
import Home from '../component/home/Home'
import Save from '../component/home/Save'
import CreateFood from '../component/food/CreateFood'
import PartnerProfile from '../component/partnerDashboard/PartnerProfile'
import UserProfile from '../component/UserDashboard/UserProfile'
import Notification from '../Pages/Notification'


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
        <Route path='/user-profile' element={<UserProfile />}></Route>
        <Route path='/notification' element={<Notification />}></Route>
      </Routes>
    </Router>
  )
}

export default AppRoutes