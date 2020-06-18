import {
  HANDLE_LOCATION_SPYFALL,
  ADD_NAME_SPYFALL,
  REMOVE_NAME_SPYFALL,
  START_GAME_SPYFALL,
  UPDATE_SPYFALL_TIME,
  CLEAR_SPYFALL_BOARD
} from 'redux-store/actions/spyfallActions';

export const initialState = {
  time: 0,
  spyfall: {
    selectedLocations: new Map(),
    selectedNamesByIndex: new Set(),
    spyIndex: 0,
    locations: [],
    secretLocation: "",
  },
};

const NUM_STATES_LOCATIONS = 3;

export function playState(state = initialState, action) {
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
        }
      };
    }
    case UPDATE_SPYFALL_TIME: {
      return {
        time: action.time,
        spyfall: state.spyfall,
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
        selectedLocations: new Map(),
        selectedNamesByIndex: new Set(),
        locations: [],
        spyIndex: 0,
        secretLocation: "",
      });
    }
    default:
      return state;
  }
}