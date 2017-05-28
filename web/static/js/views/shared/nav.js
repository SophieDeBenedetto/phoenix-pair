import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Nav extends Component {
  render() {
    return (
      <div className="container">
        <ul>
          <li><Link to="/sign_up"> SIGN UP</Link></li>
          <li><Link to="/sign_in"> Sign IN</Link></li>
          <li><Link to="/challenges"> Challenges</Link></li>
        </ul>
      </div>
    );
  }
}

export default Nav;
