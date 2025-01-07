import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import './App.css'
import instance from './axiosUtil.jsx'
import Header from './layouts/Header.jsx'
import Sidebar from './layouts/Sidebar.jsx'
import Tweets from './layouts/Tweets.jsx'
import Thubmnail from './layouts/Thubmnail.jsx'
import CommentForm from './layouts/CommentForm.jsx'
import { IoChatbubbleOutline } from "react-icons/io5";
import { CiRepeat } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";
import { GoUpload } from "react-icons/go";
import { HiDotsHorizontal } from "react-icons/hi";
import { FaRegTrashAlt } from "react-icons/fa";
import Nav from 'react-bootstrap/Nav';
import Dropdown from 'react-bootstrap/Dropdown';
import { NavLink } from 'react-router-dom';
import Cookies from 'js-cookie';
import alt from './assets/twitter_logo.jpg'

function Show() {
  const navigate = useNavigate();
  const params = useParams();
  const [tweet, setTweet] = useState(null)
  const [user, setUser] = useState(null)
  const [user_image, setUserImage] = useState(null)
  const [comments, setComments] = useState([])
  const userId = Cookies.get("id");

  const fetchTweet = async() => {
    try {
      const response1 = await instance.get(`tweets/${params.id}`, params.id);
      const response2 = await instance.get(`tweets/${params.id}/comments`, {params:{id:params.id}});
      setTweet(response1.data.tweet)
      setUser(response1.data.user)
      setUserImage(response1.data.user_image)
      setComments(response2.data)
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
          <div className='w-100 p-4'>
            { user &&
              <>
                <div className='d-flex gap-2'>
                  <div>
                    <a href={`/user/${user.id}`}>
                      {user_image ? 
                        <Thubmnail user_image={user_image}/>
                        : 
                        <Thubmnail user_image={alt}/>
                      }
                    </a>
                  </div>
                  <div className='w-100 flex-column' >
                    <div className='d-flex justify-content-between'>
                      <div className='fw-bold'>
                        {user && <a className='text-dark' href={`/user/${user.id}`} style={{textDecoration :'none'}}>{user.name}</a>}
                      </div>
                      <Dropdown>
                        <Dropdown.Toggle bsPrefix as={"none"} >
                          <NavLink className='text-dark'><HiDotsHorizontal/></NavLink>
                        </Dropdown.Toggle>
                        
                        <Dropdown.Menu>
                          {user && user.id == userId ? <Dropdown.Item className='text-danger' onClick={ () => onClickDelete(tweet.id)}><FaRegTrashAlt />削除</Dropdown.Item> : null }
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                    <div className='w-100 text-dark'>
                      {tweet.content}
                    </div>
                    <div className='w-100'>
                      {tweet.image_url && <img src={tweet.image_url} className='rounded-4 border border-1 w-100'></img>}
                    </div>

                  </div> 
                </div>
              </>
           }
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
            <div className='d-flex border-top mt-3 p-2 gap-2'>
              <Nav>
                <Nav.Link href={`/user/${userId}`}>
                {user_image ? <img src={user_image} className='rounded-circle border border-2 border-dark' width={40}/> : <img src={alt} className='rounded-circle border border-2 border-dark' width={40}/>}
                </Nav.Link>
              </Nav>
              <div className='w-100 p-2'>
                {tweet && <CommentForm tweet_id={tweet.id}/>}
              </div>
            </div>
            <div>
              {comments.map((comment) => (
                    <>
                      <Tweets tweet={comment.comment} user={comment.user} image_user={comment.thumbnail} user_image={user_image}/>
                    </>
                  ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Show