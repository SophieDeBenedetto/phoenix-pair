import React, {Component}   from 'react';
import { connect }          from 'react-redux';
import { Link }             from 'react-router-dom';

import { setDocumentTitle, renderErrorsFor } from '../../utils';
import Actions              from '../../actions/registrations';

class RegistrationsNew extends Component {
  componentDidMount() {
    setDocumentTitle('Sign up');
  }

  _handleSubmit(e) {
    e.preventDefault();

    const { dispatch } = this.props;

    const data = {
      first_name: this.refs.firstName.value,
      last_name: this.refs.lastName.value,
      email: this.refs.email.value,
      password: this.refs.password.value,
      password_confirmation: this.refs.passwordConfirmation.value,
    };

    dispatch(Actions.signUp(data));
  }

  render() {
    const { errors } = this.props;

    return (
      <div className="container">
          <form class="form-horizontal" onSubmit={::this._handleSubmit}>
            <fieldset>
              <legend>Sign Up</legend>
              <div class="form-group">
                <label for="inputFirstName" class="col-lg-2 control-label">First Name</label>
                <div class="col-lg-10">
                  <input className="form-control" ref="firstName" id="user_first_name" type="text" placeholder="first name" required={true} />
                  {renderErrorsFor(errors, 'first_name')}
                </div>
              </div>

              <div class="form-group">
                <label for="inputLastName" class="col-lg-2 control-label">Last Name</label>
                <div class="col-lg-10">
                  <input className="form-control" ref="lastName" id="user_last_name" type="text" placeholder="last name" required={true} />
                  {renderErrorsFor(errors, 'last_name')}
                </div>
              </div>

              <div class="form-group">
                <label for="inputEmail" class="col-lg-2 control-label">email</label>
                <div class="col-lg-10">
                  <input className="form-control" ref="email" id="user_email" type="text" placeholder="email" required={true} />
                  {renderErrorsFor(errors, 'email')}
                </div>
              </div>

              <div class="form-group">
                <label for="inputPassword" class="col-lg-2 control-label">password</label>
                <div class="col-lg-10">
                  <input className="form-control" ref="password" id="user_password" type="password" placeholder="password" required={true} />
                  {renderErrorsFor(errors, 'password')}
                </div>
              </div>


              <div class="form-group">
                <label for="inputPasswordConfirmation" class="col-lg-2 control-label">password confirmation</label>
                <div class="col-lg-10">
                  <input className="form-control" ref="passwordConfirmation" id="user_password_confirmation" type="password" placeholder="password confirmation" required={true} />
                  {renderErrorsFor(errors, 'password_confirmation')}
                </div>
              </div> 
              <br/>       
            <button type="submit" className="btn btn-primary">Sign up</button>
            </fieldset>
          </form>
          <Link to="/sign_in">Sign in</Link>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {errors: state.registration.errors}
}

export default connect(mapStateToProps)(RegistrationsNew);






