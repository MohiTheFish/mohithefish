import React from 'react';
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button';
import { isValidTime as isValidSpyfall } from 'Games/Settings/SpyfallSettings/spyfallSettings';
import { createRoomWithSettings, updateRoomSettings } from 'Games/socketHandlers';
import { setSettingsIsUpdating, lobbyStates } from 'redux-store/actions/gameSetupActions';

function mapStateToProps(state) {
  const gamename = state.gameCredentials.gamename;
  const selectedChoice = state.gameData.selectedChoice;
  const settings = state.gameData.settings;
  const isUpdating = state.gameData.isUpdatings;
  return {
    gamename,
    settings,
    selectedChoice,
    isUpdating,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setIsUpdating: () => {
      dispatch(setSettingsIsUpdating());
    }
  }
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
  const {gamename, settings, selectedChoice, isUpdating, setIsUpdating} = props;
  let isValid = validateSettings(gamename, settings);
  const isCreating = selectedChoice === lobbyStates.CREATE;

  function createRoom() {
    if (isCreating) {
      createRoomWithSettings(settings);
    }
    else {
      setIsUpdating();
      updateRoomSettings(settings);
    }
  }

  return(
    <Button disabled={!isValid || (!isCreating && isUpdating)} variant="contained" onClick={createRoom}>
      {isCreating ? 'Create' : 'Save'} 
    </Button>
  );
}

const SubscribedSubmitSettings = connect(mapStateToProps, mapDispatchToProps)(SubmitSettings);
export default SubscribedSubmitSettings;