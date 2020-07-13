import React from 'react';
import { connect } from 'react-redux';
import {SettingsItem, SettingsName, SettingsValue} from '../settingsView';
function mapStateToProps(state) {
  return {
    ...state.gameData.settings.mafia
  };
}

function interpretDuration(num) {
  if (num <0) {
    return 'Infinite';
  }
  return `${num} seconds`;
}

function interpretNumMafia(num) {
  if (num <= 0) {
    return 'Server decides';
  }
  return num;
}
function MafiaView(props) {
  const { dayTimeLimit, nightTimeLimit, defenseTimeLimit, numMafia} = props;
  return (
    <div className="settings-list">
      <SettingsItem>
        <SettingsName>Day Time Duration</SettingsName>
        <SettingsValue>{interpretDuration(dayTimeLimit)}</SettingsValue>
      </SettingsItem>
      <SettingsItem>
        <SettingsName>Night Time Duration</SettingsName>
        <SettingsValue>{interpretDuration(nightTimeLimit)}</SettingsValue>
      </SettingsItem>
      <SettingsItem>
        <SettingsName>Defense Time Duration</SettingsName>
        <SettingsValue>{interpretDuration(defenseTimeLimit)}</SettingsValue>
      </SettingsItem>
      <SettingsItem>
        <SettingsName>Number of Mafia</SettingsName>
        <SettingsValue>{ interpretNumMafia(numMafia)}</SettingsValue>
      </SettingsItem>
    </div>
  )
}

const SubscribedMafiaView = connect(mapStateToProps)(MafiaView);
export default SubscribedMafiaView;