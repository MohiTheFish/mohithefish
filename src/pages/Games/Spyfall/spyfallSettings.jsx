import React from 'react';
import {connect} from 'react-redux';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';

import PrivateSwitch from '../WaitingRoom/RoomInfoComponents/privateSwitch';
import {
  isValidTime,
  setSpyfallTime,
  MAX_SPYFALL_TIME,
} from 'redux/actions/SpecificGameActions/spyfallGameActions';


const mapStateToPropsTL = (state) => {
  const {time} = state.gameData.settings[state.gameCredentials.gamename];
  return {
    time,
  };
}
const mapDispatchToPropsTL = (dispatch) => {
  return {
    handleSpyfallTime: (e) => {
      dispatch(setSpyfallTime(e.target.value));
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

export default function SpyfallSettings() {
  return (
    <div className="settings-wrapper">
      <PrivateSwitch />
      <SubscribedTimeLimit />
    </div>
  )
}