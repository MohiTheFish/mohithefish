import React from 'react';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  console.log(state);
  const {settings} = state.gameData;
  return {
    isPrivate: settings.isPrivate,
    time: settings.spyfall.time,
  };
}
function SpyfallView(props) {
  const { isPrivate, time} = props;
  console.log(props);
  return (
    <div className="settings-list">
      <div className="settings-item">
        <div className="item-name">
          <h3>Time Length</h3>
        </div>
        <div className="item-value">
          <h3>{time} minutes</h3>
        </div>
      </div>
    </div>
  )
}

const SubscribedSpyfallView = connect(mapStateToProps)(SpyfallView);
export default SubscribedSpyfallView;