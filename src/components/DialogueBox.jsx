import React from 'react'
import '../App.css'

function DialogueBox({type, msg}) {
  return (
    <div className='dialog'>
      <h3 style={{background : type === 'red' ? "Red" : "rgb(61, 180, 61)"}}>{msg}</h3>
    </div>
  )
}

export default DialogueBox
