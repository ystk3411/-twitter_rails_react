import './App.css'
import New from  './container/registration/New.jsx'
import Sign_in from  './container/session/Sign_in.jsx'
import Index from './Index.jsx'
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
          <Route path="/" element={isLogIn ? <Index /> : <Sign_in />}/>
          <Route path="registration/new" element={<New />}/>
          <Route path="session/sign_in" element={<Sign_in />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
