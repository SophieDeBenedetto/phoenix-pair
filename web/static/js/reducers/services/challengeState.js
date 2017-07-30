class ChallengeState {
  constructor(participants, action) {
    this.participants = participants;
    this.action       = action;
  }

  updateParticipants() {
    var newState = Object.assign([], this.participants);
    debugger;
    var indexOfWasTyping = this.participants.findIndex(p => {
      return p.typing
    })

    var indexOfCurrentlyTyping = this.indexOfCurrentlyTyping()
    
    var currentlyTyping    = this.getParticipant(newState, indexOfCurrentlyTyping)
    currentlyTyping.typing = true;
    
    if (this.newPersonTyping(indexOfWasTyping, indexOfCurrentlyTyping)) {
      var wasTyping    = this.getParticipant(newState, indexOfWasTyping)
      wasTyping.typing = false;
      
      return [...newState, wasTyping, currentlyTyping]
    }

    // // if was typing is the same as currently typing 
    // if (indexOfWasTyping >=0 && indexOfWasTyping == indexOfCurrentlyTyping) {
    //   return {...state, currentChallenge: action.challenge}
    // }

    // if was typing does not exist
    if (indexOfWasTyping == -1) {
      return [...newState, currentlyTyping]
    }
  }

  indexOfCurrentlyTyping() {
    return this.participants.findIndex(p => {
      return p.user_id == this.action.challenge_state.typing_user_id
    })
  }

  newPersonTyping (indexOfWasTyping, indexOfCurrentlyTyping) {
    return indexOfWasTyping >= 0 && indexOfWasTyping != indexOfCurrentlyTyping
  }

  getParticipant (newState, index) {
    return newState.splice(index, 1)[0];
  }
};

export default ChallengeState;