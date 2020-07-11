import {UPDATE_MAIN_TIME} from './spyfallActions';

export const START_GAME_MAFIA = 'START_GAME_MAFIA';
export const SECONDARY_TIME_UPDATE = "SECONDARY_TIME_UPDATE";
export const BEGIN_TRIAL = "BEGIN_TRIAL";
export const CLEAR_MAFIA_BOARD = 'CLEAR_MAFIA_BOARD';
export const CHAT_UPDATED = "CHAT_UPDATED";
export const OTHER_PLAYER_VOTED = 'OTHER_PLAYER_VOTED';
export const I_VOTED = 'I_VOTED';
export const OTHER_PLAYER_GUILTY_VOTED = 'OTHER_PLAYER_GUILTY_VOTED';
export const I_GUILTY_VOTED = 'I_GUILTY_VOTED';
export const COURT_RESULT = 'COURT_RESULT';
export const USED_POWER = 'USED_POWER';

export function startMafia(gameState) {
  return {
    game: 'mafia',
    type: START_GAME_MAFIA,
    gameState,
  };
}

export function updateMainMafiaTime(time) {
  return {
    game: 'mafia',
    type: UPDATE_MAIN_TIME,
    data: time,
  };
}

export function beginTrial(nameIndex) {
  return {
    game: 'mafia',
    type: BEGIN_TRIAL,
    data: nameIndex,
  };
}

export function secondaryTimeUpdate(time) {
  return {
    game: 'mafia',
    type: SECONDARY_TIME_UPDATE,
    data: time,
  }
}

export function clearMafiaBoard() {
  return {
    game: 'mafia',
    type: CLEAR_MAFIA_BOARD,
  };
}

export function chatUpdated(data) {
  return {
    game: 'mafia',
    type: CHAT_UPDATED,
    ...data,
  }
}

export function otherPlayerVotedMafia(data) {
  return {
    game: 'mafia',
    type: OTHER_PLAYER_VOTED,
    ...data,
  }
}

export function iVotedMafia(data) {
  return {
    game: 'mafia',
    type: I_VOTED,
    ...data,
  };
}

export function otherPlayerGuiltyVotedMafia(data) {
  return {
    game: 'mafia',
    type: OTHER_PLAYER_GUILTY_VOTED,
    ...data,
  }
}

export function iGuiltyVotedMafia(data) {
  return {
    game: 'mafia',
    type: I_GUILTY_VOTED,
    ...data,
  }
}

export function courtResult(data) {
  return {
    game: 'mafia',
    type: COURT_RESULT,
    data,
  };
}

export function usedPower(data) {
  return {
    game: 'mafia',
    type: USED_POWER,
    data,
  };
}