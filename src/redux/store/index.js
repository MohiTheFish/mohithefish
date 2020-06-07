import { createStore } from 'redux'
import MohiApp from '../reducers';
import {initialState as initialGameData} from '../reducers/gameReducers';
import {initialState as initialGameCredentialState} from '../reducers/nameReducers';
import {initialState as initialPlayState} from '../reducers/playReducers';

/**
 * REDUX WORK FLOW
 * 1) Create an action. Follow the schema already defined.
 *  (Create a constant action type. Setup the data to be passed to reducer)
 * 2) Add to the reducer. Follow the schema already defined. 
 *  (Make sure to return an object that has all keys as before.)
 * 3) You may now *dispatch* an action from anywhere.
 *  (Note: component must *subscribe* via the connect method in order to be refreshed)
 * Maybe 4) Sometimes you may want to create a whole separate data flow. Simply create the relevant files
 *  and then make sure to update this default state to include those changes. 
 */
const defaultState = {
  gameData: initialGameData,
  gameCredentials: initialGameCredentialState,
  playState: initialPlayState,
};
console.log(defaultState);
export const storageType = sessionStorage;

function loadState() {
  const gameData = JSON.parse(storageType.getItem('gameData'));
  const username = storageType.getItem('username');
  const gamename = storageType.getItem('gamename');
  const userId = storageType.getItem('userId');

  if (!username || !gamename || !userId) {
    return defaultState;
  }
  const myState = {};
  myState.gameCredentials = {
    username,
    gamename,
    userId,
  }

  if (gameData && gameData.isPlaying) {
    myState.gameData = gameData;
  }
  else {
    myState.gameData = initialGameData;
  }

  myState.playState = initialPlayState;

  return myState;
}

const store = createStore(MohiApp, loadState());
console.log(store.getState());

export function saveState(state) {
  const { username, gamename, userId } = state.gameCredentials;
  storageType.setItem('username', username);
  storageType.setItem('gamename', gamename);
  storageType.setItem('userId', userId);
}

export function saveCurrentState() {
  saveState(store.getState());
}


store.subscribe(() => {
  console.log(store.getState());
})
export default store;