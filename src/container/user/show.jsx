import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import '../../App.css'
import instance from '../../axiosUtil.jsx'
import Header from '../../layouts/Header.jsx'
import Sidebar from '../../layouts/Sidebar.jsx'
import ModalComp from '../../layouts/Modal.jsx'
import Tweets from '../../layouts/Tweets.jsx'
import alt from '../../assets/twitter_logo.jpg'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Spinner from 'react-bootstrap/Spinner';
import Cookies from 'js-cookie';
import { FaRegEnvelope } from "react-icons/fa";

function Show() {
  const navigate = useNavigate();
  const params = useParams();
  const [tweets, setTweets] = useState([])
  const [user, setUser] = useState(null)
  const [image_url, setImageUrl] = useState(null)
  const [modalShow, setModalShow] = useState(false);
  const [isFollow, setIsFollow] = useState(false)
  const [countFollow, setCountFollow] = useState(null)
  const [countFollowers, setCountFollowers] = useState(null)

  const fetchUser = async() => {
    try {
      const response = await instance.get(`user/${params.id}`, params.id);
      setTweets(response.data.tweets)
      setUser(response.data.user)
      setImageUrl(response.data.image_urls)
      setIsFollow(response.data.is_follow)
      setCountFollow(response.data.count_follow)
      setCountFollowers(response.data.count_followers)
    } catch(error) {
      console.log(error)
    }
  }

  const EditProfBtn = () => {
    return (
      <div className='btn btn-outline-dark' onClick={() => setModalShow(true)}>プロフィールを編集</div>
    );
  }

  const MessageBtn = () => {
    return (
      <div className='btn btn-outline-dark me-2' onClick={() => onClickMessage()}><FaRegEnvelope /></div>
    );
  }

  const FollowBtn = () => {
    if (isFollow ==true){
      return (
        <>
          <MessageBtn />
          <div className='btn btn-outline-danger' onClick={() => onClickUnfollow()}>フォロー解除</div>
        </>
      );
    } else {
      return (
        <>
          <MessageBtn />
          <div className='btn btn-outline-dark' onClick={() => onClickFollow()}>フォロー</div>
        </>
      );
    }
  }

  const onClickFollow = async() => {
    try {
      const response = await instance.post(`/users/${params.id}/follow`, params.id);
      setIsFollow(response.data.is_follow)
      setCountFollow(response.data.count_follow)
      setCountFollowers(response.data.count_followers)
      console.log(response)
    } catch(error) {
      console.log(error)
    }
  }

  const onClickUnfollow = async() => {
    try {
      const response = await instance.delete(`/users/${params.id}/unfollow`, params.id);
      setIsFollow(response.data.is_follow)
      setCountFollow(response.data.count_follow)
      setCountFollowers(response.data.count_followers)
      console.log(response)
    } catch(error) {
      console.log(error)
    }
  }

  const onClickMessage = async() => {
    try {
      const response = await instance.post(`groups`, params);
      navigate(`/messages`)
      console.log(response)
    } catch(error) {
      console.log(error)
    } 
  }

  useEffect(() => {
    fetchUser()
  },[modalShow])

  return (
    <>
      <Header />
      <div  className='container'>
        <Sidebar />
        {user && tweets ? 
        <div className='w-50'>
          <div className='d-flex'>
            <button className='returnButton' onClick={() => navigate(-1)}><h4 className='p-4'>←</h4></button>
            <h4 className='mt-4'>{user.name}</h4>
          </div>
          <div className='w-100 h-50'>
            <div style={{height: "300px"}}>
              {image_url ? <img src={image_url.header} alt="画像" className='w-100 h-100'/> : <img src={alt} alt="画像" className='w-100 h-100'/>}
            </div>
            <div className='d-flex flex-column p-3'>
              <div className='d-flex justify-content-between h-25'>
                <div className='w-25' style={{height: "150px", marginTop: -100}}>
                  {image_url ? <img src={image_url.thumbnail} alt="画像" className='rounded-circle border border-4 border-dark h-100'  style={{width:150}}/> : <img src={alt} alt="画像" className='rounded-circle border border-4 border-dark h-100'/>}
                </div>
                <div>
                  {/* <MessageBtn /> */}
                  {Cookies.get("id") == user.id ? <EditProfBtn /> : <FollowBtn />}
                </div>
                <ModalComp image_url={image_url} isShow={modalShow} setIsModal={setModalShow}/>
              </div>
              <div className='h4 mt-3'>{user.name}</div>
              <div>{user.profile}</div>
              <div className='d-flex'>
                <div className='me-3'>
                  <span>
                    {countFollow}
                  </span>
                  <span className='text-secondary'>
                    フォロー中
                  </span>
                </div>
                <div>
                  <span>
                    {countFollowers}
                  </span>
                  <span className='text-secondary'>
                    フォロワー
                  </span>
                </div>
              </div>
            </div>
            <Tabs
            id="controlled-tab-example"
            defaultActiveKey="tweet"
            className="mb-3"
            fill
            >
              <Tab eventKey="tweet" title="ポスト">
                <div>
                  {tweets.map((tweet) => (
                    <>
                      <Tweets tweet={tweet.tweet} user={user} retweet_id={tweet.retweet_id} count_retweet={tweet.count_retweet}/>
                    </>
                  ))}
                </div>
              </Tab>
              <Tab eventKey="comment" title="コメント一覧">
                <div>
                  {tweets.map((tweet) => (
                    <>
                      {tweet.tweet.comment_id && <Tweets tweet={tweet.tweet} user={user} retweet_id={tweet.retweet_id} count_retweet={tweet.count_retweet} />}
                    </>
                  ))}
                </div>
              </Tab>
              <Tab eventKey="retweet" title="リツイート" >
                Tab content for Contact
              </Tab>
              <Tab eventKey="like" title="いいね" >
                Tab content for Contact
              </Tab>
            </Tabs>
          </div>
        </div>
         :
        <div className='position-absolute top-50 start-50'>
          <Spinner animation="border" variant="primary" />
        </div> 
        }
      </div>
    </>
  )
}

export default Show
