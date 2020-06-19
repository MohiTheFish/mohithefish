import {
  SET_IS_CONNECTED,
  SET_IS_LOADINGROOM,
  SET_HOST_NAME,
  ROOM_CREATED,
  VISIBLE_ROOMS,
  ROOM_MEMBERS_UPDATED,
  ROOM_JOINED,
  PLAYER_LEFT,
  START_PLAYING,
  SET_IS_PRIVATE,
  SET_IS_LOADING_ROOM_SELECTED_CHOICE,
  lobbyStates,
  ROOM_SETTINGS_UPDATED,
  SET_SETTINGS_IS_UPDATING,
  CLEAR_ROOM_INFO,
} from '../actions/gameSetupActions';

import {
  SET_SPYFALL_TIME,
} from '../actions/SpecificGameActions/spyfallGameActions';

import {
  CLEAR_SPYFALL_BOARD,
} from 'redux-store/actions/spyfallActions';

export const initialState = process.env.REACT_APP_DESIGN === 'true' 
? {
  isConnected: true,
  selectedChoice: lobbyStates.CREATED,
  myIndex: -1,
  isLoadingRoom: false,
  numPlayers: 4,
  host: "Mohitheifhs",
  members: ["other guy", "nobody", 'zendaya', 'is', 'my', 'queen', "other guy", "nobody", 'zendaya', 'is', 'my', 'queen'],
  roomId: "fwef98c09we-89w-efcab-aew-9gfw",
  rooms: [],
  isPlaying: false,
  isUpdating: false,
  settings: {
    isPrivate: true,
    spyfall: {
      time: "8", // minutes
      gameType: "Locations",
    }
  }
}
: {
  isConnected: false,
  selectedChoice: "",
  myIndex: -1,
  isLoadingRoom: false,
  numPlayers: 1,
  host: "",
  members: [],
  roomId: "",
  rooms: [],
  isPlaying: false,
  isUpdating: false,
  settings: {
    isPrivate: true,
    spyfall: {
      time: "8", // minutes
      gameType: "Locations"
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
    default: return state;
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
        selectedChoice: lobbyStates.CREATED,
      });
    }
    case ROOM_MEMBERS_UPDATED: {
      const { hostname, members, roomId } = action.data;
      return Object.assign({}, state, {
        host: hostname,
        members: members,
        roomId: roomId,
        myIndex: state.myIndex,
      });
    }
    case ROOM_SETTINGS_UPDATED: {
      const newSettings = action.settings.settings;

      return Object.assign({}, state, {
        settings: newSettings,
        isUpdating: false,
      });
    }
    case SET_SETTINGS_IS_UPDATING: {
      return Object.assign({}, state, {
        isUpdating: true,
      });
    }
    case VISIBLE_ROOMS: {
      return Object.assign({}, state, {
        rooms: action.data.rooms,
        isLoadingRoom: false, 
      });
    }
    case ROOM_JOINED: {
      const { hostname, members, roomId, settings: newSettings } = action.data;
      return Object.assign({}, state, {
        host: hostname,
        members: members,
        roomId: roomId,
        myIndex: members.length-1,
        selectedChoice: lobbyStates.JOINED,
        settings: newSettings,
      });
    }
    case PLAYER_LEFT: {
      const { members, myIndex } = state;
      const { index: deletedIndex } = action;
      const newState = {
        myIndex,
        members: [],
      };
      // If host left
      if (deletedIndex === -1) {
        newState.members = members.slice(1);
        newState.myIndex -= 1;
        // If I am now the host
        if (newState.myIndex === -1) {
          newState.selectedChoice = lobbyStates.CREATED;
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
      });
    }
    case CLEAR_SPYFALL_BOARD: {
      return Object.assign({}, state, {
        isPlaying: false,
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
    case CLEAR_ROOM_INFO: {
      return Object.assign({}, state, {
        isConnected: state.isConnected,
        selectedChoice: "",
        isLoadingRoom: false,
        numPlayers: 1,
        host: "",
        members: [],
        roomId: "",
        myIndex: -1,
        rooms: [],
        isPlaying: false,
        isUpdating: false,
        settings: {
          isPrivate: true,
          spyfall: {
            time: "8", // minutes
            gameType: "Locations",
          }
        }
      })
    }
    default:
      return state;
  } 
}