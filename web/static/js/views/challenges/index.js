import React, {Component}  from 'react';
import { connect }         from 'react-redux';
import { Route }           from 'react-router-dom';
import ChallengesShow      from './show';
import WelcomeMessage      from './welcomeMessage';
import ChallengeListItem   from './challengeListItem';
import { setDocumentTitle, renderErrorsFor } from '../../utils';
import challengesActions        from '../../actions/challenges';
import currentChallengeActions  from '../../actions/currentChallenge';
import userActions              from '../../actions/users';

const style = {margin: '3%'}

class ChallengesIndex extends Component {
  constructor(props) {
    super(props)
    this.state = {currentChallengeId: null}
  }

  componentWillMount() {
    if (this.props.challenges.length == 0) {
      const {dispatch} = this.props;
      dispatch(challengesActions.fetchChallenges())
    }
  }
  componentDidMount() {
    setDocumentTitle('Challenges');
    const { dispatch, socket } = this.props

    if(this.props.challenges.length == 0)
      dispatch(challengesActions.fetchChallenges())

    if (!socket)
      dispatch(userActions.getCurrentUser())
  }

  componentWillReceiveProps(nextProps, nextParams) {
    const {dispatch, socket} = this.props;
    if (!socket) {
      dispatch(userActions.getCurrentUser())
    }
    if (nextProps.paramId) {
      this.setState({currentChallengeId: nextProps.paramId})
    } else {
      this.setState({currentChallengeId: null})
    }
  }

  addActive(e) {
    var currentChallengeId = e.target.parentElement.dataset.id;
    this.setState({currentChallengeId: currentChallengeId})
  }

  renderWelcome() {
    if (!this.state.currentChallengeId) {
      return (
       <WelcomeMessage/>
      )
    }
  }

  challengesList() {
    const { challenges } = this.props

    return (
      challenges.map((challenge) => {
        return (
          <ChallengeListItem 
            challenge={challenge}
            onClick={::this.addActive}
            currentChallengeId={this.state.currentChallengeId}/>
        )
      })
    )
  }

  render() {
    return(
      <div style={style}>
        <div className="row">
          <div className="col-lg-3 col-md-3 col-sm-4">
            <ul className="list-group">
              {this.challengesList()}
            </ul>
          </div>
          {this.renderWelcome()}
          <Route path="/challenges/:id" component={ChallengesShow}/>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state, routerState) {
  const paramId = routerState.location.pathname.split("/")[2]
  return {
    challenges: state.challenges,
    socket: state.session.socket,
    currentUser: state.session.currentUser,
    paramId: paramId
  }
}

export default connect(mapStateToProps)(ChallengesIndex);

