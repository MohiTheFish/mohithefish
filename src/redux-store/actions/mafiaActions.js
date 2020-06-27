import {UPDATE_MAIN_TIME} from './spyfallActions';

export const START_GAME_MAFIA = 'START_GAME_MAFIA';
export const CLEAR_MAFIA_BOARD = 'CLEAR_MAFIA_BOARD';

export function startMafia(gameState) {
  return {
    game: 'mafia',
    type: START_GAME_MAFIA,
    gameState,
  };
}

export function updateMainMafiaTime(time) {
  const [phase, mainTime] = time;
  return {
    game: 'mafia',
    type: UPDATE_MAIN_TIME,
    phase,
    time: mainTime,
  };
}

export function clearMafiaBoard() {
  return {
    game: 'mafia',
    type: CLEAR_MAFIA_BOARD,
  };
}