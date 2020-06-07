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
      const {selectedLocations, selectedNamesByIndex, isSpy} = state.spyfall;
      const clonedLocations = new Set(selectedLocations);
      clonedLocations.add(action.data);
      return Object.assign({}, state, {
        spyfall: {
          selectedLocations: clonedLocations,
          selectedNamesByIndex,
          isSpy
        }
      });
    }
    case REMOVE_LOCATION_SPYFALL: {
      const {selectedLocations, selectedNamesByIndex, isSpy} = state.spyfall;
      const clonedLocations = new Set(selectedLocations);
      clonedLocations.delete(action.data);
      return Object.assign({}, state, {
        spyfall: {
          selectedLocations: clonedLocations,
          selectedNamesByIndex,
          isSpy
        }
      });
    }
    case ADD_NAME_SPYFALL: {
      const {selectedLocations, selectedNamesByIndex, isSpy} = state.spyfall;
      const clonedNames = new Set(selectedNamesByIndex);
      clonedNames.add(action.data);
      return Object.assign({}, state, {
        spyfall: {
          selectedLocations,
          selectedNamesByIndex: clonedNames,
          isSpy
        }
      });
    }
    case REMOVE_NAME_SPYFALL: {
      const {selectedLocations, selectedNamesByIndex, isSpy} = state.spyfall;
      const clonedNames = new Set(selectedNamesByIndex);
      clonedNames.delete(action.data);
      return Object.assign({}, state, {
        spyfall: {
          selectedLocations,
          selectedNamesByIndex: clonedNames,
          isSpy
        }
      });
    }
    default:
      return state;
  }
}