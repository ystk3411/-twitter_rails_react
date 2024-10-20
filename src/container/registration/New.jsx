import { useState,useEffect } from 'react'
import axios from 'axios'
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function New() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirmation, setPasswordConfirmation] = useState("")
  const params = {"name": name,
                  "email": email,
                  "password": password,
                  "password_confirmation": passwordConfirmation
                }

  const test = async() => {
    try {
      const response = await axios.post('http://localhost:3000/api/v1/users',params)
    } catch(error) {
      console.log(error)
    }
    // axios.post('http://localhost:3000/api/v1/users',params, {headers: headers}).then((res) => {
    //   console.log(res.data)
    //   return res.data
    // }).catch(function(error){
    //   console.log(error)
    // })
  }




  return (
    <>
      <Form>
        <h3>新規登録</h3>
        <Card>
          <Form.Group className="mb-3" controlId="formGridAddress1">
            <Form.Label>名前</Form.Label>
            <Form.Control value={name} name="name" onChange={(e) => setName(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGridAddress2">
            <Form.Label>Email</Form.Label>
            <Form.Control placeholder="sample@sample.com" type="email" value={email} name="email" onChange={(e) => setEmail(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGridAddress3" >
            <Form.Label>パスワード</Form.Label>
            <Form.Control type="password" value={password} name="password" onChange={(e) => setPassword(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGridAddress4">
            <Form.Label>パスワード(確認用)</Form.Label>
            <Form.Control type="password" value={passwordConfirmation} name="password_confirmation" onChange={(e) => setPasswordConfirmation(e.target.value)} />
          </Form.Group>
          <Button variant="primary"  onClick={() => test()}>登録</Button>
        </Card>
      </Form>
    </>
    
  )
}

export default New
