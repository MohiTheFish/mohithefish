import React from 'react';
import Paper from '@material-ui/core/Paper';

import SpyfallView from './SpyfallSettings/spyfallView';
import SpyfallSettings from './SpyfallSettings/spyfallSettings';
import SubmitSettings from 'Games/Settings/submitSettings';
import store from 'redux-store';

import './settingsBoard.scss';
import { connect } from 'react-redux';

function renderCurrentSettings(GameView) {
  return <GameView />
}

function renderEditSettings(GameSettings, showPrivacy) {
  return <GameSettings showPrivacy={showPrivacy}/>;
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
  return (
    <Paper className="board-wrapper settings-board-wrapper">
      <div className="settings-header">
        <h1>Game Settings</h1>
        {renderStatusMessage(isUpdating, canEdit)}
      </div>
      {
        canEdit 
        ? <div className="room-settings">
            {renderEditSettings(SpyfallSettings, false)}
            <SubmitSettings />
          </div>
        : <div className="room-settings">
            {renderCurrentSettings(SpyfallView)}
          </div>
      }
    </Paper>
  );
}

const SubscribedSettingsBoard = connect(mapStateToProps)(SettingsBoard);
export default SubscribedSettingsBoard;
