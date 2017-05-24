import React, {Component}  from 'react';
import { connect }          from 'react-redux';
import { Link }             from 'react-router-dom';

import { setDocumentTitle, renderErrorsFor } from '../../utils';
import Actions              from '../../actions/registrations';

class ChallengesIndex extends Component {
  componentDidMount() {
    setDocumentTitle('Challenges');
  }

  render() {
    return(<h1>Challenges</h1>)
  }
}

function mapStateToProps(state) {
  return {challenges: []}
}

export default connect(mapStateToProps)(ChallengesIndex);

