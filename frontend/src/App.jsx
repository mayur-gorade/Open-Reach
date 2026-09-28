import { useState } from 'react'
import './App.css'
import Home from './Pages/Home'
import Register from './Pages/Register'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './Pages/Login'


function App() {
 

  return (
    <BrowserRouter>
        <Routes>
           <Route path="/"  element={<Home/>}/>
            <Route path="/register"  element={<Register/>}/>
            <Route path="/login" element={<Login />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App
