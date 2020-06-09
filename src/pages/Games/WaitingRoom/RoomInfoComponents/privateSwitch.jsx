import React from 'react';
import Switch from '@material-ui/core/Switch';

const mapStateToProps = (state) => {
  const {settings} = state.gameData;
  return {
    isPrivate: settings.isPrivate,
  };
}

export default function PrivateSwitch(props) {
  const {isPrivate} = props;

  function handleChange(e) { 
    console.log(!isPrivate);
  }
  return (
    <div className="switch-wrapper">
      <p>Public</p>
      <Switch
        checked={isPrivate}
        onChange={handleChange}
        color="primary"
        name="checked"
        inputProps={{ 'aria-label': 'primary checkbox' }}
      />
      <p>Private</p>
    </div>
  );
}