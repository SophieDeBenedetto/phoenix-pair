import React                 from 'react';
import { connect }           from 'react-redux';
import { Link }              from 'react-router';
import ChallengeParticipants from './challengeParticipants';
import CodeResponse          from './codeResponse';
import Actions               from '../../actions/currentChallenge';

import { setDocumentTitle, renderErrorsFor } from '../../utils';

class ChallengesShow extends React.Component {
  constructor(props) {
    super(props)
    this.state = {challenge: {}}
  }

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
    this.setState({challenge: nextProps.currentChallenge.currentChallenge})
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

  updateChallengeResponse(text) {
    const {dispatch, channel} = this.props;
    dispatch(Actions.updateResponse(channel, text));
  }

  render() {
    const {channel, dispatch} = this.props;
    return (
      <div>
        <div className="col-lg-6 col-md-6 col-sm-3">
          <CodeResponse
            challenge={this.state.challenge}
            updateChallengeResponse={::this.updateChallengeResponse}/>
          <div className="panel panel-info" style={{marginTop: '2%'}}>
            <div className="panel-heading">
              <h3 className="panel-title">{this.state.challenge.title}</h3>
            </div>
            <div className="panel-body">
              {this.state.challenge.prompt}
            </div>
          </div>
        </div>
        <div className="col-lg-1">
          {::this._renderParticipants()}
        </div>
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

