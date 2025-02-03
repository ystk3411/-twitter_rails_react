import Nav from 'react-bootstrap/Nav';
import { FaXTwitter } from "react-icons/fa6";
import { IoMdHome } from "react-icons/io";
import { RiNotification2Fill } from "react-icons/ri";
import { FaEnvelope } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import { FaHeartBroken } from "react-icons/fa";
import Cookies from 'js-cookie';

function Sidebar() {
  const userId = Cookies.get("id");
  
  return (
    <Nav defaultActiveKey="/home" className="flex-column w-25 h-100 sticky-top">
      <h4><Nav.Link href="/tweets"><FaXTwitter /></Nav.Link></h4>
      <h4><Nav.Link href="/tweets"><IoMdHome />ホーム</Nav.Link></h4>
      <h4><Nav.Link href="/notifications"><RiNotification2Fill />通知</Nav.Link></h4>
      <h4><Nav.Link href="/messages"><FaEnvelope />メッセージ</Nav.Link></h4>
      <h4><Nav.Link href="/bookmarks"><FaBookmark />ブックマーク</Nav.Link></h4>
      <h4><Nav.Link href={`user/${userId}`}><IoPerson />プロフィール</Nav.Link></h4>
      {userId && <h4><Nav.Link href="/home"><FaHeartBroken />退会</Nav.Link></h4>}
    </Nav>
  )
}

export default Sidebar
