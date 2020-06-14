import { combineReducers } from 'redux';
import { gameCredentials } from './nameReducers';
import { gameData } from './gameReducers';
import { playState } from './playReducers';
export default combineReducers({
  gameCredentials,
  gameData,
  playState,
});
