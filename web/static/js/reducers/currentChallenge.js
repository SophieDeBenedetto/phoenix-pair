import Constants from '../constants';
import {Presence} from 'phoenix'

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
      var newState = Object.assign([], state.participants);
      
      var indexOfWasTyping = state.participants.findIndex(p => {
        return p.typing
      })

      const indexOfCurrentlyTyping = state.participants.findIndex(p => {
        return p.user_id == action.challenge_state.typing_user_id
      })
      // if was typing exist and is NOT the same as currently
      if (indexOfWasTyping >= 0 && indexOfWasTyping != indexOfCurrentlyTyping) {
        var wasTyping = newState.splice(indexOfWasTyping, 1)[0];
        var currentlyTyping = newState.splice(indexOfCurrentlyTyping, 1)[0]
        wasTyping.typing = false;
        currentlyTyping.typing = true;
        return {...state, currentChallenge: action.challenge, participants: [...newState, wasTyping, currentlyTyping]}
      }

      // if was typing is the same as currently typing 
      if (indexOfWasTyping >=0 && indexOfWasTyping == indexOfCurrentlyTyping) {
        debugger;
        return {...state, currentChallenge: action.challenge}
      }

      // if was typing does not exist
      if (indexOfWasTyping == -1) {
        debugger;
        var currentlyTyping = newState.splice(indexOfCurrentlyTyping, 1)[0]
        currentlyTyping.typing = true;
        return {...state, currentChallenge: action.challenge, participants: [...newState, currentlyTyping]}
      }
    case Constants.CURRENT_CHALLENGE_LANGUAGE:
      return {...state, language: action.language}
    case Constants.CURRENT_CHALLENGE_CHAT_MESSAGES:
      return {...state, currentChallenge: action.challenge}
    default:
      return state;
  }
}
