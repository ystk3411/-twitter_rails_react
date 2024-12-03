import { useState, useRef, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import './App.css'
import instance from './axiosUtil.jsx'
import Header from './layouts/Header.jsx'
import Nav from 'react-bootstrap/Nav';
import { FaXTwitter } from "react-icons/fa6";
import { IoMdHome } from "react-icons/io";
import { RiNotification2Fill } from "react-icons/ri";
import { FaEnvelope } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import { PiDotsThreeCircleFill } from "react-icons/pi";
import { IoChatbubbleOutline } from "react-icons/io5";
import { CiRepeat } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";
import { GoUpload } from "react-icons/go";

function Show() {
  const navigate = useNavigate();
  const params = useParams();
  const [tweet, setTweet] = useState('')
  const [user, setUser] = useState('')

  const fetchTweet = async() => {
    try {
      const response = await instance.get(`tweets/${params.id}`, params.id);
      setTweet(response.data.tweet.content)
      setUser(response.data.user.name)
      console.log(response)
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
        <Nav defaultActiveKey="/home" className="flex-column w-25">
          <h4><Nav.Link href="/home"><FaXTwitter /></Nav.Link></h4>
          <h4><Nav.Link href="/home"><IoMdHome />ホーム</Nav.Link></h4>
          <h4><Nav.Link href="/home"><RiNotification2Fill />通知</Nav.Link></h4>
          <h4><Nav.Link href="/home"><FaEnvelope />メッセージ</Nav.Link></h4>
          <h4><Nav.Link href="/home"><FaBookmark />ブックマーク</Nav.Link></h4>
          <h4><Nav.Link href="/home"><IoPerson />プロフィール</Nav.Link></h4>
          <h4><Nav.Link href="/home"><PiDotsThreeCircleFill />もっと見る</Nav.Link></h4>
        </Nav>
        <div className='w-50'>
          <div className='d-flex'>
            <button className='returnButton' onClick={() => navigate(-1)}><h4 className='p-4'>←</h4></button>
            <h4 className='mt-4'>ポストする</h4>
          </div>
          <div className='w-100 p-4 border-bottom'>
            <div className='w-100'>
              <div className='w-100 flex-column'>
                <div className='fw-bold p-2'>
                  {user}
                </div>
              </div>
            </div>
            <div className='mt-3 p-2'>
              {tweet}
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
