import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div className="container">
        <Link to="/sign_up"> SIGN UP</Link>
        <Link to="/sign_in"> Sign IN</Link>
        <Link to="/challenges"> Challenges</Link>
      </div>
    );
  }
}

export default App;
