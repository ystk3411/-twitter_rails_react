import './App.css'
import New from  './container/registration/New.jsx'
import Sign_in from  './container/session/Sign_in.jsx'
import User_show from  './container/user/Show.jsx'
import Notifications from  './container/notification/Index.jsx'
import Messages from  './container/messages/Index.jsx'
import Message from  './container/messages/Show.jsx'
import Index from './Index.jsx'
import Show from './Show.jsx'
import Cookies from 'js-cookie';
import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";


function App() {
  const isLogIn = !!Cookies.get("accessToken");

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/tweets" element={isLogIn ? <Index /> : <Sign_in />}/>
          <Route path="tweets/tweet/:id" element={isLogIn ? <Show /> : <Sign_in />}/>
          <Route path="user/:id" element={isLogIn ? <User_show /> : <Sign_in />}/>
          <Route path="registration/new" element={<New />}/>
          <Route path="session/sign_in" element={<Sign_in />}/>
          <Route path="notifications" element={<Notifications />}/>
          <Route path="messages" element={<Messages />}/>
          <Route path="messages/:id" element={<Message />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
