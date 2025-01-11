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

function Show() {
  const navigate = useNavigate();
  const params = useParams();
  const [tweets, setTweets] = useState([])
  const [user, setUser] = useState(null)
  const [image_url, setImageUrl] = useState(null)
  const [modalShow, setModalShow] = useState(false);

  const fetchUser = async() => {
    try {
      const response = await instance.get(`user/${params.id}`, params.id);
      setTweets(response.data.tweets)
      setUser(response.data.user)
      setImageUrl(response.data.image_urls)
    } catch(error) {
      console.log(error)
    }
  }

  const EditProfBtn = () => {
    return (
      <div className='btn btn-outline-dark' onClick={() => setModalShow(true)}>プロフィールを編集</div>
    );
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
                  {Cookies.get("id") == user.id && <EditProfBtn />}
                </div>
                <ModalComp image_url={image_url} isShow={modalShow} setIsModal={setModalShow}/>
              </div>
              <div className='h4 mt-3'>{user.name}</div>
              <div>{user.profile}</div>
              <div className='d-flex'>
                <div className='me-3'>
                  <span>
                    0
                  </span>
                  <span className='text-secondary'>
                    フォロー中
                  </span>
                </div>
                <div>
                  <span>
                    0
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
                      <Tweets tweet={tweet} user={user}/>
                    </>
                  ))}
                </div>
              </Tab>
              <Tab eventKey="comment" title="コメント一覧">
                <div>
                  {tweets.map((tweet) => (
                    <>
                      {tweet.comment_id && <Tweets tweet={tweet} user={user}/>}
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
