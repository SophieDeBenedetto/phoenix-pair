import Constants from '../constants';

const initialState = []

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case Constants.CHALLENGES_RECEIVED:
      return action.challenges
    default:
      return state;
  }
}