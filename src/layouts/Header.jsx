import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";

function Header() {
  const isLogIn = !!Cookies.get("accessToken");
  const navigate = useNavigate()
  const buttonColor = isLogIn ? "danger" : "primary"
  const buttonText = isLogIn ? "ログアウト" : "ログイン"
  const handleView = () => {
    navigate('/session/sign_in')
  }
  return (
    <Navbar expand="lg" className="header justify-content-between">
      <Navbar.Brand href="/">Xクローン</Navbar.Brand>
      <Form>
        <Button className='postButton' variant={buttonColor}  onClick={() => handleView()}>{buttonText}</Button>
      </Form>
    </Navbar>
  )
}

export default Header
