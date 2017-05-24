import React  from 'react';
import { connect }          from 'react-redux';
import { Link }             from 'react-router';
import { withRouter }       from 'react-router-dom'

import { setDocumentTitle, renderErrorsFor } from '../../utils';
import Actions              from '../../actions/registrations';

class ChallengesIndex extends React.Component {
  componentDidMount() {
    setDocumentTitle('Challenges');
  }

  render() {
    const {challenges} = this.props;
    return challenges.map((challenge) => {
      return <Link to={`challenges/${challenge.id}`}><li>{challenge.prompt}</li></Link>
    });
  }
}

function mapStateToProps(state) {
  return {challenges: state.challenges}
}

export default withRouter(connect(mapStateToProps)(ChallengesIndex));

