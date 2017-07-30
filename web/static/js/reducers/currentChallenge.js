import Constants from '../constants';
import {Presence} from 'phoenix';
import ChallengeState from './services/challengeState';

const initialState = {
  currentChallenge: {},
  language: "javascript",
  participants: [],
  channel: null
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case Constants.CURRENT_CHALLENGE_STATE:
      var language = action.challenge_state.language || state.language
      var indexOfTyping = state.participants.findIndex(p => {
        return p.user_id == action.challenge_state.typing_user_id
      })
      var newState = Object.assign([], state.participants);
      if (indexOfTyping >= 0) {   
        var currentlyTyping = state.participants[indexOfTyping]
        currentlyTyping.typing = true;
        newState.splice(indexOfTyping, 1)
        return {...state, language: language, participants: [...newState, currentlyTyping]}
      } else if (!action.challenge_state.typing_user_id) {
        var indexOfWasTyping = state.participants.findIndex(p => {
          return p.typing
        })
        var wasTyping = newState.splice(indexOfWasTyping, 1)[0];
        wasTyping.typing = false;
        return {...state, language: language, participants: [...newState, wasTyping]}
      } else {
        return {...state, language: language}
      }

    case Constants.CURRENT_CHALLENGE_PARTICIPANTS:
      return {...state, participants: action.participants}
    case Constants.SET_CURRENT_CHALLENGE:
      return {...state, currentChallenge: action.challenge, channel: action.channel}
    case Constants.CURRENT_CHALLENGE_RESPONSE:
    debugger;
      var challengeStateUpdater = new ChallengeState(state.participants, action)
      var participants = challengeStateUpdater.updateParticipants() || state.participants
      debugger;
      return {...state, currentChallenge: action.challenge, participants: participants}
    case Constants.CURRENT_CHALLENGE_LANGUAGE:
      return {...state, language: action.language}
    case Constants.CURRENT_CHALLENGE_CHAT_MESSAGES:
      return {...state, currentChallenge: action.challenge}
    default:
      return state;
  }
}
