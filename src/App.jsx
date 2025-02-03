import './App.css'
import New from  './container/registration/New.jsx'
import Sign_in from  './container/session/Sign_in.jsx'
import User_show from  './container/user/Show.jsx'
import Notifications from  './container/notification/Index.jsx'
import Messages from  './container/messages/Index.jsx'
import Message from  './container/messages/Show.jsx'
import Bookmarks from  './container/bookmarks/Index.jsx'
import Index from './Index.jsx'
import Show from './Show.jsx'
import Cookies from 'js-cookie';
import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";
import { Navigate } from 'react-router-dom';


function App() {
  const isLogIn = !!Cookies.get("accessToken");

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/tweets" element={isLogIn ? <Index /> : <Navigate to="/session/sign_in" replace />}/>
          <Route path="tweets/tweet/:id" element={isLogIn ? <Show /> : <Navigate to="/session/sign_in" replace />}/>
          <Route path="user/:id" element={isLogIn ? <User_show /> : <Navigate to="/session/sign_in" replace />}/>
          <Route path="registration/new" element={<New />}/>
          <Route path="session/sign_in" element={<Sign_in />}/>
          <Route path="notifications" element={isLogIn ? <Notifications /> : <Navigate to="/session/sign_in" replace />}/>
          <Route path="messages" element={isLogIn ? <Messages /> : <Navigate to="/session/sign_in" replace />}/>
          <Route path="messages/:id" element={isLogIn ? <Message /> : <Navigate to="/session/sign_in" replace />}/>
          <Route path="bookmarks" element={isLogIn ? <Bookmarks /> : <Navigate to="/session/sign_in" replace />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
