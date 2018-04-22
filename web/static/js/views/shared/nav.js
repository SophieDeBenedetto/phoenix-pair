import React, { Component }   from 'react';
import { Link }               from 'react-router-dom'
import {Navbar, Nav, NavItem} from 'react-bootstrap'
import { connect }            from 'react-redux';
import Actions                from '../../actions/sessions';
import UserActions            from '../../actions/users';

class Navigation extends Component {
  addActive(e) {
    var element = e.target.parentElement
    element.classList += "active"
  }

  logOut(e) {
    e.preventDefault()
    const {dispatch} = this.props;
    dispatch(Actions.signOut());
  }
  authLinks() {
    if (this.props.currentUser) {
      return (
        <ul className="nav navbar-nav navbar-right">
          <li className="nav-item"><a>Hi, {this.props.currentUser.first_name}</a></li>
          <li className="nav-item" onClick={::this.logOut}><a>sign out</a></li>
        </ul>
      )
    } else {
      return (
        <ul className="nav navbar-nav navbar-right">
          <li className="nav-item" onClick={::this.addActive}><Link to="/sign_up"> sign up</Link></li>
          <li className="nav-item" onClick={::this.addActive}><Link to="/sign_in"> sign in</Link></li>
        </ul>
      )
    }
  }

  componentWillMount() {
    if (!this.props.currentUser) {
      const {dispatch} = this.props;
      dispatch(UserActions.getCurrentUser())
    }
  }

  render() {
    return (
      <nav className="navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">Phoenix Pair</a>
          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav">
              <li onClick={::this.addActive}><Link to="/challenges">challenges</Link></li>
            </ul>
            {::this.authLinks()}
          </div>
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {currentUser: state.session.currentUser}
}

export default connect(mapStateToProps)(Navigation);
