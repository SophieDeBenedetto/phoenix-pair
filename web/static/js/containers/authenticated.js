import React            from 'react';
import { connect }      from 'react-redux';
import ChallengesActions    from '../actions/challenges';
import Header           from '../layouts/header';
import { withRouter }       from 'react-router-dom'


class AuthenticatedContainer extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(ChallengesActions.fetchChallenges());
  }

  render() {
    const { currentUser, dispatch, challenges, socket, currentChallenge} = this.props;

    if (!currentUser) return false;

    return (
      <div id="authentication_container" className="application-container">
        <Header/>

        <div className='main-container'>
          {this.props.children}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.session.currentUser,
  socket: state.session.socket,
  channel: state.session.channel,
  challenges: state.challenges,
  currentChallenge: state.currentChallenge,
});

export default withRouter(connect(mapStateToProps)(AuthenticatedContainer));
