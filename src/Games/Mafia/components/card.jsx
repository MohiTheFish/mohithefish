import React from 'react';
import Paper from '@material-ui/core/Paper';

export function PlayerCard(props) {

  return (
    <Paper className="role-wrapper">
      <div className="role-info">
        <h2 className="team">Team: Village</h2>
        <h3 className="role">Role: Sheriff/Detective</h3>
        <div className="power-info">
          <p>Power: At night, you can check a player as to whether or not they are mafia.</p>
        </div>
      </div>
    </Paper>
  )
}