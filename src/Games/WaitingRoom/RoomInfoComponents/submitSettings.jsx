import React from 'react';
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button';
import { isValidTime as isValidSpyfall } from 'Games/Settings/SpyfallSettings/spyfallSettings';
import { createRoomWithSettings, updateRoomSettings } from 'Games/socketHandlers';
import { lobbyStates } from 'redux-store/actions/gameSetupActions';

function mapStateToProps(state) {
  const gamename = state.gameCredentials.gamename;
  const selectedChoice = state.gameData.selectedChoice;
  const settings = state.gameData.settings;
  return {
    gamename,
    settings,
    selectedChoice,
  };
}

function validateSettings(context, settings) {
  switch(context) {
    case 'spyfall': {
      return isValidSpyfall(settings[context].time);
    }
    default: return true;
  }
}
function SubmitSettings(props) {
  const {gamename, settings, selectedChoice} = props;
  let isValid = validateSettings(gamename, settings);
  const isCreating = selectedChoice === lobbyStates.CREATE;

  function createRoom() {
    if (isCreating) {
      createRoomWithSettings(settings);
    }
    else {
      updateRoomSettings(settings);
    }
  }

  return(
    <Button disabled={!isValid} variant="contained" onClick={createRoom}>
      {isCreating ? 'Create' : 'Save'} 
    </Button>
  );
}

const SubscribedSubmitSettings = connect(mapStateToProps)(SubmitSettings);
export default SubscribedSubmitSettings;