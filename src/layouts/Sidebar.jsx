import Nav from 'react-bootstrap/Nav';
import { FaXTwitter } from "react-icons/fa6";
import { IoMdHome } from "react-icons/io";
import { RiNotification2Fill } from "react-icons/ri";
import { FaEnvelope } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import { PiDotsThreeCircleFill } from "react-icons/pi";
import Cookies from 'js-cookie';

function Sidebar() {
  const userId = Cookies.get("id");
  
  return (
    <Nav defaultActiveKey="/home" className="flex-column w-25 h-100 sticky-top">
      <h4><Nav.Link href="/home"><FaXTwitter /></Nav.Link></h4>
      <h4><Nav.Link href="/home"><IoMdHome />ホーム</Nav.Link></h4>
      <h4><Nav.Link href="/home"><RiNotification2Fill />通知</Nav.Link></h4>
      <h4><Nav.Link href="/home"><FaEnvelope />メッセージ</Nav.Link></h4>
      <h4><Nav.Link href="/home"><FaBookmark />ブックマーク</Nav.Link></h4>
      <h4><Nav.Link href={`user/${userId}`}><IoPerson />プロフィール</Nav.Link></h4>
      <h4><Nav.Link href="/home"><PiDotsThreeCircleFill />もっと見る</Nav.Link></h4>
    </Nav>
  )
}

export default Sidebar