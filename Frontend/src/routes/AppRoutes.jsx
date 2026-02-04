import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../component/home/Home'
import Save from '../component/home/Save'
import CreateFood from '../component/food/CreateFood'
import PartnerProfile from '../component/partnerDashboard/PartnerProfile'
import UserProfile from '../component/UserDashboard/UserProfile'
import Notification from '../Pages/Notification'


const AppRoutes = () => {
  return (
      <Routes>
        {/* <Route path="userRegister" element={<UserRegister />} /> */}
        <Route path="home" element={<Home />} />
        <Route path="save" element={<Save />} />
        <Route path="create-food" element={<CreateFood />} />
        <Route path="partner-profile" element={<PartnerProfile />} />
        <Route path='user-profile' element={<UserProfile />}></Route>
        <Route path='notification' element={<Notification />}></Route>
      </Routes>
  )
}

export default AppRoutes