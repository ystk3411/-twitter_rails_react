import { useState, useRef, useEffect } from 'react'
import './App.css'
import Header from './layouts/Header.jsx'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Card from 'react-bootstrap/Card';
import Pagination from 'react-bootstrap/Pagination';
import instance from './axiosUtil.jsx'
import { FaXTwitter } from "react-icons/fa6";
import { IoMdHome } from "react-icons/io";
import { RiNotification2Fill } from "react-icons/ri";
import { FaEnvelope } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import { PiDotsThreeCircleFill } from "react-icons/pi";
import { PiImageSquareFill } from "react-icons/pi";

function Index() {
  const [post, setPost] = useState({content:""})
  const [posts, setPosts] = useState([])
  const [image, setImage] = useState()
  const [selectPage, setSelectPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)
  const inputRef = useRef(null);
  const formData = new FormData()

  let items = Array.from({ length: totalPage }, (_, index) => {
    const number = index + 1
    return (
      <Pagination.Item
        key={number}
        active={selectPage === number}
        onClick={() => setSelectPage(number)}
      >
        {number}
      </Pagination.Item>
    );
  })

  const submitData = async() => {
    try {
      const response1 = await instance.post('/tweets',post)
      console.log(response1)
       
      if (!image) return

      const tweetId = response1.data.id
      const data = await createFormData()
      formData.append('id', tweetId)
      const response2 = await instance.post('/image',data)
      setPost({content:""})
      setImage()
    } catch(error) {
      console.log(error)
    }
  }

  const fetchTweets = async() => {
    try {
      const response = await instance.get('/tweets', {params:{page:selectPage - 1}})
      const arrayPost = response.data.count
      const num = Math.floor(arrayPost / 10)
      setPosts(response.data.tweets)
      setTotalPage(num)
    } catch(error) {
      console.log(error)
    }
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

  useEffect(() => {
    fetchTweets()
  },[selectPage])

  return (
    <>
      <Header />
      <div  className='container'>
        <Nav defaultActiveKey="/home" className="flex-column">
          <h4><Nav.Link href="/home"><FaXTwitter /></Nav.Link></h4>
          <h4><Nav.Link href="/home"><IoMdHome />ホーム</Nav.Link></h4>
          <h4><Nav.Link href="/home"><RiNotification2Fill />通知</Nav.Link></h4>
          <h4><Nav.Link href="/home"><FaEnvelope />メッセージ</Nav.Link></h4>
          <h4><Nav.Link href="/home"><FaBookmark />ブックマーク</Nav.Link></h4>
          <h4><Nav.Link href="/home"><IoPerson />プロフィール</Nav.Link></h4>
          <h4><Nav.Link href="/home"><PiDotsThreeCircleFill />もっと見る</Nav.Link></h4>
        </Nav>
        <Form className='postForm'>
          <Form.Group className="mb-3" controlId="formGridAddress3" >
            <Form.Control value={post.content} name="tweet" onChange={onChange} placeholder="今どうしてる？" />
          </Form.Group>
          <div>
            <Button component="label" variant="outlined"  onClick={handleClick}>
              <h4>
                <PiImageSquareFill />
              </h4>
              <Form.Control type='file'  name="tweet" ref={inputRef} onChange={onChangeImage} hidden/>
            </Button>
          <Button className='postButton' variant="primary"  onClick={() => submitData()}>ポストする</Button>
          </div>
          <div className='tweets'>
            <div>
              {posts.map((tweet) => (
                <Card>
                  <div key={tweet.tweet.id}>{tweet.user.name}　{tweet.tweet.content}</div>
                </Card>
              ))}
            </div>
            <Pagination>{items}</Pagination>
          </div>
        </Form>
      </div>
    </>
  )
}

export default Index
