import React from 'react';
import {connect} from 'react-redux';
import TextField from '@material-ui/core/TextField';
import PrivateSwitch from '../WaitingRoom/RoomInfoComponents/privateSwitch';

const mapStateToProps = (state) => {
  const {settings} = state.gameData;
  return {
    time: settings.chosenTime
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleSpyfallTime: (e) => {
      dispatch()
    }
  }
}

function TimeLimit(props) {
  const { time } = props;
  return (
    <div className="setting">
      <h3>Decide how many minutes a game should last for.</h3>
      <TextField
        required
        id="outlined-required"
        label="Required"
        defaultValue="8"
        variant="outlined"
        value={time}
      />
    </div>
  );
}

const SubscribedTimeLimit = connect(mapStateToProps, mapDispatchToProps)(TimeLimit);

export default function SpyfallSettings() {
  return (
    <>
    <PrivateSwitch />
    {/* <SubscribedTimeLimit /> */}
    </>
  )
}
