import React, {Component}   from 'react';
// import { connect }          from 'react-redux';

import { setDocumentTitle, renderErrorsFor } from '../../utils';

class ChallengeParticipants extends Component {
  componentDidMount() {
    
  }

  _renderParticipants() {
    this.props.participants.map((user) => {
      return (
        <li key={user.id}>
          {user.first_name}
        </li>
      )
    })
  }

  render() {
    return (
      <div>
        {::this._renderParticipants()}
      </div>
    )
  }
}

export default ChallengeParticipants

// function mapStateToProps(state) {
//   return {currentChallenge: state.challenges.currentChallenge}
// }

// export default connect(mapStateToProps)(ChallengesShow);

