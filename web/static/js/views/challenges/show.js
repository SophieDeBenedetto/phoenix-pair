import React                 from 'react';
import { connect }           from 'react-redux';
import { Link }              from 'react-router';
import ChallengeParticipants from './challengeParticipants';
import CodeResponse          from './codeResponse';
import ChallengeChat         from './challengeChat';
import ThemeOptions          from './themeOptions';
import LanguageOptions       from './languageOptions';
import ChallengeDetails      from './challengeDetails';
import Actions               from '../../actions/currentChallenge';
import challengeActions      from '../../actions/challenges';

import { setDocumentTitle, renderErrorsFor } from '../../utils';

class ChallengesShow extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      challenge: {},
      theme: 'material',
      language: this.props.language,
      showChat: false
    }
  }

  componentWillMount() {
    const {dispatch} = this.props;
    if (this.props.challenges.length == 0) {
      dispatch(challengeActions.fetchChallenges())
    }
  }

  componentDidMount() {
    setDocumentTitle('Challenge Show');
    const {dispatch, socket, params} = this.props;
    if (socket) {
      dispatch(Actions.connectToChannel(socket, params.id))
    }
  }

  pageRefresh(id, challenges) {
    return (!id && challenges.length > 0)
  }

  challengeTransition(challengeId, paramId) {
    return (challengeId && paramId != challengeId)
  }

  subscribeAndSetState(nextProps, paramId, challenges, component) {
    const currentChallenge = challenges.filter(c => {return c.id == this.props.params.id})[0]
    const {dispatch, socket} = nextProps;
    dispatch(Actions.connectToChannel(socket, paramId));
    component.setState({challenge: currentChallenge, language: nextProps.language})
  }

  leaveAndSubscribeToNew(nextProps, paramId) {
    const {dispatch, socket, channel} = nextProps;
    dispatch(Actions.removeParticipant(channel));
    dispatch(Actions.connectToChannel(socket, paramId));
  }

  componentWillReceiveProps(nextProps, nextParams) {
    var paramId            = parseInt(nextProps.match.params.id)
    const {challenges}     = this.props;
    var currentChallengeId;
    if (nextProps.currentChallenge.currentChallenge) {
      currentChallengeId = nextProps.currentChallenge.currentChallenge.id
    }
    if (this.pageRefresh(currentChallengeId, challenges)) {
      this.subscribeAndSetState(nextProps, paramId, challenges, this)
    }
    if (this.challengeTransition(currentChallengeId, paramId)) {
      this.leaveAndSubscribeToNew(nextProps, paramId)
    }
    this.setState({challenge: nextProps.currentChallenge.currentChallenge, language: nextProps.language})
  }

  componentWillUnmount() {
    const {channel, dispatch} = this.props;
    dispatch(Actions.removeParticipant(channel))
  }

  updateChallengeResponse(text) {
    const {dispatch, channel, currentUser} = this.props;
    dispatch(Actions.updateResponse(channel, text, currentUser));
  }

  setTheme(theme) {
    this.setState({theme: theme})
  }

  setLanguage(e) {
    const {dispatch, channel} = this.props;
    dispatch(Actions.updateLanguage(channel, e.target.value))
  }

  removeCurrentParticipantTyping(text) {
    const {channel, dispatch} = this.props;
    dispatch(Actions.removeCurrentParticipantTyping(channel))
  }

  submitMessage(message) {
    const {channel, dispatch} = this.props;
    dispatch(Actions.submitChatMessage(channel, message))
  }

  render() {
    const {channel, dispatch} = this.props;
    return (
      <div>
        <div>
          <div className="col-lg-12 col-md-6 col-sm-3" style={{width: '900px'}}>
            <div className="row" style={{width: '50%'}}>
              <ThemeOptions
                selectedTheme={this.state.theme}
                setTheme={::this.setTheme}/>
              <LanguageOptions
                language={this.props.language}
                setLanguage={::this.setLanguage}/>
            </div>
            <div className="row" style={{overflow: 'visible', height: '300px'}}>
              <CodeResponse
                challenge={this.state.challenge}
                theme={this.state.theme}
                language={this.state.language}
                removeCurrentParticipantTyping={::this.removeCurrentParticipantTyping}
                updateChallengeResponse={::this.updateChallengeResponse}/>
              <div className="col-lg-4 col-md-3 col-sm-3">
                <ChallengeParticipants
                  participants={this.props.currentChallenge.participants}/>
                <ChallengeChat
                  showChat={this.state.showChat}
                  submitMessage={::this.submitMessage}
                  currentUser={this.props.currentUser}
                  messages={this.props.chat ? this.props.chat.messages : []}/>
              </div>
            </div>
            <div className="row">
              <ChallengeDetails
                challenge={this.state.challenge}/>
              </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state, routerState) {
  var params = routerState.match.params
  return {
    challenges: state.challenges,
    currentChallenge: state.currentChallenge,
    chat: state.currentChallenge.currentChallenge.chat,
    currentUser: state.session.currentUser,
    socket: state.session.socket,
    channel: state.currentChallenge.channel,
    params: params,
    language: state.currentChallenge.language
  }
}

export default connect(mapStateToProps)(ChallengesShow);

