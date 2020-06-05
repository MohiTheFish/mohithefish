import React from 'react';
import { connect } from 'react-redux';

function mapStateToPropsRI(state) {
  const gd = state.gameData;
  return {
    host: gd.host,
    selectedChoice: gd.selectedChoice,
    isConnected: gd.isConnected,
    isLoadingRoom: gd.isLoadingRoom,
  };
}

function RoomInfo(props) {
  console.log(props);
  const { isConnected, selectedChoice, username } = props;
  if (!isConnected || !selectedChoice) { return ""; }

  if (selectedChoice === "create") {
    return (
      <div className="room-info">
        <div className="room-title">
          <h3>Host: {username}</h3>
          <h3>Room id:</h3>
          <h4>Share your room id to let others join!</h4>
        </div>
      </div>
    );
  }
  else {
    return (
      <div className="room-info">
        <div className="room-title">
          Enter room you would like to join:
        </div>
      </div>
    );
  }
}


const SubscribedRoomInfo = connect(mapStateToPropsRI)(RoomInfo);
export default SubscribedRoomInfo;