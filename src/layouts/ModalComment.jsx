import { useState, useRef } from 'react'
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import alt from '../assets/twitter_logo.jpg'
import instance from '../axiosUtil.jsx'
import { PiImageSquareFill } from "react-icons/pi";

function ModalComment({user_image, tweet , isShow, setIsModal}) {
  const inputRef = useRef(null);
  const formData = new FormData()
  const [post, setPost] = useState({content:"", tweet_id:""})
  const [image, setImage] = useState()

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

  const submitData = async() => {
    try {
      post.tweet_id = tweet.tweet.id
      const response1 = await instance.post('/comments',post)
      setPost({content:""})
       
      if (!image) return

      const tweetId = response1.data.id
      const data = await createFormData()
      formData.append('id', tweetId)
      const response2 = await instance.post('/image',data)
      setImage()
    } catch(error) {
      console.log(error)
    }
  }

  function handleClick() {
    inputRef.current.click();
  }

  return (
    <Modal
    show={isShow}
    onHide={() => setIsModal(false)}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
    animation={false}
    >
      <Modal.Header closeButton>
      </Modal.Header>
      <Modal.Body>
        <div className='w-100 p-2'>
          <div className='d-flex p-2 gap-2'>
      <div>
        {tweet.image_user ? <img src={tweet.image_user} className='rounded-circle border border-2 border-dark' width={40}/> : <img src={alt} className='rounded-circle border border-2 border-dark' width={40}/>}
        <div className='d-flex h-100 justify-content-center'>
          <div className="vr "></div>
        </div>
      </div>
      <div className='w-100'>
        <div className='w-100 flex-column' >
            <div className='d-flex justify-content-between'>
              <div className='fw-bold'>
                {tweet.user.name}
              </div>
            </div>
            <div className='w-100 text-dark'>
              {tweet.tweet.content}
            </div>
            <div className='w-100'>
              {tweet.tweet.image_url ? <img src={tweet.tweet.image_url} className='rounded-4 border border-1 w-100'></img> : null}
            </div>
          </div>
        </div>
      </div>
      <div className='d-flex p-2 gap-2 mt-5'>
        <div>
          {user_image ? <img src={user_image} className='rounded-circle border border-2 border-dark' width={40}/> : <img src={alt} className='rounded-circle border border-2 border-dark' width={40}/>}
        </div>
        <Form.Group className="w-100" controlId="formGridAddress3" >
          <Form.Control value={post.content} name="tweet" as='textarea' onChange={onChange} placeholder="返信をポスト" />
        </Form.Group>
      </div>
      <div className='d-flex justify-content-between mt-3'>
        <Button component="label" variant="outlined"  onClick={handleClick}>
          <h4>
            <PiImageSquareFill />
          </h4>
          <Form.Control type='file'  name="tweet" ref={inputRef} onChange={onChangeImage} hidden/>
        </Button>
        <Button className='postButton' variant="primary" style={{"background-color": "#00acee" , "border-radius": "30px"}}  onClick={() => submitData()}>ポストする</Button>
      </div>
        </div>
      </Modal.Body>

    </Modal>
  )
}

export default ModalComment