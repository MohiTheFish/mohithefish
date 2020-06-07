import {
  START_GAME_SPYFALL,
  ADD_LOCATION_SPYFALL,
  REMOVE_LOCATION_SPYFALL,
  ADD_NAME,
  REMOVE_NAME,
} from 'redux/actions/spyfallActions';

export const initialState = {
  time: 0,
  isPlaying: false,
  spyfall: {
    selectedLocations: new Set(),
    selectedNamesByIndex: new Set(),
    isSpy: false,
  },
};

export function playState(state = initialState, action) {
  switch(action.type) {
    case START_GAME_SPYFALL: return Object.assign({}, state, {
      time: action.time,
      isPlaying: true,
    });
    case ADD_LOCATION_SPYFALL: {
      const {selectedLocations} = state.spyfall;
      selectedLocations.add(action.data);
      return Object.assign({}, state, {
        spyfall: {
          selectedLocations,
        }
      });
    }
    case REMOVE_LOCATION_SPYFALL: {
      const {selectedLocations} = state.spyfall;
      selectedLocations.delete(action.data);
      return Object.assign({}, state, {
        spyfall: {
          selectedLocations,
        }
      });
    }
    case ADD_NAME: {
      const {selectedNamesByIndex} = state.spyfall;
      selectedNamesByIndex.add(action.data);
      return Object.assign({}, state, {
        spyfall: {
          selectedNamesByIndex,
        }
      });
    }
    case REMOVE_NAME: {
      const {selectedNamesByIndex} = state.spyfall;
      selectedNamesByIndex.delete(action.data);
      return Object.assign({}, state, {
        spyfall: {
          selectedNamesByIndex,
        }
      });
    }
    default:
      return state;
  }
}