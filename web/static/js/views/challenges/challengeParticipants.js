import React, {Component}   from 'react';
import { setDocumentTitle, renderErrorsFor } from '../../utils';

const glow = {
  listStyle: 'none',
  textShadow: "#6AD8C9 0 0 10px",
  fontStyle: 'italic'
}


class ChallengeParticipants extends Component {
  renderParticipants() {
    return this.props.participants.map((user) => {
        const {currentParticipant} = this.props
        if (currentParticipant && user.id == currentParticipant.id) {
          return (
            <li key={user.id} style={glow} className="loading">
            {user.first_name}
            </li>
          )
        }else {
          return (
          <li key={user.id} style={{listStyle: 'none'}}>
            {user.first_name}
          </li>   
          )
        }
    })
  }

  render() {
    return (
      <div className="panel panel-danger">
        <div className="panel-heading">
          <h3 className="panel-title">Participants</h3>
        </div>
        <div className="panel-body">
          {::this.renderParticipants()}
        </div>
      </div>
    )
  }
}

export default ChallengeParticipants



