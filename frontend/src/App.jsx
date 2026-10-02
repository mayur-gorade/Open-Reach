import { useState } from 'react'
import './App.css'
import Home from './Pages/Home'
import Register from './Pages/Register'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './Pages/Login'
import FindWork from './Pages/FindWork'


function App() {
 

  return (
    <BrowserRouter>
        <Routes>
           <Route path="/"  element={<Home/>}/>
            <Route path="/register"  element={<Register/>}/>
            <Route path="/login" element={<Login />} />
            <Route path ="/find-work" element={<FindWork/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default App
