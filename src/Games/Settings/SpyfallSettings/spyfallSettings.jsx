import React, {useState} from 'react';
import {connect} from 'react-redux';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import SubmitSettings from 'Games/Settings/submitSettings';
import PrivateSwitch from '../privateSwitch';
import store from 'redux-store';

import './spyfallSettings.scss';

const MAX_SPYFALL_TIME = 100;
export function isValidTime(time) {
  return /^\d+$/.test(time) && Number.parseInt(time) < MAX_SPYFALL_TIME;
}

const mapStateToPropsTL = (state, ownProps) => {
  return {...ownProps};
}
function TimeLimit(props) {
  const { time, validTime, setTime } = props;
  let error = !validTime;

  function handleChange(e) {
    setTime(e.target.value);
  }
  return (
    <div className="setting">
      <h3>How long is the game?</h3>
      <FormControl error={error}>
        <Input
          className="time-input"
          id="standard"
          label="Time"
          value={time}
          onChange={handleChange}
          endAdornment={<InputAdornment position="end">min</InputAdornment>}
        />
        {
          error
          ? <FormHelperText id="component-error-text">Must be an integer less than {MAX_SPYFALL_TIME}</FormHelperText>
          : ''
        }
      </FormControl>
      
    </div>
  );
}
const SubscribedTimeLimit = connect(mapStateToPropsTL)(TimeLimit);

function mapStateToPropsGTS(state, ownProps) {
  return {...ownProps};
}
function GameTypeSelector(props) {
  const { gameType, setGameType } = props;
  function handleChange(e) {
    setGameType(e.target.value);
  }
  return (
    <div className="setting">
      <h3>What category are the options?</h3>
      <FormControl>
        <Select
          className="game-type-input"
          value={gameType}
          onChange={handleChange}
          inputProps={{ 'aria-label': 'Game Type' }}
        >
          <MenuItem value="Locations">Locations</MenuItem>
          <MenuItem value="Foods">Foods</MenuItem>
        </Select>
        <FormHelperText>Game Type</FormHelperText>
      </FormControl>
    </div>
  )
}
const SubscribedGameTypeSelector = connect(mapStateToPropsGTS)(GameTypeSelector);

export default function SpyfallSettings(props) {
  const { showPrivacy, isLobbyPrivate } = props;
  const [time, setTime] = useState(store.getState().gameData.settings.spyfall.time);
  const [gameType, setGameType] = useState(store.getState().gameData.settings.spyfall.gameType);
  let validTime = isValidTime(time);

  const settings = {
    isPrivate: isLobbyPrivate,
    spyfall: {
      time,
      gameType,
    },
  };
  return (
    <>
      <div className="settings-wrapper spyfall-settings">
        { showPrivacy ? <PrivateSwitch /> : ''}
        <SubscribedTimeLimit time={time} setTime={setTime} validTime={validTime}/>
        <SubscribedGameTypeSelector gameType={gameType} setGameType={setGameType}/>
      </div>
      <SubmitSettings isValid={validTime} settings={settings}/>
    </> 
  )
}
