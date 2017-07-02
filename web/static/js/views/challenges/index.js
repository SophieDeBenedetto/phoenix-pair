import React, {Component}  from 'react';
import { connect }         from 'react-redux';
import { Link, Route}      from 'react-router-dom';
import ChallengesShow      from './show'
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

  componentWillReceiveProps(nextProps) {
    const {dispatch, socket} = this.props;
    if (!socket)
      dispatch(userActions.getCurrentUser())
  }

  _addActive(e) {
    var currentChallengeId = e.target.parentElement.dataset.id;
    this.setState({currentChallengeId: currentChallengeId})
  }
  render() {
    const { challenges } = this.props

    const list = challenges.map((challenge) => {
      return (
        <li 
          onClick={::this._addActive} 
          data-id={challenge.id} 
          key={challenge.id} 
          className={"list-group-item " + (this.state.currentChallengeId == challenge.id ? "active" : "")} >
            <Link to={`/challenges/${challenge.id}`}>
              {challenge.title}
            </Link>
        </li>
      )
    })
    return(
      <div style={style}>
        <div className="row">
          <div className="col-lg-3 col-md-3 col-sm-4">
            <ul className="list-group">
              {list}
            </ul>
          </div>
          <Route path="/challenges/:id" component={ChallengesShow}/>
        </div>
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

