import {
  SET_IS_LOADINGROOM,
  ROOM_CREATED,
  VISIBLE_ROOMS,
  ROOM_JOINED,
  ROOM_SPECTATED,
  SET_MY_INDEX,
  PLAYER_ADDED,
  PLAYER_LEFT,
  SET_IS_PRIVATE,
  SET_IS_LOADING_ROOM_SELECTED_CHOICE,
  lobbyStates,
  ROOM_SETTINGS_UPDATED,
  SET_SETTINGS_IS_UPDATING,
  CLEAR_ROOM_INFO,
} from '../actions/gameSetupActions';

import {
  START_GAME_SPYFALL,
  CLEAR_SPYFALL_BOARD, 
} from 'redux-store/actions/spyfallActions';

import {
  START_GAME_MAFIA,
  CLEAR_MAFIA_BOARD,
} from 'redux-store/actions/mafiaActions';


const defaultSpyfallSettings = {
  time: "8", // minutes
  gameType: "Locations",
};

const defaultMafiaSettings =  {
  dayTimeLimit: 300, //seconds
  nightTimeLimit: 60, //seconds
  defenseTimeLimit: 25, //seconds
  numMafia: -1,
  allowSK: false,
  allowJoker: false,
}

export const initialState = process.env.REACT_APP_DESIGN === 'true' 
? {
  selectedChoice: lobbyStates.CREATED,
  myIndex: 0,
  isLoadingRoom: false,
  numPlayers: 4,
  members: ["Mohitheifhs", "other guy", "nobody", 'zendaya', 'is', 'my', 'queen', 'zendaya', 'is', 'my', 'queen'],
  spectators: [],
  isSpectator: false,
  roomId: "fwef98c09we-89w-efcab-aew-9gfw",
  rooms: [],
  isPlaying: false,
  isUpdating: false,
  settings: {
    isPrivate: true,
    spyfall: defaultSpyfallSettings,
    mafia: defaultMafiaSettings
  }
}
: {
  selectedChoice: "",
  myIndex: 0,
  isLoadingRoom: false,
  numPlayers: 1,
  members: [],
  spectators: [],
  isSpectator: false,
  roomId: "",
  rooms: [],
  isPlaying: false,
  isUpdating: false,
  settings: {
    isPrivate: true,
    spyfall: defaultSpyfallSettings,
    mafia: defaultMafiaSettings
  }
}

export function gameData(state = initialState, action) {
  switch(action.type) {
    case SET_IS_LOADING_ROOM_SELECTED_CHOICE: {
      return Object.assign({}, state, {
        selectedChoice: action.selectedChoice,
      });
    }
    case SET_IS_LOADINGROOM:
      return Object.assign({}, state, {
        isLoadingRoom: action.isLoadingRoom
      });
    case ROOM_CREATED: {
      const { members, roomId } = action.data;
      return Object.assign({}, state, {
        members: members,
        roomId: roomId,
        myIndex: members.length-1,
        selectedChoice: lobbyStates.CREATED,
      });
    }
    case ROOM_SETTINGS_UPDATED: {
      const newSettings = action.settings;
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
        rooms: action.data,
        isLoadingRoom: false, 
      });
    }
    case ROOM_JOINED: {
      console.log(action.data);
      const { members, roomId, settings: newSettings } = action.data;
      return Object.assign({}, state, {
        members,
        roomId,
        myIndex: members.length-1,
        selectedChoice: lobbyStates.JOINED,
        settings: newSettings,
      });
    }
    case ROOM_SPECTATED: {
      const { members, roomId, settings: newSettings, spectators } = action.data;
      return Object.assign({}, state, {
        members,
        roomId,
        myIndex: spectators.length-1,
        selectedChoice: lobbyStates.JOINED,
        settings: newSettings,
        spectators,
      })
    }
    case SET_MY_INDEX: {
      const { members, myIndex } = action.data;
      return {
        ...state,
        members,
        myIndex,
        isSpectator: false, 
        spectators: [],
      }
    }
    case PLAYER_ADDED: {
      const { members, roomId } = action.data;
      return Object.assign({}, state, {
        members: members,
        roomId: roomId,
      });
    }
    case PLAYER_LEFT: {
      const { members, myIndex } = state;
      const { index: deletedIndex } = action;
      const newState = {
        myIndex,
        members: [],
      };

      if (deletedIndex < myIndex ) {
        newState.myIndex -= 1;
        if (newState.myIndex === 0) {
          newState.selectedChoice = lobbyStates.CREATED;
        }
      }
      newState.members =  members.filter((m, index) => (index !== deletedIndex) );
      return Object.assign({}, state, newState);
    }
    case START_GAME_SPYFALL: 
    case START_GAME_MAFIA : {
      return Object.assign({}, state, {
        isPlaying: true,
      });
    }
    case CLEAR_MAFIA_BOARD:
    case CLEAR_SPYFALL_BOARD: {
      return Object.assign({}, state, {
        isPlaying: false,
        isLoadingRoom: true,
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
        members: [],
        spectators: [],
        isSpectator: false,
        roomId: "",
        myIndex: -1,
        rooms: [],
        isPlaying: false,
        isUpdating: false,
        settings: {
          isPrivate: true,
          spyfall: defaultSpyfallSettings,
          mafia: defaultMafiaSettings
        }
      }
      )
    }
    default:
      return state;
  } 
}