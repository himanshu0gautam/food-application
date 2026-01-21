import React from 'react'
import style from './MainPage.module.css'
import NavCoursel from './navCoursel/NavCoursel'
import FoodCategory from './category/FoodCategory'
import AllFood from './Allfood/AllFood'

const MainPage = () => {
  return (
    <>
    <div className={style.mainContainer}>
        <NavCoursel />
        <FoodCategory />
        <AllFood />
    </div>
    </>
    
  )
}

export default MainPage