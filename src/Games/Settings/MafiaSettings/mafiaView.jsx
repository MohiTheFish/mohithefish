import React from 'react';
import { connect } from 'react-redux';
import {SettingsItem, SettingsName, SettingsValue} from '../settingsView';
function mapStateToProps(state) {
  return {
    ...state.gameData.settings.mafia
  };
}
function MafiaView(props) {
  const { dayTimeLimit, nightTimeLimit, defenseTimeLimit, numMafia} = props;
  return (
    <div className="settings-list">
      <SettingsItem>
        <SettingsName>Day Time Limit</SettingsName>
        <SettingsValue>{`${dayTimeLimit} seconds`}</SettingsValue>
      </SettingsItem>
      <SettingsItem>
        <SettingsName>Night Time Limit</SettingsName>
        <SettingsValue>{`${nightTimeLimit} seconds`}</SettingsValue>
      </SettingsItem>
      <SettingsItem>
        <SettingsName>Defense Time Limit</SettingsName>
        <SettingsValue>{`${defenseTimeLimit} seconds`}</SettingsValue>
      </SettingsItem>
      <SettingsItem>
        <SettingsName>Number of Mafia</SettingsName>
        <SettingsValue>{numMafia}</SettingsValue>
      </SettingsItem>
    </div>
  )
}

const SubscribedMafiaView = connect(mapStateToProps)(MafiaView);
export default SubscribedMafiaView;