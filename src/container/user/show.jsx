import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import '../../App.css'
import instance from '../../axiosUtil.jsx'
import Header from '../../layouts/Header.jsx'
import Sidebar from '../../layouts/Sidebar.jsx'
import Tweets from '../../layouts/Tweets.jsx'
import alt from '../../assets/twitter_logo.jpg'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
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
  const [profData, setProfData] = useState({name: undefined, profile: undefined, place: undefined, web_site: undefined, birth_day: undefined, header: undefined, thumbnail: undefined})
  const [modalShow, setModalShow] = useState(false);
  const formData = new FormData()

  const fetchUser = async() => {
    try {
      const response = await instance.get(`user/${params.id}`, params.id);
      setTweets(response.data.tweets)
      setUser(response.data.user)
      setImageUrl(response.data.image_urls)
      console.log(response.data)
    } catch(error) {
      console.log(error)
    }
  }

  const submitData = async() => {
    try {
      const data = await createFormData()
      const response = await instance.put(`/profile`, data);
      setProfData("")
      setModalShow(false);
    } catch(error) {
      console.log(error)
    }
  }

  const createFormData = () => {        
    for (var key in profData){
      console.log(key);
      if(profData[key] != undefined){
        formData.append(`user[${key}]`, profData[key])
      }
    }
    return formData
  }

  const onChange = (e) => {
    const {name, value} = e.target
    setProfData({...profData, [name]: value})
  }

  const onChangeImage = (e) => {
    const selectedImage = e.target.files[0]
    const name = e.target.name
    setProfData({...profData,[name]:selectedImage})
    console.log(profData)
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
                <Modal
                show={modalShow}
                onHide={() => setModalShow(false)}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                animation={false}
              >
                <Modal.Header closeButton>
                  <Modal.Title id="contained-modal-title-vcenter">
                    プロフィールを編集
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form>  
                    <div className='' style={{height:300}}>
                      {image_url ? <img src={image_url.header} alt="画像" className='w-100 h-100'/> : <img src={alt} alt="画像" className='w-100 h-100'/>}
                    </div>
                    <div className='w-25' style={{height:150,marginTop: -100}}>
                      {image_url ? <img src={image_url.thumbnail} alt="画像" className='rounded-circle border border-4 border-dark h-100' style={{width:150}}/> : <img src={alt} alt="画像" className='rounded-circle border border-4 border-dark w-100' />}
                    </div>
                    <Form.Label>名前</Form.Label>
                    <Form.Control placeholder='名前' value={profData.name} name='name' onChange={onChange} />
                    <Form.Label>自己紹介</Form.Label>
                    <Form.Control placeholder='自己紹介' value={profData.comment} name='profile' onChange={onChange} />
                    <Form.Label>場所</Form.Label>
                    <Form.Control placeholder='場所' value={profData.place} name='place' onChange={onChange} />
                    <Form.Label>ウェブサイト</Form.Label>
                    <Form.Control placeholder='ウェブサイト' value={profData.web_site} name='web_site' onChange={onChange}  />
                    <Form.Label>誕生日</Form.Label>
                    <Form.Control  type='date' value={profData.birth_day} name='birth_day' onChange={onChange} />
                    <Form.Label>ヘッダー</Form.Label>
                    <Form.Control type='file'  name="header" onChange={onChangeImage} />
                    <Form.Label>サムネイル</Form.Label>
                    <Form.Control type='file'  name="thumbnail" onChange={onChangeImage} />
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <Button onClick={() => submitData()}>保存</Button>
                </Modal.Footer>
              </Modal>
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
              <Tab eventKey="retweet" title="リポスト">
                Tab content for Profile
              </Tab>
              <Tab eventKey="comment" title="コメント" >
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
