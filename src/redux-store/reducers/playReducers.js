import {
  ADD_LOCATION_SPYFALL,
  REMOVE_LOCATION_SPYFALL,
  ADD_NAME_SPYFALL,
  REMOVE_NAME_SPYFALL,
  START_GAME_SPYFALL,
  UPDATE_SPYFALL_TIME,
  CLEAR_SPYFALL_BOARD
} from 'redux-store/actions/spyfallActions';

export const initialState = {
  time: 0,
  spyfall: {
    selectedLocations: new Set(),
    selectedNamesByIndex: new Set(),
    spyIndex: 0,
    locations: [
      'Airplane',
      'Bank',
      'Beach',
      'Cathedral',
      'Circus Tent',
      'Corporate Party',
      'Cruise Ship',
      'Crusader Army',
      'Casino',
      'Day Spa',
      'Embassy',
      'Gas Station',
      'Hospital',
      'Hotel',
      'Military Base',
      'Movie Studio',
      'Passenger Train',
      'Pirate Ship',
      'Polar Station',
      'Police Station',
      'Restaurant',
      'School',
      'Space Station',
      'Submarine',
      'Supermarket',
      'Theater',
      'University',
      'World War II Squad'
    ]
    ,
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
    case CLEAR_SPYFALL_BOARD: {
      return Object.assign({}, state, {
        selectedLocations: new Set(),
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