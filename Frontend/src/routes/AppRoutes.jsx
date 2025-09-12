import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import UserRegister from '../component/UserRegister'
import UserLogin from "../component/UserLogin"
import FoodPartnerRegister from "../component/PartnerRegister"
import FoodPartnerLogin from "../component/PartnerLogin"

const AppRoutes = () => {
  return (
  <Router>
    <Routes>
      <Route path="/user/register" element={<UserRegister />} />
      <Route path="/user/login" element={ <UserLogin />} />
        <Route path="/food-partner/register" element={<FoodPartnerRegister />} />
        <Route path="/food-partner/login" element={<FoodPartnerLogin />} />
    </Routes>
  </Router>
  )
}

export default AppRoutes