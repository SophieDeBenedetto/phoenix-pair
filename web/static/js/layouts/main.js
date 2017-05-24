
import React from 'react';
import { Link } from 'react-router';

export default class MainLayout extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        HIIII
        <Link to="/sign_up"> Sign UP </Link>
      </div>
    );
  }
}
