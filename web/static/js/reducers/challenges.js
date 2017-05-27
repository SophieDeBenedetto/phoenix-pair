import Constants from '../constants';

const initialState = {
  challenges: [],
  currentChallenge: null
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case Constants.CHALLENGES_RECEIVED:
      return { ...state, challenges: action.challenges}
    case Constants.SET_CURRENT_CHALLENGE:
      var currentChallenge = state.challenges.filter(challenge => {
        return challenge.id == parseInt(action.currentChallengeId) 
      })
      return {...state, currentChallenge: currentChallenge[0]}
    default:
      return state;
  }
}