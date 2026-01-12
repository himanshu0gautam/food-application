import React from 'react'
import style from './MainPage.module.css'
import NavCoursel from './navCoursel/NavCoursel'

const MainPage = () => {
  return (
    <>
    <div className={style.mainContainer}>
        <NavCoursel />
    </div>
    </>
    
  )
}

export default MainPage