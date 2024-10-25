import { useState,useEffect } from 'react'
import './App.css'
import New from  './container/registration/New.jsx'
import Index from './Index.jsx'
import axios from 'axios'
import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />}/>
          <Route path="registration/new" element={<New />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
