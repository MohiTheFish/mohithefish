import React from 'react';
import { connect } from 'react-redux';
import {SettingsItem, SettingsName, SettingsValue} from '../settingsView';
function mapStateToProps(state) {
  const {settings} = state.gameData;
  return {
    isPrivate: settings.isPrivate,
    time: settings.spyfall.time,
  };
}
function SpyfallView(props) {
  const { time } = props;
  return (
    <div className="settings-list">
      <SettingsItem>
        <SettingsName>Time Length</SettingsName>
        <SettingsValue>{`${time} minutes`}</SettingsValue>
      </SettingsItem>
    </div>
  )
}

const SubscribedSpyfallView = connect(mapStateToProps)(SpyfallView);
export default SubscribedSpyfallView;