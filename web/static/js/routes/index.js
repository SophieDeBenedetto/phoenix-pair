import React                        from 'react';
import { Route, Redirect }          from 'react-router-dom'
import MainLayout                   from '../layouts/main';
import App                          from '../containers/app';
import RegistrationsNew             from '../views/registrations/new';
import SessionsNew                  from '../views/sessions/new';
import ChallengesIndex              from '../views/challenges/index';
import Actions                      from '../actions/sessions';

export default function configRoutes(store) {
  const _ensureAuthenticated = (nextState, replace, callback) => {
    const { dispatch } = store;
    const { session } = store.getState();
    const { currentUser } = session;
    debugger;
    if (!currentUser && localStorage.getItem('phoenixAuthToken')) {
      dispatch(Actions.currentUser());
    } else if (!localStorage.getItem('phoenixAuthToken')) {
      replace("/sign_in")
    }
    callback();
  };
  return (
    <div>
      <Route exact path="/" component={App} />
      <Route path="/sign_up" component={RegistrationsNew} />
      <Route path="/sign_in" component={SessionsNew} />
      <PrivateRoute path="/challenges" component={ChallengesIndex} />
    </div>
  );
}

const PrivateRoute = ({ component: Component, ...rest }) => (
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

