import React, {useState} from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

import store from 'redux-store';
import './role.scss';

// Enum from server
const ROLES = {
  VILLAGER : 0,
  DETECTIVE : 1,
  MEDIC : 2,
  MAFIA : 3,
  GODFATHER : 4,
  SK : 5,
  JOKER : 6,
  NUM_ROLES : 7,
};

function TeamName(props) {
  return <h2 className="team">Team: {props.children}</h2>
}

function RoleName(props) {
  return <h3 className="role">Role: {props.children}</h3>
}

function PowerInfo(props) {
  return <p className="power-info">Power: {props.children}</p>
}

function WinCondition(props) {
  return <h3 className="win-condition">Winning Condition: {props.children}</h3>
}

/**
 * Function to return relevant string values for populating card information
 * The default case will be a villager. 
 * @param {number} role 
 */
function getRoleDetails(role) {
  switch(role) {
    case ROLES.DETECTIVE: {
      return {
        teamName: 'Village',
        roleName: 'Detective',
        powerInfo: 'At night, you can check a player as to whether or not they are mafia.',
        winCondition: 'All Non-Villagers are eliminated.',
      }
    }
    case ROLES.MEDIC: {
      return {
        teamName: 'Village',
        roleName: 'Medic',
        powerInfo: 'At night, you can rescue a player from being executed. You will not know who was targeted.',
        winCondition: 'All Non-Villagers are eliminated.',
      }
    }
    case ROLES.MAFIA: {
      return {
        teamName: 'Mafia',
        roleName: 'Mafia Member',
        powerInfo: 'At night, you (and your team) vote to execute a single player.',
        winCondition: 'All Villagers are eliminated.',
      }
    }

    default: {
      return {
        teamName: 'Village',
        roleName: 'Detective',
        powerInfo: 'None',
        winCondition: 'All Non-Villagers are eliminated.',
      }
    }

  }
}

export function RoleCard() {
  const [isMini, setIsMini] = useState(true);
  const [roleInfo, ] = useState(getRoleDetails(store.getState().playState.mafia.role));
  
  
  const Icon = isMini ? ExpandMoreIcon : ExpandLessIcon;
  const rwclass = `papermui ${roleInfo.teamName} ${isMini ? 'mini' : ''}`;
  return (
    <div id="role-wrapper" className={rwclass}>
      <div className="role-info" onClick={
        isMini
        ? () => setIsMini(false)
        : () => setIsMini(true)
      }>
        <TeamName>{roleInfo.teamName}</TeamName>
        <RoleName>{roleInfo.roleName}</RoleName>
        <Icon className="icon" />
      </div>
      <PowerInfo>{roleInfo.powerInfo}</PowerInfo>
      <WinCondition>{roleInfo.winCondition}</WinCondition>
    </div>
  );
}