import React, {useState} from 'react';
import Paper from '@material-ui/core/Paper';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

export function RoleCard(props) {
  const [isMini, setIsMini] = useState(true);
  console.log(isMini);
  const Icon = isMini ? ExpandMoreIcon : ExpandLessIcon;
  const rwclass = `role-wrapper ${isMini ? 'mini' : ''}`;
  return (
    <Paper className={rwclass}>
      <div className="role-info" onClick={
        isMini
        ? () => setIsMini(false)
        : () => setIsMini(true)
      }>
        <h2 className="team">Team: Village</h2>
        <h3 className="role">Role: Detective</h3>
        <Icon className="icon" />
      </div>
      <p className="power-info">Power: At night, you can check a player as to whether or not they are mafia.</p>
      <h3 className="win-condition">Winning Condition: All Non-Villagers are eliminated.</h3>
    </Paper>
  );
}