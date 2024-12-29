import { useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import alt from '../assets/twitter_logo.jpg'
import instance from '../axiosUtil.jsx'

function ModalComp({image_url, isShow, setIsModal}) {

  const [profData, setProfData] = useState({name: undefined, profile: undefined, place: undefined, web_site: undefined, 
                                            birth_day: undefined, header: undefined, thumbnail: undefined})
  const formData = new FormData()

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

  const submitData = async() => {
    try {
      const data = await createFormData()
      const response = await instance.put(`/profile`, data);
      setProfData("")
      setIsModal(false)
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
  )
}

export default ModalComp