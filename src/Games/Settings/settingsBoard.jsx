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
  return <GameSettings showPrivacy={showPrivacy}/>;
}

export default function SettingsBoard() {
  const canEdit = true;
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
        : renderCurrentSettings()
      }
    </Paper>
  );
}