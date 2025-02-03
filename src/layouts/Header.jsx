import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Cookies from 'js-cookie';
import instance from '../axiosUtil.jsx'
import { useNavigate } from "react-router-dom";

function Header() {
  const isLogIn = !!Cookies.get("accessToken");
  const navigate = useNavigate()
  const buttonColor = isLogIn ? "danger" : "primary"
  const buttonText = isLogIn ? "ログアウト" : "ログイン"
  const onClickSignOut = async() => {
    try {
      const user = {accessToken: Cookies.get("accessToken"),
                    client: Cookies.get("client"),
                    uid: Cookies.get("uid")}
      const response = await instance.delete('/users/sign_out',user)
      Cookies.remove("accessToken")
      Cookies.remove("client")
      Cookies.remove("uid")
      navigate('/session/sign_in')
    } catch(error) {
      console.log(error)
    }
  }
  const handleView = () => {
    if(isLogIn) {
      onClickSignOut()
      console.log(isLogIn)
    } else {
      navigate('/session/sign_in')
    }
  }
  return (
    <Navbar expand="lg" className="header justify-content-between ">
      <Navbar.Brand href="/tweets">Xクローン</Navbar.Brand>
      <Form>
        <Button className='postButton' variant={buttonColor}  onClick={() => handleView()}>{buttonText}</Button>
      </Form>
    </Navbar>
  )
}

export default Header
