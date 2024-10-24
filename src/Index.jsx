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
  const [count, setCount] = useState(0)
  // const test = () => {
  //   axios.post('http://localhost:3000/api/v1/users').then((res) => {
  //     return res.data
  //   })
  // }

  // useEffect(() => {
  //   console.log(test())
  // })

  return (
    <>
    </>
  )
}

export default Index
