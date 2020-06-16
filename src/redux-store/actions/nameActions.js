export const SET_GAME_USERNAME = "SET_GAME_USERNAME";
export const RETURN_TO_GAME_SELECT = "RETURN_TO_GAME_SELECT"; 

export function setGameUsername(data) {
  return {
    type: SET_GAME_USERNAME,
    username: data.username,
    gamename: data.gamename,
  };
}

export function returnToGameSelect() {
  return {
    type: RETURN_TO_GAME_SELECT
  };
}