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
  const [retweetId, setRetweetId] = useState(tweet.retweet_id)
  const [favoriteId, setFavoriteId] = useState(tweet.favorite_id)
  const [countRetweet, setCountRetweet] = useState(tweet.count_retweet)
  const [countFavorite, setCountFavorite] = useState(tweet.count_favorite)
  const inputRef = useRef(null);
  const userId = Cookies.get("id");

  const onClickDelete = async(id) => {
    const response = await instance.delete(`/tweets/${id}`, id);
    window.location.reload();
  }

  const onClickRetweet = async(id) => {
    if(retweetId == null) {
      const response = await instance.post(`/tweets/${id}/retweets`, id);
      setRetweetId(response.data.retweet.id)
      setCountRetweet(response.data.count_retweets)
    } else {
      const response = await instance.delete(`/tweets/${id}/retweets/${retweetId}`, id);
      setRetweetId(null)
      setCountRetweet(response.data.count_retweets)
    }
  }

  const onClickFavorite = async(id) => {
    if(favoriteId == null) {
      const response = await instance.post(`/tweets/${id}/favorites`, id);
      setFavoriteId(response.data.favorite.id)
      setCountFavorite(response.data.count_favorites)
    } else {
      const response = await instance.delete(`/tweets/${id}/favorites/${favoriteId}`, id);
      setFavoriteId(null)
      setCountFavorite(response.data.count_favorites)
    }
  }

  const onChangeImage = (e) => {
    const selectedImage = e.target.files[0]
    setImage(selectedImage)
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
            <a style={{textDecoration :'none'}} href={`/tweets/tweet/${tweet.tweet.id}`}>
              <div className='w-100 text-dark'>
                {tweet.tweet.content}
              </div>
              <div className='w-100'>
                {tweet.tweet.image_url ? <img src={tweet.tweet.image_url} className='rounded-4 border border-1 w-100'></img> : null}
              </div>
            </a>
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
              <ModalComment  isShow={modalShow} setIsModal={setModalShow} tweet={tweet} user_image={tweet.user_image}/>
            </div>
            <div>
              <Button component="label" variant="outlined"  onClick={() => onClickRetweet(tweet.tweet.id)}>
                {retweetId ? <CiRepeat style={{color:"#20c997"}}/> : <CiRepeat/>}
              </Button>
              <span className='ms-2'>
                {countRetweet}
              </span>
            </div>
            <div>
              <Button component="label" variant="outlined"  onClick={() => onClickFavorite(tweet.tweet.id)}>
                {favoriteId ? <CiHeart style={{color:"#d63384"}}/> : <CiHeart/>}
              </Button>
              <span className='ms-2'>
                {countFavorite}
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