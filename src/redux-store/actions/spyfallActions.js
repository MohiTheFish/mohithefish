export const START_GAME_SPYFALL = "START_GAME_SPYFALL";
export const UPDATE_SPYFALL_TIME = "UDPATE_SPYFALL_TIME";
export const HANDLE_LOCATION_SPYFALL = "HANDLE_LOCATION_SPYFALL";
export const ADD_NAME_SPYFALL = "ADD_NAME_SPYFALL";
export const REMOVE_NAME_SPYFALL = "REMOVE_NAME_SPYFALL";
export const CLEAR_SPYFALL_BOARD = "CLEAR_SPYFALL_BOARD";

export function startSpyfall(gameState) {
  return {
    type: START_GAME_SPYFALL,
    gameState, 
  };
}

export function updateSpyfallTime(time) {
  return {
    type: UPDATE_SPYFALL_TIME,
    time,
  };
}

export function handleLocationSpyfall(e) {
  return {
    type: HANDLE_LOCATION_SPYFALL,
    data: e.target.textContent,
  };
}

export function addNameSpyfall(index) {
  return {
    type: ADD_NAME_SPYFALL,
    data: index,
  };
}

export function removeNameSpyfall(index) {
  return {
    type: REMOVE_NAME_SPYFALL,
    data: index,
  };
}

export function clearSpyfallBoard() {
  return {
    type: CLEAR_SPYFALL_BOARD,
  }
}