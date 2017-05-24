import React   from 'react';
import { connect }          from 'react-redux';
import { Link }             from 'react-router-dom';

import { setDocumentTitle, renderErrorsFor } from '../../utils';
import Actions              from '../../actions/sessions';

class SessionsNew extends React.Component {
  componentDidMount() {
    setDocumentTitle('Sign In');
  }

  _handleSubmit(e) {
    e.preventDefault();

    const { dispatch } = this.props;

    const data = {
      email: this.refs.email.value,
      password: this.refs.password.value
    };

    dispatch(Actions.signIn(data));
  }

  render() {
    const { errors } = this.props;

    return (
      <div className="view-container sessions new">
        <main>
          <header>
            <div className="logo" />
          </header>
          <form id="sign_in_form" onSubmit={::this._handleSubmit}>
            <div className="field">
              <input ref="email" id="user_email" type="email" placeholder="Email" required={true} />
              {renderErrorsFor(errors, 'email')}
            </div>
            <div className="field">
              <input ref="password" id="user_password" type="password" placeholder="Password" required={true} />
              {renderErrorsFor(errors, 'password')}
            </div>
            <button type="submit">Sign in</button>
          </form>
          <Link to="/sign_up">Sign up</Link>
        </main>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {errors: state.session.error}
}

export default connect(mapStateToProps)(SessionsNew)






