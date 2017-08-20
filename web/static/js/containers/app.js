import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class App extends Component {
  render() {
    debugger;
    return (
      <div className="container">
        <div className="jumbotron">
          <h1>Phoenix Pair</h1>
          <p>Collaborative coding with a React + Redux front-end and a Phoenix back-end.</p>
          <p><Link to="/challenges" className="btn btn-primary btn-lg">start coding!</Link></p>
        </div>
      </div>
    );
  }
}

export default App;
