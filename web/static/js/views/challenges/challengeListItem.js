import React    from 'react';
import { Link } from 'react-router-dom';


function ChallengeListItem(props) {
  return (
    <li onClick={props.addActive} 
      data-id={props.challenge.id} 
      key={props.challenge.id} 
      className={"list-group-item " + (props.currentChallengeId == props.challenge.id ? "active" : "")} >
        <Link to={`/challenges/${props.challenge.id}`}>
          {props.challenge.title}
        </Link>
    </li>
  )
}

export default ChallengeListItem



