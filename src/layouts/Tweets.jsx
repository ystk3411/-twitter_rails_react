import { NavLink } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Dropdown from 'react-bootstrap/Dropdown';
import { IoChatbubbleOutline } from "react-icons/io5";
import { CiRepeat } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";
import { IoStatsChart } from "react-icons/io5";
import { HiDotsHorizontal } from "react-icons/hi";
import { FaRegTrashAlt } from "react-icons/fa";
import alt from '../assets/twitter_logo.jpg'
import Cookies from 'js-cookie';
import instance from '../axiosUtil.jsx'

function Tweets(tweet) {
  const userId = Cookies.get("id");
  const onClickDelete = async(id) => {
    const response = await instance.delete(`/tweets/${id}`, id);
    window.location.reload();
  }
  return (
    <div className='d-flex border-bottom p-2 gap-2'>
      <Nav>
        <Nav.Link href={`user/${userId}`}>
        {tweet.image_user ? <img src={tweet.image_user} className='rounded-circle border border-2 border-dark' width={40}/> : <img src={alt} className='rounded-circle border border-2 border-dark' width={40}/>}
        </Nav.Link>
      </Nav>
      <div className='w-100'>
          <div className='w-100 flex-column' >
            <div className='d-flex justify-content-between'>
              <div className='fw-bold'>
                <a className='text-dark' href='' style={{textDecoration :'none'}}>{tweet.user.name}</a>
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
            <NavLink style={{textDecoration :'none'}} to={`tweet/${tweet.tweet.id}`}>
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
              <IoChatbubbleOutline />
                <span className='ms-2'>
                  0
                </span>
            </div>
            <div>
              <CiRepeat />
                <span className='ms-2'>
                  0
                </span>
            </div>
            <div>
              <CiHeart />
                <span className='ms-2'>
                  0
                </span>
            </div>
            <div>
              <IoStatsChart />
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