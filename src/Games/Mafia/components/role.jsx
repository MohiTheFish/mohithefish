import React, {useState} from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

import './role.scss';
export function RoleCard(props) {
  const [isMini, setIsMini] = useState(true);
  
  const Icon = isMini ? ExpandMoreIcon : ExpandLessIcon;
  const rwclass = `papermui ${isMini ? 'mini' : ''}`;
  return (
    <div id="role-wrapper" className={rwclass}>
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
    </div>
  );
}