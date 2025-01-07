import Modal from 'react-bootstrap/Modal';
import alt from '../assets/twitter_logo.jpg'
import CommentForm from './CommentForm.jsx'

function ModalComment({user_image, tweet , isShow, setIsModal}) {
  return (
    <Modal
    show={isShow}
    onHide={() => setIsModal(false)}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
    animation={false}
    >
      <Modal.Header closeButton>
      </Modal.Header>
      <Modal.Body>
        <div className='w-100 p-2'>
          <div className='d-flex p-2 gap-2'>
      <div>
        {tweet.image_user ? <img src={tweet.image_user} className='rounded-circle border border-2 border-dark' width={40}/> : <img src={alt} className='rounded-circle border border-2 border-dark' width={40}/>}
        <div className='d-flex h-100 justify-content-center'>
          <div className="vr "></div>
        </div>
      </div>
      <div className='w-100'>
        <div className='w-100 flex-column' >
            <div className='d-flex justify-content-between'>
              <div className='fw-bold'>
                {tweet.user.name}
              </div>
            </div>
            <div className='w-100 text-dark'>
              {tweet.tweet.content}
            </div>
            <div className='w-100'>
              {tweet.tweet.image_url ? <img src={tweet.tweet.image_url} className='rounded-4 border border-1 w-100'></img> : null}
            </div>
          </div>
        </div>
      </div>
      <div className='d-flex p-2 gap-2 mt-5'>
        <div>
          {user_image ? <img src={user_image} className='rounded-circle border border-2 border-dark' width={40}/> : <img src={alt} className='rounded-circle border border-2 border-dark' width={40}/>}
        </div>
        <div className='w-100 p-2'>
          <CommentForm tweet_id={tweet.tweet.id}/>
        </div>
      </div>
      </div>
      </Modal.Body>
    </Modal>
  )
}

export default ModalComment