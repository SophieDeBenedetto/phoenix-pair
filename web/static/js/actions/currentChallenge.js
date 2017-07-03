import Constants              from '../constants';
import { push }               from 'react-router-redux';
import { Socket }             from 'phoenix';
import { httpGet, httpPost }  from '../utils';

const Actions = {
  connectToChannel: (socket, challengeId) => {
    return dispatch => {
      const channel = socket.channel(`challenges:${challengeId}`);

      channel.join().receive('ok', (response) => {
        dispatch({
          type: Constants.SET_CURRENT_CHALLENGE,
          challenge: response.challenge,
          channel: channel
        })
      });

      channel.on('user:joined', (response) => {
        var users    = response.users.map((user) => JSON.parse(user));
        var language = response.language;
        var user     = response.user;
        dispatch({
          type: Constants.CURRENT_CHALLENGE_PARTICIPANTS,
          users: users,
          language: language,
          user: user
        });
      });

      channel.on('user:left', (response) => {
        var users = response.users.map((user) => JSON.parse(user))
        dispatch({
          type: Constants.CURRENT_CHALLENGE_PARTICIPANTS,
          users: users
        });
      });

      channel.on("response:updated", (response) => {
        dispatch({
          type: Constants.CURRENT_CHALLENGE_RESPONSE,
          challenge: response.challenge,
          user: response.user
        });
      })

      channel.on('language:updated', (response) => {
        dispatch({
          type: Constants.CURRENT_CHALLENGE_LANGUAGE,
          language: response.language
        })
      }),

      channel.on('current_participant:removed', (response) => {
        dispatch({
          type: Constants.CURRENT_PARTICIPANT_REMOVED
        })
      }),

      channel.on('chat:message_created', (response) => {
        dispatch({
          type: Constants.CURRENT_CHALLENGE_CHAT_MESSAGES,
          challenge: response.challenge
        })
      })
    }
  },

  removeParticipant: (channel) => {
    return dispatch => {
      channel.leave();
    }
  },

  updateResponse: (channel, codeResponse, currentUser) => {
    return dispatch => {
      channel.push("response:update", {response: codeResponse, user: currentUser})
    }
  },

  updateLanguage: (channel, language) => {
    return dispatch => {
      channel.push("language:update", {response: language})
    }
  },

  updateCurrentParticipant: (channel) => {
    return dispatch => {
      channel.push("current_participant:remove", {test: "hi"})
    }
  },

  submitChatMessage: (channel, message) => {
    return dispatch => {
      channel.push("chat:create_message", {message: message})
    }
  }

};

export default Actions;
