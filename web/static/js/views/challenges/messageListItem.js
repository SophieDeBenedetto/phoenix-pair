import React from 'react';


function MessageListItem(props) {
  if (props.message.user.id == props.currentUser.id) {
    const width = `${props.message.content.length + 100}px`   
    return(
      <span>
        <li className="speech-bubble" style={{listStyle: "none", textAlign: "right", marginLeft: width}}>{props.message.content}</li>
        <p style={{marginTop: "-3%", color: "#268bd2", textAlign: "right"}}>me</p>
      </span>
    )
  } else {
    const width = `${props.message.content.length + 100}px`
    return(
      <span>
        <li className="speech-bubble-other" style={{listStyle: "none", marginRight: width}}>{props.message.content}</li>
        <p style={{marginTop: "-3%", color: "#d33682"}}>{props.message.user.first_name}</p>
      </span>
    )
  }
}

export default MessageListItem