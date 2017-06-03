import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import {Navbar, Nav, NavItem} from 'react-bootstrap'

class Navigation extends Component {
  _addActive(e) {
    var element = e.target.parentElement
    element.classList += "active"
  }
  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" href="/">Phoenix Pair</a>
          </div>
          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav">
              <li onClick={::this._addActive}><Link to="/challenges"> Challenges</Link></li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li onClick={::this._addActive}><Link to="/sign_up"> sign up</Link></li>
              <li onClick={::this._addActive}><Link to="/sign_in"> sign in</Link></li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navigation;
