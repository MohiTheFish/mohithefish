export const SET_IS_CONNECTED = 'SET_IS_CONNECTED'; 
export const SET_GAMENAME = "SET_GAMENAME";
export const SET_USERNAME = "SET_USERNAME";
export const RETURN_TO_GAME_SELECT = "RETURN_TO_GAME_SELECT"; 


export function setIsConnected(isConnected) {
  return {
    type: SET_IS_CONNECTED,
    isConnected,
  };
}

export function setGameName(game) {
  return {
    type: SET_GAMENAME,
    game,
  };
}
export function setUserName(name) {
  return {
    type: SET_USERNAME,
    name,
  }
}

export function returnToGameSelect() {
  return {
    type: RETURN_TO_GAME_SELECT
  };
}
