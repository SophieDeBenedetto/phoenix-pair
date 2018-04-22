import React, {Component} from 'react';

function ChallengeDetails(props) {
  return (
    <div className="panel panel-info" style={{marginTop: '2%', width: '600px'}}>
      <div className="panel-heading">
        <h3 className="panel-title">{props.challenge.title}</h3>
      </div>
      <div className="panel-body">
        {props.challenge.prompt}
      </div>
    </div>
  )
}

export default ChallengeDetails
