import React                        from 'react';
import { Route, Redirect, Link }    from 'react-router-dom'
import App                          from '../containers/app';
import Navigation                          from '../views/shared/nav';
import RegistrationsNew             from '../views/registrations/new';
import SessionsNew                  from '../views/sessions/new';
import ChallengesIndex              from '../views/challenges/index';
import Actions                      from '../actions/sessions';

export default function configRoutes(store) {
  return (
    <div>
      <Navigation />
      <Route exact path="/" component={App} />
      <Route path="/sign_up" component={RegistrationsNew} />
      <Route path="/sign_in" component={SessionsNew} />
      <AuthenticatedRoute path="/challenges" component={ChallengesIndex} />
    </div>
  );
}

const AuthenticatedRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    localStorage.getItem('phoenixAuthToken') ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/sign_in',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

