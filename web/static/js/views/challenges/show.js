import React                 from 'react';
import { connect }           from 'react-redux';
import { Link }              from 'react-router';
import ChallengeParticipants from './challengeParticipants';
import CodeResponse          from './codeResponse';
import Actions               from '../../actions/currentChallenge';

import { setDocumentTitle, renderErrorsFor } from '../../utils';

class ChallengesShow extends React.Component {
  componentDidMount() {
    setDocumentTitle('Challenge Show');
    const {dispatch, socket, params} = this.props;
    dispatch(Actions.connectToChannel(socket, params.id))
  }

  componentWillReceiveProps(nextProps, nextParams) {
    var paramId = parseInt(nextProps.match.params.id)
    var currentChallengeId = nextProps.currentChallenge.currentChallenge.id
    if (paramId != currentChallengeId) {
      const {dispatch, socket, channel} = nextProps;
      dispatch(Actions.removeParticipant(channel));
      dispatch(Actions.connectToChannel(socket, paramId));
    }
  }

  componentWillUnmount() {
    const {channel, dispatch} = this.props;
    dispatch(Actions.removeParticipant(channel))
  }

  _renderParticipants() {
    const { participants} = this.props.currentChallenge;

    return (
      <ChallengeParticipants
        participants={participants}/>
    );
  }

  render() {
    const {currentChallenge, dispatch} = this.props;
    return (
      <div>
        {::this._renderParticipants()}
        <p>{currentChallenge.currentChallenge.prompt}</p>
        <CodeResponse
          challenge={currentChallenge.currentChallenge}
          dispatch={dispatch}/>
      </div>
    )
  }
}

function mapStateToProps(state, routerState) {
  var params = routerState.match.params
  return {
    currentChallenge: state.currentChallenge,
    currentUser: state.session.currentUser,
    socket: state.session.socket,
    channel: state.currentChallenge.channel,
    params: params
  }
}

export default connect(mapStateToProps)(ChallengesShow);

