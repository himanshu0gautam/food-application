import React from 'react'
import style from './MainPage.module.css'
import NavCoursel from '../navCoursel/NavCoursel'
import FoodCategory from '../category/FoodCategory'
import AllFood from '../Allfood/pages/AllFood'
import BottomNav from '../BottomNav/BottomNav'

const MainPage = () => {

  return (
    <>
      <div className={style.mainContainer}>
        <NavCoursel />
        <FoodCategory />
        <AllFood />
      </div>

      <BottomNav />

    </>

  )
}

export default MainPage