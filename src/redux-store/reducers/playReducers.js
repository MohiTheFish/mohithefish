import {
  ADD_LOCATION_SPYFALL,
  REMOVE_LOCATION_SPYFALL,
  ADD_NAME_SPYFALL,
  REMOVE_NAME_SPYFALL,
  START_GAME_SPYFALL,
  UPDATE_SPYFALL_TIME,
} from 'redux-store/actions/spyfallActions';

export const initialState = {
  time: 0,
  spyfall: {
    selectedLocations: new Set(),
    selectedNamesByIndex: new Set(),
    spyIndex: 0,
    locations: [],
    secretLocation: "",
  },
};

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
    case ADD_LOCATION_SPYFALL: {
      const {selectedLocations} = state.spyfall;
      const clonedLocations = new Set(selectedLocations);
      clonedLocations.add(action.data);
      return Object.assign({}, state, {
        spyfall: {
          ...state.spyfall,
          selectedLocations: clonedLocations,
        }
      });
    }
    case REMOVE_LOCATION_SPYFALL: {
      const {selectedLocations} = state.spyfall;
      const clonedLocations = new Set(selectedLocations);
      clonedLocations.delete(action.data);
      return Object.assign({}, state, {
        spyfall: {
          ...state.spyfall,
          selectedLocations: clonedLocations,
        }
      });
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
    default:
      return state;
  }
}