import { useState, useRef } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import instance from '../axiosUtil.jsx'
import { PiImageSquareFill } from "react-icons/pi";

function CommentForm({tweet_id}) {
  const inputRef = useRef(null);
  const formData = new FormData()
  const [post, setPost] = useState("")
  const [image, setImage] = useState()
  const comment_id = tweet_id

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
      post.tweet_id = comment_id
      const resCreateComment = await instance.post('/comments',post)

      if (!image) {
        window.location.reload();
      } else {
        const tweetId = resCreateComment.data.id
        const data = createFormData()
        formData.append('id', tweetId)
        const resCreateImage = await instance.post('/image',data)
        window.location.reload();
      }
    } catch(error) {
      console.log(error)
    }
  }

  const handleClick = () => {
    inputRef.current.click();
  }
  return (
    <>
      <Form.Group className="mb-3" controlId="formGridAddress3" >
        <Form.Control  name="tweet" value={post.content} onChange={onChange}  placeholder="返信をポスト" />
      </Form.Group>
      <div className='d-flex justify-content-between'>
        <Button component="label" variant="outlined" onClick={handleClick} >
          <h4>
            <PiImageSquareFill />
          </h4>
          <Form.Control type='file'  name="tweet" ref={inputRef} onChange={onChangeImage}  hidden/>
        </Button>
        <Button className='postButton' style={{"background-color": "#00acee" , "border-radius": "30px"}} variant="primary"  onClick={ () => submitData(tweet_id)}>返信</Button>
      </div>
    </>
  )
}

export default CommentForm