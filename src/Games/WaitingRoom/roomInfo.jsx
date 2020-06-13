import React from 'react';
import { connect } from 'react-redux';

import Grid from "@material-ui/core/Grid";
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import RefreshIcon from '@material-ui/icons/Refresh';

import Loading from 'components/Loading/loading';
import MyInput from './RoomInfoComponents/myInput';
import SubmitSettings from './RoomInfoComponents/submitSettings';
import { joinRoom, getAvailableRooms, startGame } from '../socketHandlers';
import SpyfallSettings from '../Spyfall/spyfallSettings';

import { lobbyStates } from 'redux/actions/gameSetupActions';

import './_roomInfo.scss';

function mapStateToPropsRI(state) {
  const gd = state.gameData;
  return {
    username: state.gameCredentials.username,
    gamename: state.gameCredentials.gamename,
    host: gd.host,
    selectedChoice: gd.selectedChoice,
    isConnected: gd.isConnected,
    isLoadingRoom: gd.isLoadingRoom,
    members: gd.members,
    roomId: gd.roomId,
    myIndex: gd.myIndex,
    rooms: gd.rooms,
  };
}

function renderMembers(members, myIndex) {
  if (members.length === 0) {
    return (
      <div className="members">
        <h3>Share your room id to let others join!</h3>
      </div>
    );
  }
  return (
    <>
      {
        myIndex === -1
        ? <Button variant="contained" onClick={startGame} className="host-control-panel">
            Play
          </Button>
        : ''
      }
      <div className="members">
        <h3 className="others">Other players</h3>
        {
          members.map((m, index) => 
            <h4 
              className={index === myIndex ? "my-name" : ""}
              key={`${m}${index}`}>{m}</h4>
          )
        }
      </div>
    </>
  )
}

function renderAvailableRooms(rooms, isLoadingRoom) {
  if (isLoadingRoom) {
    return <Loading />;
  }
  if (rooms.length === 0) {
    return <h3 className="no-avail-rooms">Sorry. No other rooms were found at this time.</h3>
  }
  return rooms.map(room => {
    return (
      <Grid item key={room.hostname} xs={12} className="room">
        <Button className="data" onClick={()=>{joinRoom(room.roomId)}}>
          <h3 className="left">
            Host: &nbsp;
            <span className="bold">{room.hostname}</span>
          </h3>
          <h3 className="right">
            Number of Players: &nbsp;
            <span className="bold">{1 + room.numPlayers}</span>
          </h3>
        </Button>
      </Grid>
    )
  })
}

function RoomInfo(props) {
  const { isConnected, selectedChoice, host, roomId, members, myIndex, rooms, isLoadingRoom } = props;
  if (!isConnected || !selectedChoice) { return ""; }

  function copyToClipboard(e) {
    navigator.clipboard.writeText(roomId).then(() => {
      console.log('copied');
    })
  }

  if (selectedChoice === lobbyStates.CREATE) {
    return (
      <div className="room-info">
        <SpyfallSettings />
        <SubmitSettings />
      </div>
    );
  }
  else if(selectedChoice === lobbyStates.JOIN) {
    return (
      <div className="room-info">
        <div className="input">
          <h4>Enter the room id you would like to join:</h4>
          <MyInput />
        </div>
        <div>
          <div className="refresh-row">
            <h4>Otherwise, click on one of the available rooms to join.</h4>
            <IconButton color="primary" aria-label="refresh" 
              onClick={getAvailableRooms}>
              <RefreshIcon />
            </IconButton>
          </div>
          <Grid container spacing={3} className="rooms-wrapper">
            { renderAvailableRooms(rooms, isLoadingRoom) }
          </Grid>
        </div>
      </div>
    );
  }
  else {
    let hostClass = "";
    if (myIndex===-1){
      hostClass = "my-name";
    }
    return (
      <div className="room-info">
        <div className="room-title">
          <h2>Host: <span className={hostClass}>{host}</span></h2>
          <h2>Room id: <span className="roomId" onClick={copyToClipboard}>{roomId}</span></h2>
        </div>
        {renderMembers(members, myIndex)}
      </div>
    );
  }
}


const SubscribedRoomInfo = connect(mapStateToPropsRI)(RoomInfo);
export default SubscribedRoomInfo;