import React from 'react'
import style from './MainPage.module.css'
import NavCoursel from './navCoursel/NavCoursel'
import FoodCategory from './category/FoodCategory'

const MainPage = () => {
  return (
    <>
    <div className={style.mainContainer}>
        <NavCoursel />
        <FoodCategory />
    </div>
    </>
    
  )
}

export default MainPage