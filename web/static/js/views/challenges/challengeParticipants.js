import React, {Component}   from 'react';
// import { connect }          from 'react-redux';

import { setDocumentTitle, renderErrorsFor } from '../../utils';

class ChallengeParticipants extends Component {
  _renderParticipants() {
    return this.props.participants.map((user) => {
      return (
         <li key={user.id} style={{listStyle: 'none'}}>
          {user.first_name}
        </li>
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
          {::this._renderParticipants()}
        </div>
      </div>
    )
  }
}

export default ChallengeParticipants



