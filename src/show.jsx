import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import './App.css'
import instance from './axiosUtil.jsx'
import Header from './layouts/Header.jsx'
import Sidebar from './layouts/Sidebar.jsx'
import { IoChatbubbleOutline } from "react-icons/io5";
import { CiRepeat } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";
import { GoUpload } from "react-icons/go";

function Show() {
  const navigate = useNavigate();
  const params = useParams();
  const [tweet, setTweet] = useState(null)
  const [user, setUser] = useState(null)

  const fetchTweet = async() => {
    try {
      const response = await instance.get(`tweets/${params.id}`, params.id);
      console.log(response)
      setTweet(response.data.tweet)
      setUser(response.data.user)
    } catch(error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchTweet()
  },[])

  return (
    <>
      <Header />
      <div  className='container'>
        <Sidebar />
        <div className='w-50'>
          <div className='d-flex'>
            <button className='returnButton' onClick={() => navigate(-1)}><h4 className='p-4'>←</h4></button>
            <h4 className='mt-4'>ポストする</h4>
          </div>
          <div className='w-100 p-4 border-bottom'>
            <div className='w-100'>
              <div className='w-100 flex-column'>
                <div className='fw-bold p-2'>
                  {user ? (user.name):("ロード中")}
                </div>
              </div>
            </div>
            <div className='mt-3 p-2'>
              {tweet ? (tweet.content):("ロード中")}
            </div>
            <div className='border-top mt-3'>
              <div className='d-flex justify-content-around mt-3'>
                <div className='text-secondary'>
                  <IoChatbubbleOutline />
                  0
                </div>
                <div className='text-secondary'>
                  <CiRepeat />
                  0
                </div>
                <div className='text-secondary'>
                  <CiHeart />
                  0
                </div>
                <div className='text-secondary'>
                  <GoUpload />
                  0
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Show