import React from 'react';
import Paper from '@material-ui/core/Paper';

export function RoleCard(props) {

  return (
    <Paper className="role-wrapper">
      <div className="role-info">
        <h2 className="team">Team: Village</h2>
        <h3 className="role">Role: Sheriff/Detective</h3>
        <p className="power-info">Power: At night, you can check a player as to whether or not they are mafia.</p>
        <h3 className="win-condition">Winning Condition: All Non-Villagers are eliminated.</h3>
      </div>
    </Paper>
  );
}