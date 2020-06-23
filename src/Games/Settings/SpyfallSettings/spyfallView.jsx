import React from 'react';
import { connect } from 'react-redux';
import {SettingsItem, SettingsName, SettingsValue} from '../settingsView';
function mapStateToProps(state) {
  const {settings} = state.gameData;
  console.log(settings);
  return {
    time: settings.spyfall.time,
    gameType: settings.spyfall.gameType,
  };
}
function SpyfallView(props) {
  const { time, gameType } = props;
  return (
    <div className="settings-list">
      <SettingsItem>
        <SettingsName>Time Length</SettingsName>
        <SettingsValue>{`${time} minutes`}</SettingsValue>
      </SettingsItem>
      <SettingsItem>
        <SettingsName>Game Type</SettingsName>
        <SettingsValue>{gameType}</SettingsValue>
      </SettingsItem>
    </div>
  )
}

const SubscribedSpyfallView = connect(mapStateToProps)(SpyfallView);
export default SubscribedSpyfallView;