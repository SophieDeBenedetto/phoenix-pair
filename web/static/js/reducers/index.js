import { combineReducers }  from 'redux';
import { routeReducer }     from 'redux-simple-router';
import session              from './session';
import registration         from './registration'

export default combineReducers({
  routing: routeReducer,
  session: session,
  registration: registration
});