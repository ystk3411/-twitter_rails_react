import { useState, useEffect, useRef } from 'react'
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import './App.css'
import instance from './axiosUtil.jsx'
import Header from './layouts/Header.jsx'
import Sidebar from './layouts/Sidebar.jsx'
import ModalComment from './layouts/ModalComment.jsx'
import { IoChatbubbleOutline } from "react-icons/io5";
import { CiRepeat } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";
import { GoUpload } from "react-icons/go";
import { PiImageSquareFill } from "react-icons/pi";
import { HiDotsHorizontal } from "react-icons/hi";
import { FaRegTrashAlt } from "react-icons/fa";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
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
  const [post, setPost] = useState({content:"", tweet_id:""})
  const [image, setImage] = useState()
  const inputRef = useRef(null);
  const formData = new FormData()
  const userId = Cookies.get("id");

  const onChange = (e) => {
    setPost({content:e.target.value})
  }

  const onChangeImage = (e) => {
    const selectedImage = e.target.files[0]
    setImage(selectedImage)
  }

  const createFormData = () => {     
    if (!image) return                    
    formData.append('tweet[image]', image)
    return formData
  }

  function handleClick() {
    inputRef.current.click();
  }

  const submitData = async() => {
    try {
      post.tweet_id = tweet.id
      const response1 = await instance.post('/comments',post)
      setPost({content:""})
       
      if (!image) return

      const tweetId = response1.data.id
      const data = await createFormData()
      formData.append('id', tweetId)
      const response2 = await instance.post('/image',data)
      setImage()
    } catch(error) {
      console.log(error)
    }
  }

  const fetchTweet = async() => {
    try {
      const response = await instance.get(`tweets/${params.id}`, params.id);
      console.log(response)
      setTweet(response.data.tweet)
      setUser(response.data.user)
      setUserImage(response.data.user_image)
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
        <Sidebar />
        <div className='w-50'>
          <div className='d-flex'>
            <button className='returnButton' onClick={() => navigate(-1)}><h4 className='p-4'>←</h4></button>
            <h4 className='mt-4'>ポストする</h4>
          </div>
          <div className='w-100 p-4'>
            { user ?
              <>
                <div className='d-flex gap-2'>
                  <div>
                    <a href={`/user/${user.id}`}>
                      {tweet.image_user ? 
                        <img src={tweet.image_user} className='rounded-circle border border-2 border-dark' width={40}/> 
                        : 
                        <img src={alt} className='rounded-circle border border-2 border-dark' width={40}/>
                      }
                    </a>
                  </div>
                  <div className='w-100 flex-column' >
                    <div className='d-flex justify-content-between'>
                      <div className='fw-bold'>
                        {user ? <a className='text-dark' href={`/user/${user.id}`} style={{textDecoration :'none'}}>{user.name}</a> : null}
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
                      {tweet.image_url ? <img src={tweet.image_url} className='rounded-4 border border-1 w-100'></img> : null}
                    </div>

                  </div> 
                </div>
              </>
              : 
              null 
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
                <Form.Group className="mb-3" controlId="formGridAddress3" >
                  <Form.Control  name="tweet" value={post.content} onChange={onChange}  placeholder="返信をポスト" />
                </Form.Group>
                <div className='d-flex justify-content-between'>
                  <Button component="label" variant="outlined" onClick={handleClick} >
                    <h4>
                      <PiImageSquareFill />
                    </h4>
                    <Form.Control type='file'  name="tweet" ref={inputRef} onChange={onChangeImage}  hidden/>
                  </Button>
                  <Button className='postButton' variant="primary"  onClick={() => submitData()}>返信</Button>
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