import { createStore } from 'redux'
import MohiApp from '../reducers';
import {initialState as initalGameSessionNameState} from '../reducers/nameReducers';

const defaultState = {
  gameSessionNameManager: initalGameSessionNameState,
};

function loadState() {
  const username = localStorage.getItem('username');
  const gamename = localStorage.getItem('gamename');

  console.log(username);
  console.log(gamename);
  if (!username && !gamename) {
    return {
        gameSessionNameManager: {
        username,
        gamename,
      }
    }
  }

  return defaultState;
}

const store = createStore(MohiApp, loadState());

export function saveState(state) {
  const { username, gamename } = state.gameSessionNameManager;
  localStorage.setItem('username', username);
  localStorage.setItem('gamename', gamename);
}

export function saveCurrentState() {
  saveState(store.getState());
}

export default store;