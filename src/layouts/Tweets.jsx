import { useState, useRef } from 'react'
import { NavLink } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import { IoChatbubbleOutline } from "react-icons/io5";
import { CiRepeat } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";
import { IoStatsChart } from "react-icons/io5";
import { HiDotsHorizontal } from "react-icons/hi";
import { FaRegTrashAlt } from "react-icons/fa";
import alt from '../assets/twitter_logo.jpg'
import Cookies from 'js-cookie';
import instance from '../axiosUtil.jsx'
import ModalComment from './ModalComment.jsx'

function Tweets(tweet) {
  const [modalShow, setModalShow] = useState(false);
  const inputRef = useRef(null);
  const userId = Cookies.get("id");

  const onClickDelete = async(id) => {
    const response = await instance.delete(`/tweets/${id}`, id);
    window.location.reload();
  }

    
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
  return (
    <div className='d-flex border-bottom p-2 gap-2'>
      <Nav>
        <Nav.Link href={`/user/${tweet.user.id}`}>
        {tweet.image_user ? <img src={tweet.image_user} className='rounded-circle border border-2 border-dark' width={40}/> : <img src={alt} className='rounded-circle border border-2 border-dark' width={40}/>}
        </Nav.Link>
      </Nav>
      <div className='w-100 p-2'>
          <div className='w-100 flex-column' >
            <div className='d-flex justify-content-between'>
              <div className='fw-bold'>
                <a className='text-dark' href={`/user/${tweet.user.id}`} style={{textDecoration :'none'}}>{tweet.user.name}</a>
              </div>
              <Dropdown>
                <Dropdown.Toggle bsPrefix as={"none"} >
                  <NavLink className='text-dark'><HiDotsHorizontal/></NavLink>
                </Dropdown.Toggle>
                
                <Dropdown.Menu>
                  {tweet.user.id == userId ? <Dropdown.Item className='text-danger' onClick={ () => onClickDelete(tweet.tweet.id)}><FaRegTrashAlt />削除</Dropdown.Item> : null }
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <NavLink style={{textDecoration :'none'}} to={`/tweets/tweet/${tweet.tweet.id}`}>
              <div className='w-100 text-dark'>
                {tweet.tweet.content}
              </div>
              <div className='w-100'>
                {tweet.tweet.image_url ? <img src={tweet.tweet.image_url} className='rounded-4 border border-1 w-100'></img> : null}
              </div>
            </NavLink>
          </div>
        <div className='mt-3'>
          <div className='d-flex justify-content-between mt-3'>
            <div>
              <Button component="label" variant="outlined"  onClick={() => setModalShow(true)}>
                <IoChatbubbleOutline />
                <Form.Control type='file'  name="tweet" ref={inputRef} onChange={onChangeImage} hidden/>
              </Button>
              <span className='ms-2'>
                0
              </span>
              {tweet.user_image ? <ModalComment  isShow={modalShow} setIsModal={setModalShow} tweet={tweet} user_image={tweet.user_image}/> 
              : 
              <ModalComment  isShow={modalShow} setIsModal={setModalShow} tweet={tweet} user_image={alt}/>}
            </div>
            <div>
              <Button component="label" variant="outlined"  onClick={handleClick}>
                <CiRepeat />
                <Form.Control type=''  name="tweet" ref={inputRef} onChange={onChangeImage} hidden/>
              </Button>
              <span className='ms-2'>
                0
              </span>
            </div>
            <div>
              <Button component="label" variant="outlined"  onClick={handleClick}>
                <CiHeart />
                <Form.Control type=''  name="tweet" ref={inputRef} onChange={onChangeImage} hidden/>
              </Button>
              <span className='ms-2'>
                0
              </span>
            </div>
            <div>
              <Button component="label" variant="outlined"  onClick={handleClick}>
                <IoStatsChart />
                <Form.Control type=''  name="tweet" ref={inputRef} onChange={onChangeImage} hidden/>
              </Button>
              <span className='ms-2'>
                0
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Tweets