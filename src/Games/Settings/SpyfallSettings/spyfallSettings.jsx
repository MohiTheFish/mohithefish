import React from 'react';
import {connect} from 'react-redux';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import PrivateSwitch from '../privateSwitch';
import {
  setSpyfallTime,
  MAX_SPYFALL_TIME,
} from 'redux-store/actions/SpecificGameActions/spyfallGameActions';

import './spyfallSettings.scss';



export function isValidTime(time) {
  return /^\d+$/.test(time) && Number.parseInt(time) < MAX_SPYFALL_TIME;
}
const mapStateToPropsTL = (state) => {
  const {time} = state.gameData.settings[state.gameCredentials.gamename];
  return {
    time,
  };
}
const mapDispatchToPropsTL = (dispatch) => {
  return {
    handleSpyfallTime: (e) => {
      const time = e.target.value;
      dispatch(setSpyfallTime(e.target.value, isValidTime(time)));
    }
  };
}

function TimeLimit(props) {
  const { time, handleSpyfallTime } = props;
  let error = !isValidTime(time);
  return (
    <div className="setting">
      <h3>How long is the game?</h3>
      <FormControl error={error}>
        <Input
          className="time-input"
          id="standard"
          label="Time"
          value={time}
          onChange={handleSpyfallTime}
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
const SubscribedTimeLimit = connect(mapStateToPropsTL, mapDispatchToPropsTL)(TimeLimit);

function mapStateToPropsGTS(state, ownProps) {
  console.log(ownProps);
  return {
    gametype: "Locations",
  };
}
function mapDispatchToPropsGTS(dispatch) {
  return {
    handleChange: (e) => {
      dispatch()
    }
  }
}
function GameTypeSelector(props) {
  const { gametype, handleChange } = props;
  return (
    <div className="setting">
      <h3>What category are the options?</h3>
      <FormControl>
        <Select
          className="game-type-input"
          value={gametype}
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
const SubscribedGameTypeSelector = connect(mapStateToPropsGTS, mapDispatchToPropsGTS)(GameTypeSelector);

export default function SpyfallSettings(props) {
  const { showPrivacy } = props;
  return (
    <div className="settings-wrapper">
      { showPrivacy ? <PrivateSwitch /> : ''}
      <SubscribedTimeLimit />
      <SubscribedGameTypeSelector />
    </div>
  )
}
