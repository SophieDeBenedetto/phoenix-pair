import React                 from 'react';
import { connect }           from 'react-redux';
import { Link }              from 'react-router';
import ChallengeParticipants from './challengeParticipants';
import Actions               from '../../actions/currentChallenge';

import { setDocumentTitle, renderErrorsFor } from '../../utils';

class ChallengesShow extends React.Component {
  componentDidMount() {
    setDocumentTitle('Challenge Show');
    const {socket, currentUser} = this.props;
    dispatch(Actions.addParticipant(channel, currentUser.id))
  }

  _renderParticipants() {
    const { participants} = this.props.currentChallenge;

    return (
      <ChallengeParticipants
        participants={participants}/>
    );
  }

  render() {
    const {currentChallenge} = this.props;
    return (
      <div>
        <p>{currentChallenge.prompt}</p>
        {::this._renderParticipants()}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentChallenge: state.currentChallenge, 
    currentUser: state.session.currentUser, 
    channel: state.currentChallenge.channel
  }
}

export default connect(mapStateToProps)(ChallengesShow);

