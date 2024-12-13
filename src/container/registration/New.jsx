import { useState } from 'react'
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import instance from '../../axiosUtil.jsx'
import { useNavigate } from 'react-router-dom';

function New() {
  const [user, setUser] = useState({name: "", email: "", password: "", password_confirmation:"",confirm_success_url:"http://localhost:5173/session/sign_in"})
  const navigate = useNavigate();
  const submitData = async() => {
    try {
      const response = await instance.post('/users',user)
      navigate("/session/sign_in")
    } catch(error) {
      console.log(error)
    }
  }
  const onChange = (e) => {
    const {name, value} = e.target
    setUser({...user, [name]: value})
  }

  return (
    <>
      <Form>
        <h3>新規登録</h3>
        <Card>
          <Form.Group className="mb-3" controlId="formGridAddress1">
            <Form.Label>名前</Form.Label>
            <Form.Control value={user.name} name="name" onChange={onChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGridAddress2">
            <Form.Label>Email</Form.Label>
            <Form.Control placeholder="sample@sample.com" type="email" value={user.email} name="email" onChange={onChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGridAddress3" >
            <Form.Label>パスワード</Form.Label>
            <Form.Control type="password" value={user.password} name="password" onChange={onChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGridAddress4">
            <Form.Label>パスワード(確認用)</Form.Label>
            <Form.Control type="password" value={user.password_confirmation} name="password_confirmation" onChange={onChange} />
          </Form.Group>
          <Button variant="primary"  onClick={() => submitData()}>登録</Button>
        </Card>
      </Form>
    </>
    
  )
}

export default New
