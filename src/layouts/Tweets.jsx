import Nav from 'react-bootstrap/Nav';
import { NavLink } from 'react-router-dom';
import { IoChatbubbleOutline } from "react-icons/io5";
import { CiRepeat } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";
import { IoStatsChart } from "react-icons/io5";
import alt from '../assets/twitter_logo.jpg'
import Cookies from 'js-cookie';

function Tweets(tweet) {
  return (
    <div className='d-flex border-bottom p-2 gap-2'>
      <NavLink to="">
        <img src={alt} className='rounded-circle border border-2 border-dark' width={40}/>
      </NavLink>
      <div className='w-100'>
        <NavLink style={{textDecoration :'none'}} to="/">
          <div className='w-100 flex-column text-dark' >
            <div className='d-flex justify-content-between'>
              <div className='fw-bold'>
                {tweet.user.name}
              </div>
            </div>
            <div className='w-100'>
              {tweet.tweet.content}
            </div>
            {}
            <div className='w-100'>
              {tweet.tweet.image_url ? <img src={tweet.tweet.image_url} className='rounded-4 border border-1 w-100'></img> : null}
            </div>
          </div>
        </NavLink>
        
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