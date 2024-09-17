import React from 'react'

const Message = () => {
  return (
    <div className='chat chat-end'>
        <div className='chat-image avatar'>
            <div className='w-10 rounded-full'>
            <img alt='Tailwind CSS chat bubble component' src="https://cdn4.iconfinder.com/data/icons/48-bubbles/48/30.User-512.png" />
            </div>
        </div>
        <div className={`chat-bubble text-white bg-blue-500 pb-2`}>Hey how are you?</div>
		<div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>12:42</div>
        {/* <div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}>{message.message}</div>
		<div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>{formattedTime}</div>*/}
    </div> 
  )
}

export default Message
