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
} from 'redux-store/actions/mafiaActions';

export const initialState = {
  time: 0,
  spyfall: {
    selectedLocations: new Map(),
    selectedNamesByIndex: new Set(),
    spyIndex: 0,
    locations: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'],
    secretLocation: "",
  },
  mafia: {
    phase: 0,
    time: 0,
    roleCount: {},
  }
};

const NUM_STATES_LOCATIONS = 3;

function mafiaReducers(state, action) {
  switch(action.type) {
    case START_GAME_MAFIA: {
      console.log(action);
      return {
        ...state,
        time: 0,
        mafia: {
          roleCount: action.gameState.roleCount,
          phase: 0,
        }
      }
    }
    case UPDATE_MAIN_TIME: {
      return {
        ...state,
        time: action.time,
        mafia: {
          ...state.mafia,
          phase: action.phase,
        }
      };
    }
    default: return state;
  }
}

function spyfallReducers(state, action) {
  switch(action.type) {
    case START_GAME_SPYFALL: {
      return {
        time: action.gameState.time,
        spyfall: {
          spyIndex: action.gameState.spyIndex,
          selectedLocations: state.spyfall.selectedLocations,
          selectedNamesByIndex: state.spyfall.selectedNamesByIndex,
          locations: action.gameState.locations,
          secretLocation: action.gameState.secretLocation,
        },
        mafia: state.mafia,
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