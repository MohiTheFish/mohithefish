export const START_GAME_SPYFALL = "START_GAME_SPYFALL";
export const UPDATE_MAIN_TIME = "UPDATE_MAIN_TIME";
export const HANDLE_LOCATION_SPYFALL = "HANDLE_LOCATION_SPYFALL";
export const ADD_NAME_SPYFALL = "ADD_NAME_SPYFALL";
export const REMOVE_NAME_SPYFALL = "REMOVE_NAME_SPYFALL";
export const CLEAR_SPYFALL_BOARD = "CLEAR_SPYFALL_BOARD";

export function startSpyfall(gameState) {
  return {
    game: 'spyfall',
    type: START_GAME_SPYFALL,
    gameState, 
  };
}

export function updateSpyfallTime(time) {
  return {
    game: 'spyfall',
    type: UPDATE_MAIN_TIME,
    time,
  };
}

export function handleLocationSpyfall(e) {
  return {
    game: 'spyfall',
    type: HANDLE_LOCATION_SPYFALL,
    data: e.target.textContent,
  };
}

export function addNameSpyfall(index) {
  return {
    game: 'spyfall',
    type: ADD_NAME_SPYFALL,
    data: index,
  };
}

export function removeNameSpyfall(index) {
  return {
    game: 'spyfall',
    type: REMOVE_NAME_SPYFALL,
    data: index,
  };
}

export function clearSpyfallBoard() {
  return {
    game: 'spyfall',
    type: CLEAR_SPYFALL_BOARD,
  }
}