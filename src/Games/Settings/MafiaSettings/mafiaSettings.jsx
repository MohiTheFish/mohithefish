import React, {useState} from 'react';
import {connect} from 'react-redux';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
// import Switch from '@material-ui/core/Switch';

import SubmitSettings from 'Games/Settings/submitSettings';
import PrivateSwitch from '../privateSwitch';
import store from 'Games/redux-store';

import './mafiaSettings.scss';


const MAX_TIME = 600;
export function isValidTimeLimit(time) {
  return /^\d+$/.test(time) && Number.parseInt(time) <= MAX_TIME;
}
export function isValidDayTimeLimit(time) {
  const isInteger = /^(\+|-)?\d+$/.test(time);
  if (!isInteger) {
    return 'Must be an integer at most 600.';
  }
  const sizeMet = Number.parseInt(time) <= MAX_TIME;
  if (!sizeMet) {
    return 'Too large';
  }
  return '';

}
export function isValidMafia(num) {
  const isInteger = /^(\+|-)?\d+$/.test(num);
  if (!isInteger) {
    return 'Must be an integer.';
  }
  const sizeMet = Number.parseInt(num) < store.getState().gameData.members.length;
  if (!sizeMet) {
    return 'Too large';
  }
  return '';
}


function TimeLimit(props) {
  const { time, validTime, setTime, children, quantity } = props;
  const question = children[0];
  const errormsg = children[1];
  const explanation = children[2];
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
      {explanation}
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

// function FormSwitch(props) {
//   const {isActive, setIsActive, children} = props;
//   const question = children[0];
//   const explanation = children[1];
//   function handleChange(e) {
//     setIsActive(!isActive);
//   }
//   return (
//     <div className="setting">
//       {question}
//       <div className="switch-wrapper">
//         <p>Public</p>
//         <Switch
//           checked={true}
//           onChange={()=>{console.log('switched')}}
//           color="primary"
//           name="checked"
//           inputProps={{ 'aria-label': 'primary checkbox' }}
//         />
//         <p>Private</p>
//       </div>
//     </div>
//   )
// }

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

  const dayTimeMessage = isValidDayTimeLimit(dayTimeLimit);
  const isValidNightTime = isValidTimeLimit(nightTimeLimit);
  const isValidDefenseTime = isValidTimeLimit(defenseTimeLimit);
  const mafiaMessage = isValidMafia(numMafia);

  const allValid = !dayTimeMessage && isValidNightTime && isValidDefenseTime && !mafiaMessage;
  
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

        <TimeLimit time={dayTimeLimit} setTime={setDayTimeLimit} validTime={!dayTimeMessage}>
          <h3>How long is the day phase?</h3>
          <FormHelperText>{dayTimeMessage}</FormHelperText>
          <h6>A negative value will have day time continue until everyone abstains or someone is killed.</h6>
        </TimeLimit>

        <TimeLimit time={nightTimeLimit} setTime={setNightTimeLimit} validTime={isValidNightTime}>
          <h3>How long is the night phase?</h3>
          <FormHelperText>Must be an integer at most {MAX_TIME}</FormHelperText>
        </TimeLimit>

        <TimeLimit time={defenseTimeLimit} setTime={setDefenseTimeLimit} validTime={isValidDefenseTime}>
          <h3>How long is the defense?</h3>
          <FormHelperText>Must be an integer at most {MAX_TIME}</FormHelperText>
        </TimeLimit>

        <TimeLimit time={numMafia} setTime={setNumMafia} validTime={!mafiaMessage} quantity>
          <h3>How many mafia are there?</h3>
          <FormHelperText>{mafiaMessage}</FormHelperText>
          <h6>A negative value will have the server pick an optimal number of mafia.</h6>
        </TimeLimit>

      </div>
      <SubmitSettings isValid={allValid} settings={settings}/>
    </> 
  )
}


const SubscribedMafiaSettings = connect(mapStateToPropsMS)(MafiaSettings);
export default SubscribedMafiaSettings;