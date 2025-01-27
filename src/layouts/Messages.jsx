import { IoChatbubbleOutline } from "react-icons/io5";
import { CiRepeat } from "react-icons/ci";
import { IoPersonSharp } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import alt from '../assets/twitter_logo.jpg'
import Button from 'react-bootstrap/Button';

function Messages({group}) {
  return (
    <div className='d-flex'>
      <div className='w-100'>
        <a href={`messages/${group.entry.room_id}`}>
          <Button className="w-100" variant="light">
            <div className='d-flex gap-2' >
              <div className='d-flex justify-content-between'>
                <div className='fw-bold'>
                {group &&
                  <a href={`/user/${group.user.id}`}>
                    <img src={group.thumbnail} className='rounded-circle border border-2 border-dark' width={40}/> 
                  </a>
                }
                </div>
              </div>
              <div className="d-flex align-items-center">
                <div className='w-100 text-dark'>
                  {group && group.user.name}
                </div>
              </div>
            </div>
          </Button>
        </a>
      </div>
    </div>
  )
}

export default Messages