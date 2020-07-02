import {
  HANDLE_LOCATION_SPYFALL,
  ADD_NAME_SPYFALL,
  REMOVE_NAME_SPYFALL,
  START_GAME_SPYFALL,
  UPDATE_MAIN_TIME,
  CLEAR_SPYFALL_BOARD
} from 'redux-store/actions/spyfallActions';

import {
  START_GAME_MAFIA,
  CHAT_UPDATED,
  OTHER_PLAYER_VOTED,
  I_VOTED,
  CLEAR_MAFIA_BOARD,
} from 'redux-store/actions/mafiaActions';

const defaultMafiaState = {
  phase: 0,
  time: 0,
  role: -1,
  roleCount: {},
  chatHistory: [[]],
  playerProfiles: [],
  numAbstain: 0,
  myTarget: -1,
  onTrial: '',
}
export const initialState = {
  time: 0,
  spyfall: {
    selectedLocations: new Map(),
    selectedNamesByIndex: new Set(),
    spyIndex: 0,
    locations: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'],
    secretLocation: "",
  },
  mafia: defaultMafiaState
};

const NUM_STATES_LOCATIONS = 3;

function mafiaReducers(state, action) {
  switch(action.type) {
    case START_GAME_MAFIA: {
      const {
        role, 
        roleCount,
        numPlayers,
      } = action.gameState;
      const playerProfiles = [];
      for(var i=0; i<numPlayers; i++) {
        playerProfiles.push({
          numVotes: 0,
          isAlive: true,
        });
      }
      return {
        ...state,
        time: 0,
        mafia: {
          ...state.mafia,
          role,
          roleCount,
          phase: 0,
          playerProfiles,
        }
      }
    }
    case I_VOTED: //These two cases will be identical, apart from setting the myTarget field
    case OTHER_PLAYER_VOTED: {
      const {
        audience,
        phase,
        message,
        newTarget,
        oldTarget,
      } = action;

      const oldChatHistory =  state.mafia.chatHistory;
      const newChatHistory = oldChatHistory.filter(item => item);
      let numAbstain = state.mafia.numAbstain;
      newChatHistory[phase].push({audience, message});

      const newProfiles = state.mafia.playerProfiles.filter(item => item);
      if(oldTarget >= 0) {
        newProfiles[oldTarget].numVotes--;
      } 
      else if(oldTarget === -2) {
        numAbstain--;
      }

      if(newTarget >= 0) {
        newProfiles[newTarget].numVotes++;
      }
      else if(newTarget === -2) {
        numAbstain++;
      }

      const newMafiaState = {
        ...state.mafia,
        chatHistory: newChatHistory,
        playerProfiles: newProfiles,
        numAbstain,
      };

      if (action.type === I_VOTED) {
        console.log('I Voted');
        newMafiaState.myTarget = newTarget;
      }

      return {
        ...state,
        mafia: newMafiaState,
      }
    }
    case CHAT_UPDATED: {
      const {audience, phase, message} = action;
      const oldChatHistory =  state.mafia.chatHistory;
      const newChatHistory = oldChatHistory.filter(item => item);
      //Make sure that phase is valid index withing newChatHistory
      //This will *hopefully* be handled by updating time
      while(newChatHistory.length <= phase) {
        newChatHistory.push([]);
      }
      newChatHistory[phase].push({audience, message});
      return {
        ...state,
        mafia: {
          ...state.mafia, 
          chatHistory: newChatHistory,
        }
      }
    }
    case UPDATE_MAIN_TIME: {
      const oldChatHistory =  state.mafia.chatHistory;
      let newChatHistory = oldChatHistory;
      let newProfiles = state.mafia.playerProfiles;
      let numAbstain = state.mafia.numAbstain;
      if (action.phase !== state.mafia.phase) {
        if (action.phase % 2 === 0) {
          newProfiles = state.mafia.playerProfiles.map((val) => {
            return {
              numVotes: 0,
              isAlive: val.isAlive,
            };
          });
          numAbstain = 0;
        }
        newChatHistory = oldChatHistory.filter(item => item);
        newChatHistory.push([]);
      }
      return {
        ...state,
        time: action.time,
        mafia: {
          ...state.mafia,
          chatHistory: newChatHistory,
          phase: action.phase,
          playerProfiles: newProfiles,
          numAbstain
        }
      };
    }
    case CLEAR_MAFIA_BOARD: {
      return {
        ...state,
        mafia: defaultMafiaState
      };
    }
    default: return state;
  }
}

function spyfallReducers(state, action) {
  switch(action.type) {
    case START_GAME_SPYFALL: {
      return {
        ...state,
        time: action.gameState.time,
        spyfall: {
          spyIndex: action.gameState.spyIndex,
          selectedLocations: state.spyfall.selectedLocations,
          selectedNamesByIndex: state.spyfall.selectedNamesByIndex,
          locations: action.gameState.locations,
          secretLocation: action.gameState.secretLocation,
        },
      };
    }
    case UPDATE_MAIN_TIME: {
      return {
        ...state,
        time: action.time,
      };
    }
    case ADD_NAME_SPYFALL: {
      const {selectedNamesByIndex} = state.spyfall;
      const clonedNames = new Set(selectedNamesByIndex);
      clonedNames.add(action.data);
      return Object.assign({}, state, {
        spyfall: {
          ...state.spyfall,
          selectedNamesByIndex: clonedNames,
        }
      });
    }
    case REMOVE_NAME_SPYFALL: {
      const {selectedNamesByIndex} = state.spyfall;
      const clonedNames = new Set(selectedNamesByIndex);
      clonedNames.delete(action.data);
      return Object.assign({}, state, {
        spyfall: {
          ...state.spyfall,
          selectedNamesByIndex: clonedNames,
        }
      });
    }
    case HANDLE_LOCATION_SPYFALL: {
      const clonedLocations = new Map(state.spyfall.selectedLocations);
      const oldVal = clonedLocations.get(action.data);
      if(oldVal) {
        clonedLocations.set(action.data, (oldVal+1) % NUM_STATES_LOCATIONS);
      }
      else {
        clonedLocations.set(action.data, 1);
      }
      return Object.assign({}, state, {
        spyfall: {
          ...state.spyfall,
          selectedLocations: clonedLocations,
        }
      })
    }
    case CLEAR_SPYFALL_BOARD: {
      return Object.assign({}, state, {
        spyfall: {
          selectedLocations: new Map(),
          selectedNamesByIndex: new Set(),
          locations: [],
          spyIndex: 0,
          secretLocation: "",
        }
      });
    }
    default:
      return state;
  }
}

export function playState(state = initialState, action) {
  switch(action.game) {
    case 'mafia': {
      return mafiaReducers(state, action);
    }
    default: { // spyfall
      return spyfallReducers(state, action);
    }
  }
}