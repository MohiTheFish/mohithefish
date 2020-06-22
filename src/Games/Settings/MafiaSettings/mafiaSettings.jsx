import React, {useState} from 'react';
import {connect} from 'react-redux';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';

import SubmitSettings from 'Games/Settings/submitSettings';
import PrivateSwitch from '../privateSwitch';
import store from 'redux-store';

import './mafiaSettings.scss';


const MAX_TIME = 600;
export function isValidTimeLimit(time) {
  return /^\d+$/.test(time) && Number.parseInt(time) <= MAX_TIME;
}
export function isValidNum(num) {
  return /^\d+$/.test(num) && Number.parseInt(num) < store.getState().gameData.members.length/2;
}


function TimeLimit(props) {
  const { time, validTime, setTime, children, quantity } = props;
  const question = children[0];
  const errormsg = children[1];
  let error = !validTime;

  let inputProps = {
    className: "time-input",
    label: "Time",
    value: time,
    onChange: handleChange,
    endAdornment: <InputAdornment position="end">sec</InputAdornment>, 
  }
  if (quantity) {
    inputProps.className = "quantity-input";
    delete inputProps.endAdornment;
  }

  function handleChange(e) {
    setTime(e.target.value);
  }
  return (
    <div className="setting">
      {question}
      <FormControl error={error}>
        <Input
          {...inputProps}
        />
        {
          error
          ? errormsg
          : ''
        }
      </FormControl>
    </div>
  );
}

function mapStateToPropsMS(state, ownProps) {
  return {
    numMembers: state.gameData.members.length,
    ...ownProps
  };
}

function MafiaSettings(props) {
  const { showPrivacy, isLobbyPrivate } = props;

  const [dayTimeLimit, setDayTimeLimit] = useState(store.getState().gameData.settings.mafia.dayTimeLimit);
  const [nightTimeLimit, setNightTimeLimit] = useState(store.getState().gameData.settings.mafia.nightTimeLimit);
  const [defenseTimeLimit, setDefenseTimeLimit] = useState(store.getState().gameData.settings.mafia.defenseTimeLimit);
  const [numMafia, setNumMafia] = useState(store.getState().gameData.settings.mafia.numMafia);

  const isValidDayTime = isValidTimeLimit(dayTimeLimit);
  const isValidNightTime = isValidTimeLimit(nightTimeLimit);
  const isValidDefenseTime = isValidTimeLimit(defenseTimeLimit);
  const isValidMafia = isValidNum(numMafia);

  const allValid = isValidDayTime && isValidNightTime && isValidDefenseTime && isValidMafia;
  const settings = {
    isPrivate: isLobbyPrivate, 
    mafia: {
      dayTimeLimit, 
      nightTimeLimit,
      defenseTimeLimit,
      numMafia,
      allowJoker: false,
      allowSK: false,
    }
  };
  return (
    <>
      <div className="settings-wrapper mafia-settings">
        { showPrivacy ? <PrivateSwitch /> : ''}

        <TimeLimit time={dayTimeLimit} setTime={setDayTimeLimit} validTime={isValidDayTime}>
          <h3>How long is the day phase?</h3>
          <FormHelperText>Must be an integer at most {MAX_TIME}</FormHelperText>
        </TimeLimit>

        <TimeLimit time={nightTimeLimit} setTime={setNightTimeLimit} validTime={isValidNightTime}>
          <h3>How long is the night phase?</h3>
          <FormHelperText>Must be an integer at most {MAX_TIME}</FormHelperText>
        </TimeLimit>

        <TimeLimit time={defenseTimeLimit} setTime={setDefenseTimeLimit} validTime={isValidDefenseTime}>
          <h3>How long is the defense?</h3>
          <FormHelperText>Must be an integer at most {MAX_TIME}</FormHelperText>
        </TimeLimit>

        <TimeLimit time={numMafia} setTime={setNumMafia} validTime={isValidMafia} quantity>
          <h3>How many mafia are there?</h3>
          <FormHelperText>Must be an integer at most half the number of players.</FormHelperText>
        </TimeLimit>
      </div>
      <SubmitSettings isValid={allValid} settings={settings}/>
    </> 
  )
}


const SubscribedMafiaSettings = connect(mapStateToPropsMS)(MafiaSettings);
export default SubscribedMafiaSettings;