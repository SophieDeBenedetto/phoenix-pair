import React from 'react';

const glow = {
  listStyle: 'none',
  textShadow: "#6AD8C9 0 0 10px",
  fontStyle: 'italic'
}

function ParticipantListItem(props) {
  if (props.user.typing) {
    return (
      <li key={props.user.user_id} style={glow} className="loading">
      {props.user.first_name}
      </li>
    )
  }else {
    return (
    <li key={props.user.user_id} style={{listStyle: 'none'}}>
      {props.user.first_name}
    </li>   
    )
  }
}

export default ParticipantListItem
