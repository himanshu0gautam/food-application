import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../component/home/reelHome/Home'
import Save from '../component/home/Save/Save'
import CreateVideo from '../component/Createfood/VideoReels/pages/Createvideo'
import PartnerProfile from '../component/partnerDashboard/pages/PartnerProfile'
import UserProfile from '../component/UserDashboard/pages/UserProfile'
import Notification from '../Pages/Notification'
import ProtectRoute from '../protectRoute/ProtectRoute'
import FoodDetails from '../component/mainpage/foodDetails/pages/FoodDetails'
import CreateDish from '../component/Createfood/Dish/pages/CreateDish'


const AppRoutes = () => {
  return (
      <Routes>
        {/* <Route path="userRegister" element={<UserRegister />} /> */}
        <Route path="save" element={<Save />} />
        <Route path="create-video" element={<CreateVideo />} />
        <Route path="create-dish" element={<CreateDish />} />
        <Route path="partner-profile" element={
          <ProtectRoute>
            <PartnerProfile />
          </ProtectRoute>
        }/>
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
        <Route path='food-details' element={<FoodDetails />}></Route>
      </Routes>
  )
}


export default AppRoutes