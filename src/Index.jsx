import { useState,useEffect } from 'react'
import './App.css'
import New from  './container/registration/New.jsx'
import axios from 'axios'
import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";


function Index() {
  const [count, setCount] = useState("")
  return (
    <>
      Xクローン
    </>
  )
}

export default Index
