import { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom';
import '../../App.css'
import instance from '../../axiosUtil.jsx'
import Header from '../../layouts/Header.jsx'
import Sidebar from '../../layouts/Sidebar.jsx'
import Messages from '../../layouts/Messages.jsx'
import Message from '../../layouts/Message.jsx'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import { PiImageSquareFill } from "react-icons/pi";
import { BsCaretRight } from "react-icons/bs";

function Show() {
  const [groups, setGroups] = useState([])
  const [anotherEntry, setAnotherEntry] = useState([])
  const [messages, setMessages] = useState([])
  const [post, setPost] = useState({content:""})
  const [image, setImage] = useState()
  const params = useParams();
  const inputRef = useRef(null);
  const formData = new FormData()

  const fetchUser = async() => {
    try {
      const response = await instance.get(`${params.id}/messages`, params.id);
      setGroups(response.data.entries_info)
      setAnotherEntry(response.data.another_entry_info)
      setMessages(response.data.messages)
    } catch(error) {
      console.log(error)
    }
  }

  const submitData = async() => {
    try {
      const resPostMessage = await instance.post(`groups/${params.id}/messages`,post)
      const resGetMessages = await instance.get(`${params.id}/messages`, params.id);
      setMessages(resGetMessages.data.messages)
      setPost({content:""})
       
      if (!image) return

      const messageId = resPostMessage.data.id
      const data = await createFormData()
      formData.append('id', messageId)
      const resPostImage = await instance.post('/messages_image',data)
      setImage()
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

  function handleClick() {
    inputRef.current.click();
  }

  const createFormData = () => {     
    if (!image) return                    
    formData.append('message[image]', image)
    return formData
  }

  useEffect(() => {
    fetchUser()
  },[])

  return (
    <>
      <Header />
      <div  className='container'>
        <Sidebar />
        <div className='w-25'>
          <div className='d-flex'>
            <h4 className='mt-4'>メッセージ</h4>
          </div>
          <div className='w-100 mt-3'>
              {groups.map((group) => (
                <Messages group={group} />
              ))}
          </div>
        </div>
        <div className='d-flex flex-column w-50 vh-100'>
          <div>
            <h4 className='mt-4'>{anotherEntry.user && anotherEntry.user.name}</h4>
          </div>
          <div className='d-flex flex-column p-3 align-items-center border-bottom'>
            <div>
                {anotherEntry.user &&
                  <a href={`/user/${anotherEntry.user.id}`}>
                    <img src={anotherEntry.thumbnail} className='rounded-circle border border-2 border-dark' width={70}/> 
                  </a>
                }
            </div>
            <div>
              {anotherEntry.user?.name ?? ""}
            </div>
            <div className='mt-3'>
              {anotherEntry.user?.profile ?? ""}
            </div>
          </div>
          <div className='mt-3 h-100 overflow-auto'>
            <div className='mb-auto'>
              {messages.map((message) => {
                return (
                  <Message message={message} />
                )
              })}
            </div>
          </div>
          <div className='mt-auto border-top'>
            <InputGroup className="mt-3">
              <Button component="label" variant="outlined"  onClick={handleClick}>
                <h4>
                  <PiImageSquareFill />
                </h4>
                <Form.Control type='file'  name="tweet" ref={inputRef} onChange={onChangeImage} hidden/>
              </Button>
              <Form.Control
                placeholder="新しいメッセージを作成"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                onChange={onChange}
                name='comment'
                value={post.content}
              />
              <Button variant="outline-secondary" id="button-addon2" onClick={submitData}>
                <BsCaretRight />
              </Button>
            </InputGroup>
          </div>
        </div>
      </div>
    </>
  )
}

export default Show
