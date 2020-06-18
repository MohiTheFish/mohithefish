import React from 'react';
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button';
import { isValidTime as isValidSpyfall } from 'Games/Settings/SpyfallSettings/spyfallSettings';
import { createRoomWithSettings, updateRoomSettings } from 'Games/socketHandlers';
import { setSettingsIsUpdating, lobbyStates } from 'redux-store/actions/gameSetupActions';

function mapStateToProps(state, ownProps) {
  const selectedChoice = state.gameData.selectedChoice;
  const isUpdating = state.gameData.isUpdatings;
  return {
    ...ownProps,
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

function SubmitSettings(props) {
  console.log(props);
  const {settings, selectedChoice, isUpdating, setIsUpdating, isValid} = props;
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