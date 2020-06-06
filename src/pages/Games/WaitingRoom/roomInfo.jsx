import React, {useState} from 'react';
import { connect } from 'react-redux';

import Grid from "@material-ui/core/Grid";
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import ArrowForward from '@material-ui/icons/ArrowForward';
import Button from '@material-ui/core/Button';

import Loading from 'components/Loading/loading';



const data = [
  {
    hostname: "wefwef",
    members: [],
    roomname: "867517ab-2bb8-4839-975d-3adfc50daf16",
  },
  {
    hostname: "MohiTheFish",
    members: [],
    roomname: "3c5e15dd-dc71-4199-8ee6-f916f3f51ddd",
  }
]

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
    rooms: gd.rooms,
  };
}

function renderMembers(members, myIndex) {
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
          <h4 
            className={index === myIndex ? "your-name" : ""}
            key={`${m}${index}`}>{m}</h4>
        )
      }
    </div>
  )
}

function renderAvailableRooms(rooms, isLoadingRoom) {
  console.log(rooms);
  console.log(isLoadingRoom);
  if (isLoadingRoom) {
    return <Loading />;
  }
  if (rooms.length === 0) {
    return <h3 className="no-avail-rooms">Sorry. No other rooms were found at this time.</h3>
  }
  return rooms.map(room => {
    return (
      <Grid item key={room.hostname} xs={12} className="room">
        <Button className="data">
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


function TextInput() {
  const [roomId, setRoomId] = useState("");
  const preventDefault = (e) => {
    e.preventDefault();
  }

  function submit() {
    console.log('submit!');
  }
  
  return (
    <FormControl className="form-wrapper" variant="outlined">
      <InputLabel htmlFor="outlined-adornment-roomid">Room ID</InputLabel>
      <OutlinedInput
        id="outlined-adornment-roomid"
        value={roomId}
        onChange={(e) => {setRoomId(e.target.value);}}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              children={<ArrowForward />}
              onClick={submit}
              onMouseDown={preventDefault}
              edge="end"
            />
          </InputAdornment>
        }
        labelWidth={70}
      />
    </FormControl>
  )
}

function RoomInfo(props) {
  console.log(props);
  const { isConnected, selectedChoice, host, roomname, members, myIndex, rooms, isLoadingRoom } = props;
  if (!isConnected || !selectedChoice) { return ""; }

  if (selectedChoice === 'create') {
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
          <div className="input">
            <h4>Enter the room id you would like to join:</h4>
            <TextInput />
          </div>
          <div>
            <h4>Otherwise, click on one of the available rooms to join.</h4>
            <Grid container spacing={3} className="rooms-wrapper">
              { renderAvailableRooms(rooms, isLoadingRoom) }
            </Grid>
          </div>
        </div>
      </div>
    );
  }
}


const SubscribedRoomInfo = connect(mapStateToPropsRI)(RoomInfo);
export default SubscribedRoomInfo;