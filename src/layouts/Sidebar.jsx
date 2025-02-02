import { useState } from 'react'
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import { FaXTwitter } from "react-icons/fa6";
import { IoMdHome } from "react-icons/io";
import { RiNotification2Fill } from "react-icons/ri";
import { FaEnvelope } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import { FaHeartBroken } from "react-icons/fa";
import Cookies from 'js-cookie';
import ModalDeactivate from './ModalDeactivate.jsx'

function Sidebar() {
  const userId = Cookies.get("id");
  const [modalShow, setModalShow] = useState(false);
  
  return (
    <Nav className="flex-column w-25 h-100 sticky-top">
      <h4><Nav.Link href="/tweets"><FaXTwitter /></Nav.Link></h4>
      <h4><Nav.Link href="/tweets"><IoMdHome />ホーム</Nav.Link></h4>
      <h4><Nav.Link href="/notifications"><RiNotification2Fill />通知</Nav.Link></h4>
      <h4><Nav.Link href="/messages"><FaEnvelope />メッセージ</Nav.Link></h4>
      <h4><Nav.Link href="/bookmarks"><FaBookmark />ブックマーク</Nav.Link></h4>
      <h4><Nav.Link href={`user/${userId}`}><IoPerson />プロフィール</Nav.Link></h4>
      {userId && <h4><Nav.Link onClick= {() => setModalShow(true)}><FaHeartBroken />退会</Nav.Link></h4>}
      <ModalDeactivate  isShow={modalShow} setIsModal={setModalShow}/>
    </Nav>
  )
}

export default Sidebar
