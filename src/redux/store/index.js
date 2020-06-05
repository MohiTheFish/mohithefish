import { createStore } from 'redux'
import MohiApp from '../reducers';
import {initialState as initialGameData} from '../reducers/gameReducers';
import {initialState as initialGameCredentialState} from '../reducers/nameReducers';

const defaultState = {
  gameCredentials: initialGameCredentialState,
  gameData: initialGameData,
};
console.log(defaultState);
const storageType = localStorage;

function loadState() {
  const username = storageType.getItem('username');
  const gamename = storageType.getItem('gamename');
  const uuid = storageType.getItem('uuid');

  if (!username || !gamename || !uuid) {
    return defaultState;
  }

  return {
    gameData: initialGameData,
    gameCredentials: {
      username,
      gamename,
      uuid
    }
  };
}

const store = createStore(MohiApp, loadState());
console.log(store.getState());

export function saveState(state) {
  const { username, gamename, uuid } = state.gameCredentials;
  storageType.setItem('username', username);
  storageType.setItem('gamename', gamename);
  storageType.setItem('uuid', uuid);
}

export function saveCurrentState() {
  saveState(store.getState());
}

export default store;