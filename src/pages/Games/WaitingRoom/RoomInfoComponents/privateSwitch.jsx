import React from 'react';
import { connect } from 'react-redux';
import Switch from '@material-ui/core/Switch';

import { roomPrivacyToggled } from "redux/actions/gameActions";

const mapStateToProps = (state) => {
  const {settings} = state.gameData;
  return {
    isPrivate: settings.isPrivate,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleSwitch: (e) => {
      dispatch(roomPrivacyToggled());
    }
  }
}

function PrivateSwitch(props) {
  const {isPrivate, handleSwitch} = props;

  return (
    <div className="switch-wrapper">
      <p>Public</p>
      <Switch
        checked={isPrivate}
        onChange={handleSwitch}
        color="primary"
        name="checked"
        inputProps={{ 'aria-label': 'primary checkbox' }}
      />
      <p>Private</p>
    </div>
  );
}

const SubscribedPrivateSwitch = connect(mapStateToProps, mapDispatchToProps)(PrivateSwitch);
export default SubscribedPrivateSwitch;