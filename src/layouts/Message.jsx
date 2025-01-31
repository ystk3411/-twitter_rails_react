import Cookies from 'js-cookie';

function Message({message}) {
  const userId = Cookies.get("id");
  const isMyResource = message.user_id == userId
  return(
    <div className={`d-flex mb-3 mt-3 ${isMyResource ? "justify-content-end" : "justify-content-start"}`}>
      <div className={`fs-5 p-3 bg-info ${isMyResource ? "bg-secondary bg-opacity-50" : ""}`} style={{'border-radius':'30px'}}>
        {message.content}
        {message.image_url && <img src={message.image_url} className='rounded-4 border border-1 w-100'></img>}
      </div>
    </div>
  )
}

export default Message