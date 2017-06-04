import React, {Component}   from 'react';
// import { connect }          from 'react-redux';

import { setDocumentTitle, renderErrorsFor } from '../../utils';

class ChallengeParticipants extends Component {
  _renderParticipants() {
    return this.props.participants.map((user) => {
      return (
        <li key={user.id}>
          {user.first_name}
        </li>
      )
    })
  }

  render() {
    return (
      <ul>
        {::this._renderParticipants()}
      </ul>
    )
  }
}

export default ChallengeParticipants



