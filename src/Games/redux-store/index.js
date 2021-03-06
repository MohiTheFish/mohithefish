import { createStore } from 'redux';
import MohiApp, {defaultState} from './reducers';

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
    isConnected: false,
    isUpdatingName: false,
  }

  if (gameData && gameData.isPlaying) {
    myState.gameData = gameData;
  }
  else {
    myState.gameData = defaultState.gameData;
  }

  myState.playState = defaultState.playState;

  return myState;
}

const store = process.env.REACT_APP_DESIGN === 'true' 
? createStore(MohiApp)
: createStore(MohiApp, loadState());

/**
 * Saves a piece of the state that will be useful in cases of refresh or disconnects.
 * @param {any} state The total state object kept track of by redux
 */
export function saveState(state) {
  const { username, gamename, userId } = state.gameCredentials;
  storageType.setItem('username', username);
  storageType.setItem('gamename', gamename);
  storageType.setItem('userId', userId);
}

export function saveCurrentState() {
  saveState(store.getState());
}

if (process.env.NODE_ENV === 'development') {
  store.subscribe(() => {
    console.log(store.getState());
  })
}
export default store;