import { IoChatbubbleOutline } from "react-icons/io5";
import { CiRepeat } from "react-icons/ci";
import { IoPersonSharp } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import alt from '../assets/twitter_logo.jpg'

function Notifications({actionType, notification}) {
  console.log(notification)
  let image = ''
  let textNotification = ''
  let textTweet = ''
  let url = ''
  const ActionTypeIcon = () => {
    if(actionType == 'favorite'){
      return(<FaHeart size={40} style={{color:"#d63384"}}/>) 
    } else if(actionType == 'tweet'){
      return(<IoChatbubbleOutline size={40}/>)
    } else if(actionType == 'retweet'){
      return(<CiRepeat size={40} style={{color:"#20c997"}}/>) 
    } else if(actionType == 'relationship'){
      return(<IoPersonSharp size={40} className='text-primary'/>)
    }
  }

  if(actionType == 'favorite'){
    textNotification = notification.user.name + 'さんがあなたのポストをいいねしました'
    textTweet = notification.tweet.content
    url = `/tweets/tweet/${notification.tweet.id}`
  } else if(actionType == 'tweet'){
    textNotification = notification.user.name + 'さんがあなたのポストにコメントしました'
    textTweet = notification.tweet.content
    url = `/tweets/tweet/${notification.tweet.id}`
  } else if(actionType == 'retweet'){
    textNotification = notification.user.name + 'さんがあなたのポストをリツイートしました'
    textTweet = notification.tweet.content
    url = `/tweets/tweet/${notification.tweet.id}`
  } else if(actionType == 'relationship'){
    textNotification = notification.user.name + 'さんがあなたをフォローしました'
    url = `/user/${notification.notification.visitor_id}`
  }

  if(notification.image){
    image = notification.image
  } else {
    image = alt
  }



  return (
    <div className='d-flex border-bottom p-2 gap-2'>
      <div>
        <ActionTypeIcon/>
      </div>
      <div className='w-100'>
        <a href={url} style={{textDecoration :'none'}}>
          <div className='w-100 flex-column' >
            <div className='d-flex justify-content-between'>
              <div className='fw-bold'>
                <a className='text-dark' href={`/user/${notification.notification.visitor_id}`} style={{textDecoration :'none'}}><img src={image} className='rounded-circle border border-2 border-dark' width={40}></img></a>
              </div>
            </div>
            <a  href={url} style={{textDecoration :'none'}}>
              <div className='w-100 text-dark mt-2'>
                {textNotification}
                <div className='mt-2 text-secondary'>
                  {textTweet}
                </div>
              </div>
              
            </a>
          </div>
        </a>
      </div>
    </div>
  )
}

export default Notifications