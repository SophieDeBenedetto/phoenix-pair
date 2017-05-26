import { combineReducers }  from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import session              from './session';
import registration         from './registration'
import challenges           from './challenges'

export default combineReducers({
  routing: routing,
  session: session,
  registration: registration,
  challenges: challenges
});
