import React, {Component}  from 'react';
import { connect }         from 'react-redux';
import { Link, Route}      from 'react-router-dom';
import ChallengesShow      from './show'
import { setDocumentTitle, renderErrorsFor } from '../../utils';
import challengesActions        from '../../actions/challenges';
import currentChallengeActions  from '../../actions/currentChallenge';
import userActions              from '../../actions/users';

class ChallengesIndex extends Component {
  componentDidMount() {
    setDocumentTitle('Challenges');
    const { dispatch, socket } = this.props

    if(this.props.challenges.length == 0)
      dispatch(challengesActions.fetchChallenges())

    if (!socket)
      dispatch(userActions.getCurrentUser())
  }

  componentWillReceiveProps(nextProps) {
    const {dispatch, socket} = this.props;
    if (!socket)
      dispatch(userActions.getCurrentUser())
  }

  _addActive(e) {
    var element = e.target.parentElement
    element.classList += " active"
  }
  render() {
    const { challenges } = this.props

    const list = challenges.map((challenge) => {
      return (
        <li onClick={::this._addActive} key={challenge.id} className="list-group-item">
          <Link to={`/challenges/${challenge.id}`}>
            {challenge.id}
          </Link>
        </li>
      )
    })
    return(
      <div>
        <div className="col-lg-3 col-md-3 col-sm-4">
          <ul className="list-group">
            {list}
          </ul>
        </div>
        <Route path="/challenges/:id" component={ChallengesShow}/>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    challenges: state.challenges,
    socket: state.session.socket,
    currentUser: state.session.currentUser
  }
}

export default connect(mapStateToProps)(ChallengesIndex);

