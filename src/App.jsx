import './App.css'
import New from  './container/registration/New.jsx'
import Sign_in from  './container/session/Sign_in.jsx'
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
          <Route/>
          <Route path="registration/new" element={<New />}/>
          <Route path="session/sign_in" element={<Sign_in />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
