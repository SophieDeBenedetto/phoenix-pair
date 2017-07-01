import React                 from 'react';
import { connect }           from 'react-redux';
import { Link }              from 'react-router';
import ChallengeParticipants from './challengeParticipants';
import CodeResponse          from './codeResponse';
import Actions               from '../../actions/currentChallenge';

const themes = [
  'monokai',
  'bespin',
  '3024-day',
  '3024-night',
  'cobalt',
  'eclipse',
  'dracula',
  'isotope',
  'duotone',
  'icecoder',
  'material',
  'midnight',
  'solarized'
]

const languages = [
  'ruby',
  'javascript',
  'swift',
  'python',
  'php',
  'erlang'
]

import { setDocumentTitle, renderErrorsFor } from '../../utils';

class ChallengesShow extends React.Component {
  constructor(props) {
    super(props)
    this.state = {challenge: {}, theme: 'material', language: this.props.language}
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
    this.setState({challenge: nextProps.currentChallenge.currentChallenge, language: nextProps.language})
  }

  componentWillUnmount() {
    const {channel, dispatch} = this.props;
    dispatch(Actions.removeParticipant(channel))
  }

  _renderParticipants() {
    ;
    const { participants, currentParticipant} = this.props.currentChallenge;

    return (
      <ChallengeParticipants
        participants={participants}
        currentParticipant={currentParticipant}/>
    );
  }

  updateChallengeResponse(text) {
    const {dispatch, channel, currentUser} = this.props;
    dispatch(Actions.updateResponse(channel, text, currentUser));
  }

  themeOptions() {
    return themes.map(theme => {
      return <option>{theme}</option>
    })
  }

  languageOptions() {
    return languages.map(language => {
      return <option>{language}</option>
    })
  }

  setTheme(e) {
    this.setState({theme: e.target.value})
  }

  setLanguage(e) {
    const {dispatch, channel} = this.props;
    dispatch(Actions.updateLanguage(channel, e.target.value))
  }

  render() {
    const {channel, dispatch} = this.props;
    return (
      <div>
        <div className="col-lg-6 col-md-6 col-sm-3">
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-3" style={{paddingLeft: '0%', marginBottom: '2%'}}>
              <label className="control-label">theme</label>
              <select className="form-control" id="select" onChange={::this.setTheme}>
                {this.themeOptions()}
              </select>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-3" style={{paddingLeft: '0%', marginBottom: '2%'}}>
              <label className="control-label">language</label>
              <select 
                className="form-control" 
                value={this.props.language} 
                onChange={::this.setLanguage}>
                {this.languageOptions()}
              </select>
            </div>
          </div>
          <div className="row">
            <CodeResponse
              challenge={this.state.challenge}
              theme={this.state.theme}
              language={this.state.language}
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
        </div>
        <div className="col-lg-3 col-md-3 col-sm-3">
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
    params: params,
    language: state.currentChallenge.language
  }
}

export default connect(mapStateToProps)(ChallengesShow);

