import { combineReducers } from 'redux';
import { gameCredentials } from './nameReducers';
import { gameData } from './gameReducers';

export default combineReducers({
  gameCredentials,
  gameData,
});
