import React from 'react';

import Paper from '@material-ui/core/Paper';

function renderCurrentSettings() {
  return (
    <div className="settings-list">

    </div>
  );
}

function renderEditingSettings() {
  return (
    <div>
      You can edit the game settings.
    </div>
  )
}

export default function SettingsBoard() {
  const canEdit = false;
  return (
    <Paper className="settings-board-wrapper">
      <div className="settings-board">
        <div className="settings-header">
          <h1>Game Settings</h1>
        </div>
        {
          canEdit 
          ? renderEditingSettings()
          : renderCurrentSettings()
        }
      </div>
    </Paper>
  );
}