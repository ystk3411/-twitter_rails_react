import { useState, useEffect } from 'react'
import '../../App.css'
import instance from '../../axiosUtil.jsx'
import Header from '../../layouts/Header.jsx'
import Sidebar from '../../layouts/Sidebar.jsx'
import Messages from '../../layouts/Messages.jsx'
import Tweets from '../../layouts/Tweets.jsx'

function Index() {
  const [tweets, setTweets] = useState([])
  const [user_image, setUserImage] = useState(null)
 
  const fetchUser = async() => {
    try {
      const response = await instance.get(`bookmarks`);
      setTweets(response.data.tweets)
      setUserImage(response.data.user_image)
      console.log(tweets)
    } catch(error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchUser()
  },[])

  return (
    <>
      <Header />
      <div  className='container'>
        <Sidebar />
        <div className='w-50'>
          <div className='d-flex'>
            <h4 className='mt-4'>ブックマーク</h4>
          </div>
          <div className='w-100 mt-3'>
            {tweets.map((tweet) => {
              return (
                <Tweets tweet={tweet.tweet} user={tweet.user} image_user={tweet.image} user_image={user_image} retweet_id={tweet.retweet_id} favorite_id={tweet.favorite_id} bookmark_id={tweet.bookmark_id} count_retweet={tweet.count_retweet} count_favorite={tweet.count_favorite}/>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default Index
