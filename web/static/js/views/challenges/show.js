import React                 from 'react';
import { connect }           from 'react-redux';
import { Link }              from 'react-router';
import ChallengeParticipants from './challengeParticipants';
import Actions               from '../../actions/currentChallenge';

import { setDocumentTitle, renderErrorsFor } from '../../utils';

class ChallengesShow extends React.Component {
  componentDidMount() {
    setDocumentTitle('Challenge Show');
  }

  componentWillReceiveProps(nextProps) {
    // debugger;
    // const {channel, currentUser, currentChallenge, dispatch} = nextProps;
    // const {participants} = currentChallenge;
    // if (channel) {
    //   if (parseInt(channel.topic.split(":")[1]) != nextProps.currentChallenge.currentChallenge.id) {
    //     dispatch(Actions.removeParticipant(channel, currentUser.id, participants))
    //   } else if (channel && !participants.some(user => user.id === currentUser.id)) {
    //     dispatch(Actions.addParticipant(channel, currentUser.id, participants))
    //   }
    // }
  }

  componentWillUnmount() {
    const {channel, currentUser, currentChallenge, dispatch} = this.props;
    const {participants} = currentChallenge;
    dispatch(Actions.removeParticipant(channel, currentUser.id, participants))
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

