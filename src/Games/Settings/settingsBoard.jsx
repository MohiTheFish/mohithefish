import React from 'react';
import Paper from '@material-ui/core/Paper';

import MafiaView from './MafiaSettings/mafiaView';
import MafiaSettings from './MafiaSettings/mafiaSettings';
import SpyfallView from './SpyfallSettings/spyfallView';
import SpyfallSettings from './SpyfallSettings/spyfallSettings';
import store from 'Games/redux-store';

import './settingsBoard.scss';
import { connect } from 'react-redux';

function renderCurrentSettings(GameView) {
  return <GameView />
}

function renderEditSettings(GameSettings, showPrivacy) {
  return <GameSettings showPrivacy={showPrivacy} isLobbyPrivate={store.getState().gameData.settings.isPrivate} />;
}

function mapStateToProps(state) {
  const isUpdating = state.gameData.isUpdating;
  return {
    isUpdating,
  };
}

function renderStatusMessage(isUpdating, canEdit) {
  if (canEdit) {
    if(isUpdating) {
      return <h3 className="status">Updating...</h3>;
    }
    return <h3 className="status fade-out">Updated</h3>;
  }
  return '';
}

function SettingsBoard(props) {
  const { canEdit, isUpdating } = props;
  const { gamename } = store.getState().gameCredentials;
  let GameSettings = undefined;
  let GameView = undefined; 
  switch(gamename) {
    case 'spyfall': {
      GameSettings = SpyfallSettings;
      GameView = SpyfallView; 
      break;
    }
    case 'mafia': {
      GameSettings = MafiaSettings;
      GameView = MafiaView;
      break;
    }
    default: {
      throw new Error('Not accepted game type');
    }
  }
  return (
    <Paper className="board-wrapper settings-board-wrapper">
      <div className="settings-header">
        <h1>Game Settings</h1>
        {renderStatusMessage(isUpdating, canEdit)}
      </div>
      <div className="room-settings">
        {
          canEdit 
          ? renderEditSettings(GameSettings, false)
          : renderCurrentSettings(GameView)
        }
      </div>
    </Paper>
  );
}

const SubscribedSettingsBoard = connect(mapStateToProps)(SettingsBoard);
export default SubscribedSettingsBoard;
