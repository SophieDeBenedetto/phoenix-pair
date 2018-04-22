import React, {Component}                    from 'react';
import ParticipantListItem                   from './participantListItem'

class ChallengeParticipants extends Component {
  renderParticipants() {
    return this.props.participants.map((user) => {
      return (
        <ParticipantListItem 
          user={user}/>
      )
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



