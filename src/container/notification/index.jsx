import { useState, useEffect } from 'react'
import '../../App.css'
import instance from '../../axiosUtil.jsx'
import Header from '../../layouts/Header.jsx'
import Sidebar from '../../layouts/Sidebar.jsx'
import Notifications from '../../layouts/Notifications.jsx'

function Index() {
  const [notifications, SetNotifications] = useState([])

  const fetchUser = async() => {
    try {
      const response = await instance.get(`notifications`);
      SetNotifications(response.data)
      console.log(notifications)
    } catch(error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchUser()
  },[])

  return (
    <>
      <Header />
      <div  className='container'>
        <Sidebar />
        <div className='w-50'>
          <div className='d-flex'>
            <h4 className='mt-4'>通知</h4>
          </div>
          <div className='w-100 p-4'>
            {notifications.map((notification) => {
              return (
                <Notifications actionType={notification.notification.action_type} notification={notification}/>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default Index
