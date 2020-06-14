import React from 'react';
import Paper from '@material-ui/core/Paper';

import SpyfallSettings from './spyfallSettings';
import SubmitSettings from 'Games/WaitingRoom/RoomInfoComponents/submitSettings';

import './settingsBoard.scss';

function renderCurrentSettings() {
  return (
    <div className="settings-list">

    </div>
  );
}

export function renderEditSettings(GameSettings, showPrivacy) {
  return (
    <div className="room-settings">
      <GameSettings showPrivacy={showPrivacy}/>
      <SubmitSettings />
    </div>
  );
}

export default function SettingsBoard() {
  const canEdit = true;
  return (
    <Paper className="settings-board-wrapper">
      <div className="settings-board">
        <div className="settings-header">
          <h1>Game Settings</h1>
        </div>
        {
          canEdit 
          ? renderEditSettings(SpyfallSettings, false)
          : renderCurrentSettings()
        }
      </div>
    </Paper>
  );
}