import Constants              from '../constants';
import { push }               from 'react-router-redux';
import { Socket, Presence }   from 'phoenix';
import { httpGet, httpPost }  from '../utils';

window.Presence = Presence

const syncPresentUsers = (dispatch, presences) => {
  const participants = [];
  Presence.list(presences).map(p => {participants.push(p.metas[0])})
  dispatch({
    type: Constants.CURRENT_CHALLENGE_PARTICIPANTS,
    participants
  });
};


const Actions = {
  connectToChannel: (socket, challengeId) => {
    return dispatch => {
      const channel = socket.channel(`challenges:${challengeId}`);
      let presences = {};
      channel.join().receive('ok', (response) => {
        dispatch({
          type: Constants.SET_CURRENT_CHALLENGE,
          challenge: response.challenge,
          channel: channel
        })
      });

      channel.on("presence_diff", (response) => {
        presences = Presence.syncDiff(presences, response);
        syncPresentUsers(dispatch, presences);
      })

      channel.on("presence_state", (response) => {
        presences = Presence.syncState(presences, response);
        syncPresentUsers(dispatch, presences);
      })

      channel.on("user:joined", (response) => {
        dispatch({
          type: Constants.CURRENT_CHALLENGE_STATE,
          challenge_state: response.challenge_state
        });
      })

      channel.on("response:updated", (response) => {
        dispatch({
          type: Constants.CURRENT_CHALLENGE_RESPONSE,
          challenge: response.challenge
        });
      })

      channel.on('language:updated', (response) => {
        dispatch({
          type: Constants.CURRENT_CHALLENGE_LANGUAGE,
          language: response.language
        })
      })

      channel.on('chat:message_created', (response) => {
        dispatch({
          type: Constants.CURRENT_CHALLENGE_CHAT_MESSAGES,
          challenge: response.challenge
        })
      })

      channel.on('current_participant_typing:removed', (response) => {
        dispatch({
          type: Constants.CURRENT_CHALLENGE_STATE,
          challenge_state: response
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
      channel.push("response:update", {response: codeResponse, user_id: currentUser.id})
    }
  },

  updateLanguage: (channel, language) => {
    return dispatch => {
      channel.push("language:update", {response: language})
    }
  },


  submitChatMessage: (channel, message) => {
    return dispatch => {
      channel.push("chat:create_message", {message: message})
    }
  },

  removeCurrentParticipantTyping: (channel) => {
    return dispatch => {
      channel.push("current_participant_typing:remove", {})
    }
  }

};

export default Actions;
