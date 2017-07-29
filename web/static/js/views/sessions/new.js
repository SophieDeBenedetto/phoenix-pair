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
      <div className="container">
        <div className="container">
          <form className="form-horizontal" onSubmit={::this._handleSubmit}>
            <fieldset>
              <legend>Sign In</legend>
              <div className="form-group">
                <label className="col-lg-2 control-label">email</label>
                <div className="col-lg-10">
                  <input className="form-control" ref="email" id="user_email" type="text" placeholder="email" required={true} />
                  {renderErrorsFor(errors, 'email')}
                </div>
              </div>

              <div className="form-group">
                <label className="col-lg-2 control-label">password</label>
                <div className="col-lg-10">
                  <input className="form-control" ref="password" id="user_password" type="password" placeholder="password" required={true} />
                  {renderErrorsFor(errors, 'password')}
                </div>
              </div>
              <br/>       
            <button type="submit" className="btn btn-primary">Sign in</button>
            </fieldset>
          </form>
          <Link to="/sign_up">Sign up</Link>
      </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {errors: state.session.error}
}

export default connect(mapStateToProps)(SessionsNew)






