import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import MainPage from '../component/mainpage/MainPage'

const homeRoute = () => {
  return (
    <>
    <Router>
        <Routes>
            <Route path='/' element={ <MainPage/> } />
        </Routes>
    </Router>
    
    </>
  )
}

export default homeRoute