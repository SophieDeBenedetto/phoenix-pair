import Constants from '../constants';
import {Presence} from 'phoenix'

const initialState = {
  currentChallenge: {},
  participants: [],
  presences: {},
  channel: null,
  language: 'ruby'
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case Constants.PARTICIPANTS_UPDATE:
      var presences = Presence.syncDiff(state.presences, action.presences)
      var participants = Object.values(presences).map(u => {return u.metas[0]})
      return{...state, presences: presences, participants: participants}
    case Constants.SET_CURRENT_CHALLENGE:
      return {...state, currentChallenge: action.challenge, channel: action.channel}
    case Constants.CURRENT_CHALLENGE_PARTICIPANTS:
      return {...state, participants: action.users}
    case Constants.CURRENT_CHALLENGE_RESPONSE:
      return {...state, currentChallenge: action.challenge, currentParticipant: action.user}
    case Constants.CURRENT_CHALLENGE_LANGUAGE:
      return {...state, language: action.language}
    case Constants.CURRENT_CHALLENGE_CHAT_MESSAGES:
      return {...state, currentChallenge: action.challenge}
    default:
      return state;
  }
}
