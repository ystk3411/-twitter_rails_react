import { useState } from 'react'
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import instance from '../../axiosUtil.jsx'
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

function Sign_in() {
  const [user, setUser] = useState({email: "", password: ""})
  const navigate = useNavigate();
  const submitData = async() => {
    try {
      const response = await instance.post('/users/sign_in',user)
      Cookies.set("accessToken",response.headers["access-token"])
      Cookies.set("client",response.headers["client"])
      Cookies.set("uid",response.headers["uid"])
      navigate("/")
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
        <h3>ログイン</h3>
        <Card>
          <Form.Group className="mb-3" controlId="formGridAddress2">
            <Form.Label>メールアドレス</Form.Label>
            <Form.Control placeholder="sample@sample.com" type="email" value={user.email} name="email" onChange={onChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGridAddress3" >
            <Form.Label>パスワード</Form.Label>
            <Form.Control type="password" value={user.password} name="password" onChange={onChange} />
          </Form.Group>
          <Button variant="primary"  onClick={() => submitData()}>ログイン</Button>
        </Card>
      </Form>
    </>
    
  )
}

export default Sign_in
