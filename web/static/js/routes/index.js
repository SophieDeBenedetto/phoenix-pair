import React                        from 'react';
import { Route, Redirect }          from 'react-router-dom'
import MainLayout                   from '../layouts/main';
import App                          from '../containers/app';
import RegistrationsNew             from '../views/registrations/new';
import SessionsNew                  from '../views/sessions/new';
import ChallengesIndex              from '../views/challenges/index';
import Actions                      from '../actions/sessions';

export default function configRoutes(store) {
  return (
    <div>
      <h1>Phoenix Pair</h1>
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

