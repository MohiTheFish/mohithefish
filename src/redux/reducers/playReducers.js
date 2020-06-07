import {
  ADD_LOCATION_SPYFALL,
  REMOVE_LOCATION_SPYFALL,
  ADD_NAME_SPYFALL,
  REMOVE_NAME_SPYFALL,
} from 'redux/actions/spyfallActions';

export const initialState = {
  time: 0,
  spyfall: {
    selectedLocations: new Set(),
    selectedNamesByIndex: new Set(),
    isSpy: false,
  },
};

export function playState(state = initialState, action) {
  switch(action.type) {
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
    case ADD_NAME_SPYFALL: {
      const {selectedNamesByIndex} = state.spyfall;
      selectedNamesByIndex.add(action.data);
      return Object.assign({}, state, {
        spyfall: {
          selectedNamesByIndex,
        }
      });
    }
    case REMOVE_NAME_SPYFALL: {
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