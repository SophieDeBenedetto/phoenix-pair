import Constants from '../constants';
const initialState = {
  currentUser: null,
  socket: null,
  channel: null,
  error: null,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case Constants.CURRENT_USER:
      return {...state, currentUser: action.currentUser, error: null};
    case Constants.USER_SIGNED_OUT:
      return initialState;
    case Constants.SOCKET_CONNECTED:
      return {...state, socket: action.socket, channel: action.channel};
    case Constants.SESSION_ERROR:
      return {...state, error: action.error};
    default:
      return state;
  }
}