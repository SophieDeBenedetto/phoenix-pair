import React, {Component}  from 'react';
import { connect }         from 'react-redux';
import { Link, Route}      from 'react-router-dom';
import ChallengesShow      from './show'
import { setDocumentTitle, renderErrorsFor } from '../../utils';
import Actions              from '../../actions/challenges';

class ChallengesIndex extends Component {
  componentDidMount() {
    setDocumentTitle('Challenges');
    const { dispatch } = this.props

    if(this.props.challenges.length == 0)
      dispatch(Actions.fetchChallenges())
  }

  setCurrentChallenge(e) {
    const { dispatch } = this.props
    var challengeId    = e.target.getAttribute('data-challengeid');
    dispatch(Actions.setCurrentChallenge(challengeId))
  }

  render() {
    const { challenges } = this.props
    const list = challenges.map((challenge) => {
      return (
        <li key={challenge.id} onClick={::this.setCurrentChallenge}>
          <Link to={`/challenges/${challenge.id}`} data-challengeId={challenge.id}>
            {challenge.id}
          </Link>
        </li>
        )
      })

    return(
      <div>
        <ul>
          {list}
        </ul>
        <Route path="/challenges/:id" component={ChallengesShow}/>
      </div>
    )
  }
}

function mapStateToProps(state) {
 return state.challenges
}

export default connect(mapStateToProps)(ChallengesIndex);

