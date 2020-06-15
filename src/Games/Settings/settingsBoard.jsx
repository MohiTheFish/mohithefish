import React from 'react';
import Paper from '@material-ui/core/Paper';

import SpyfallView from './SpyfallSettings/spyfallView';
import SpyfallSettings from './SpyfallSettings/spyfallSettings';
import SubmitSettings from 'Games/WaitingRoom/RoomInfoComponents/submitSettings';
import store from 'redux-store';

import './settingsBoard.scss';

function renderCurrentSettings() {
  return <SpyfallView />
}

function renderEditSettings(GameSettings, showPrivacy) {
  return <GameSettings showPrivacy={showPrivacy}/>;
}

export default function SettingsBoard(props) {
  const { canEdit } = props;
  const { gamename } = store.getState().gameCredentials;
  return (
    <Paper className="settings-board-wrapper">
      <div className="settings-header">
        <h1>Game Settings</h1>
      </div>
      {
        canEdit 
        ? <div className="room-settings">
            {renderEditSettings(SpyfallSettings, false)}
            <SubmitSettings />
          </div>
        : <div className="room-settings">
            {renderCurrentSettings()}
          </div>
      }
    </Paper>
  );
}