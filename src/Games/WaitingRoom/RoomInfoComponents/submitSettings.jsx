import React from 'react';
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button';
import {isValidTime} from 'redux/actions/SpecificGameActions/spyfallGameActions';
import { createRoomWithSettings } from 'Games/socketHandlers';

function mapStateToProps(state) {
  const gamename = state.gameCredentials.gamename;
  const settings = state.gameData.settings;
  return {
    gamename,
    settings,
  };
}

function validateSettings(context, settings) {
  switch(context) {
    case 'spyfall': {
      return isValidTime(settings[context].time);
    }
    default: return true;
  }
}
function SubmitSettings(props) {
  const {gamename, settings} = props;
  let isValid = validateSettings(gamename, settings);

  function createRoom() {
    createRoomWithSettings(settings);
  }

  return(
    <Button disabled={!isValid} variant="contained" onClick={createRoom}>
      Create 
    </Button>
  );
}

const SubscribedSubmitSettings = connect(mapStateToProps)(SubmitSettings);
export default SubscribedSubmitSettings;