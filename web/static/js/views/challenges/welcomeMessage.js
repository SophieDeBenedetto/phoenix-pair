import React, {Component} from 'react';

function WelcomeMessage(props) {
  return (
    <div className="col-lg-4 col-md-4 col-sm-4 welcome-msg">
      <div className="alert alert-dismissible alert-success">
        <strong>Welcome! </strong>Select a challenge to get started!
      </div>
    </div>
  )
}

export default WelcomeMessage