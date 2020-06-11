import {
  SET_IS_CONNECTED,
  SET_IS_LOADINGROOM,
  SET_HOST_NAME,
  ROOM_CREATED,
  VISIBLE_ROOMS,
  ROOM_UPDATED,
  ROOM_JOINED,
  PLAYER_LEFT,
  START_PLAYING,
  SET_IS_PRIVATE,
  SET_IS_LOADING_ROOM_SELECTED_CHOICE,
} from '../actions/gameActions';

import {
  SET_SPYFALL_TIME
} from '../actions/SpecificGameActions/spyfallGameActions';

export const initialState = {
  isConnected: false,
  selectedChoice: "",
  isLoadingRoom: false,
  numPlayers: 1,
  host: "",
  members: [],
  roomId: "",
  myIndex: -1,
  rooms: [],
  isPlaying: false,
  settings: {
    isPrivate: true,
    spyfall: {
      time: "8", // minutes
    }
  }
}

function spyfallGameDataReducer(state, action) {
  switch(action.type) {
    case SET_SPYFALL_TIME: {
      return Object.assign({}, state, {
        settings: {
          ...state.settings,
          spyfall: {
            ...state.settings.spyfall,
            time: action.time,
          }
        }
      })
    }
  }
}

export function gameData(state = initialState, action) {
  switch(action.game) {
    case 'spyfall': return spyfallGameDataReducer(state, action);
    default: break;
  }
  switch(action.type) {
    case SET_IS_CONNECTED:
      return Object.assign({}, state, {
        isConnected: action.isConnected
      });
    case SET_IS_LOADING_ROOM_SELECTED_CHOICE: {
      return Object.assign({}, state, {
        isConnected: action.isConnected,
        selectedChoice: action.selectedChoice,
      });
    }
    case SET_IS_LOADINGROOM:
      return Object.assign({}, state, {
        isLoadingRoom: action.isLoadingRoom
      });
    case SET_HOST_NAME:
      return Object.assign({}, state, {
        host: action.host
      });
    case ROOM_CREATED: {
      const { hostname, members, roomId } = action.data;
      return Object.assign({}, state, {
        host: hostname,
        members: members,
        roomId: roomId,
        myIndex: members.length-1,
      });
    }
    case ROOM_UPDATED: {
      const { hostname, members, roomId } = action.data;
      return Object.assign({}, state, {
        host: hostname,
        members: members,
        roomId: roomId,
        myIndex: state.myIndex,
      });
    }
    case VISIBLE_ROOMS: {
      return Object.assign({}, state, {
        rooms: action.data.rooms,
        isLoadingRoom: false, 
      });
    }
    case ROOM_JOINED: {
      const { hostname, members, roomId } = action.data;
      return Object.assign({}, state, {
        host: hostname,
        members: members,
        roomId: roomId,
        myIndex: members.length-1,
      });
    }
    case PLAYER_LEFT: {
      const { members, myIndex } = state;
      const { index: deletedIndex } = action;
      const newState = {
        myIndex,
        members: [],
      };
      if (deletedIndex === -1) {
        newState.members = members.slice(1);
        newState.myIndex -= 1;
        if (newState.myIndex === -1) {
          newState.selectedChoice = "create";
        }
        newState.host = members[0];
      }
      else {
        if (deletedIndex < myIndex) {
          newState.myIndex -= 1;
        }
        newState.members =  members.filter((m, index) => (index !== deletedIndex) );
      }
      return Object.assign({}, state, newState);
    }
    case START_PLAYING: {
      return Object.assign({}, state, {
        isPlaying: true,
        initialGameState: action.initialGameState
      });
    }
    case SET_IS_PRIVATE: {
      return Object.assign({}, state, {
        settings: {
          ...state.settings,
          isPrivate: !state.settings.isPrivate
        }
      });
    }
    default:
      return state;
  } 
}