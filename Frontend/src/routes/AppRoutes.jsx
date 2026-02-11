import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../component/home/Home'
import Save from '../component/home/Save'
import CreateFood from '../component/food/CreateFood'
import PartnerProfile from '../component/partnerDashboard/PartnerProfile'
import UserProfile from '../component/UserDashboard/UserProfile'
import Notification from '../Pages/Notification'
import ProtectRoute from '../protectRoute/ProtectRoute'


const AppRoutes = () => {
  return (
      <Routes>
        {/* <Route path="userRegister" element={<UserRegister />} /> */}
        <Route path="save" element={<Save />} />
        <Route path="create-food" element={<CreateFood />} />
        <Route path="partner-profile" element={<PartnerProfile />} />
        <Route path="home" element={
          <ProtectRoute>
            <Home />
          </ProtectRoute>
        } />
        <Route path='user-profile' element={
          <ProtectRoute>
            <UserProfile/>
          </ProtectRoute>
        }></Route>
        <Route path='notification' element={<Notification />}></Route>
      </Routes>
  )
}

export default AppRoutes