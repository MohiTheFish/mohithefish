import React from 'react';
import { connect } from 'react-redux';

function mapStateToPropsRI(state) {
  const gd = state.gameData;
  return {
    username: state.gameCredentials.username,
    host: gd.host,
    selectedChoice: gd.selectedChoice,
    isConnected: gd.isConnected,
    isLoadingRoom: gd.isLoadingRoom,
    members: gd.members,
    roomname: gd.roomname,
    myIndex: gd.myIndex,
  };
}

function renderMembers(members) {
  if (members.length === 0) {
    return (
      <div className="members">
        <h3>Share your room id to let others join!</h3>
      </div>
    )
  }
  return (
    <div className="members">
      <h3 className="others">Other players</h3>
      {
        members.map((m, index) => 
          <h4 key={`${m}${index}`}>{m}</h4>
        )
      }
    </div>
  )
}

function RoomInfo(props) {
  console.log(props);
  const { isConnected, selectedChoice, host, roomname, members} = props;
  if (!isConnected || !selectedChoice) { return ""; }

  if (selectedChoice === "create") {
    return (
      <div className="room-info">
        <div className="room-title">
          <h2>Host: {host}</h2>
          <h2>Room id: {roomname}</h2>
          {renderMembers(members)}
        </div>
      </div>
    );
  }
  else { //selectedChoice === "join"
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