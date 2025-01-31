import { useState, useEffect } from 'react'
import '../../App.css'
import instance from '../../axiosUtil.jsx'
import Header from '../../layouts/Header.jsx'
import Sidebar from '../../layouts/Sidebar.jsx'
import Messages from '../../layouts/Messages.jsx'

function Index() {
  const [groups, setGroups] = useState([])
 
  const fetchUser = async() => {
    // try {
    //   const response = await instance.get(`messages`);
    //   setGroups(response.data)
    //   console.log(response.data)
    // } catch(error) {
    //   console.log(error)
    // }
  }

  useEffect(() => {
    fetchUser()
  },[])

  return (
    <>
      <Header />
      <div  className='container'>
        <Sidebar />
        <div className='w-25'>
          <div className='d-flex'>
            <h4 className='mt-4'>ブックマーク</h4>
          </div>
          <div className='w-100 mt-3'>
            {/* {groups.map((group) => {
              return (
                <Messages group={group} />
              )
            })} */}
          </div>
        </div>
      </div>
    </>
  )
}

export default Index
