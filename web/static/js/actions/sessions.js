import { push }                           from 'react-router-redux';
import Constants                          from '../constants';
import { Socket }                         from 'phoenix';
import { httpGet, httpPost, httpDelete }  from '../utils';

export function setCurrentUser(dispatch, user) {
  const socket = new Socket('/socket', {
    params: { token: localStorage.getItem('phoenixAuthToken') },
    logger: (kind, msg, data) => { console.log(`${kind}: ${msg}`, data); },
  });

  socket.connect();

  const channel = socket.channel(`users:${user.id}`);
  if (channel.state != 'joined') {
    channel.join().receive('ok', () => {
      dispatch({
        type: Constants.SOCKET_CONNECTED,
        currentUser: user,
        socket: socket,
        channel: channel,
      });
    });
  }
};

const Actions = {
  signIn: (creds) => {
    return dispatch => {
      const data = {
        session: creds,
      };
      httpPost('/api/v1/sessions', data)
      .then((response) => {
        localStorage.setItem('phoenixAuthToken', response.jwt);
        setCurrentUser(dispatch, response.user);
        dispatch(push('/challenges'));
      })
      .catch((error) => {
        error.response.json()
        .then((errorJSON) => {
          dispatch({
            type: Constants.SESSIONS_ERROR,
            error: errorJSON.error,
          });
        });
      });
    };
  },

  signOut: () => {
    return dispatch => {
      httpDelete('/api/v1/sessions')
      .then((data) => {
        localStorage.removeItem('phoenixAuthToken');

        dispatch({ type: Constants.USER_SIGNED_OUT });

        dispatch(push('/sign_in'));
      })
      .catch(function (error) {
        localStorage.removeItem('phoenixAuthToken');

        dispatch({ type: Constants.USER_SIGNED_OUT });

        dispatch(push('/sign_in'));
      });
    };
  },
};

export default Actions;