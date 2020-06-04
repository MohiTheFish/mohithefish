import React from 'react';
import io from 'socket.io-client';
import Loading from 'components/Loading/loading';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

import { connectToServer } from './socketHandlers';

import './waitingRoom.scss';

function ConnectedChoices(props) {
  const { selectedChoice, handleSelect } = props;

  const createButtonProps = {
    variant: "contained",
    className: "button",
  };
  const joinButtonProps = {
    variant: "contained",
    className: "button",
  };


  let createClassName = "button";
  let joinClassName = "button";
  if (selectedChoice === "create") {
    joinButtonProps.className += " disabled";
    joinButtonProps.variant = "outlined"
  }
  else if (selectedChoice === "join") {
    createButtonProps.className += " disabled";
    createButtonProps.variant = "outlined"
  }
  return (
    <div className="connected-choices">
      <Button 
        disableFocusRipple={true}
        className={createClassName} 
        {...createButtonProps}
        onClick={() => handleSelect('create')}>Create Room</Button>
      <Button 
        disableFocusRipple={true}
        className={joinClassName} 
        {...joinButtonProps}
        onClick={() => handleSelect('join')}>Join Room</Button>
    </div>
  );
}

function RoomInfo(props) {
  const { connected, selectedChoice, name, host } = props;
  if (!connected || !selectedChoice) { return ""; }

  if (selectedChoice === "create") {
    return (
      <div className="room-info">
        <div className="room-title">
          <h3>Host: {name}</h3>
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


export default class WaitingRoom extends React.Component {
  constructor(props) {
    super(props);
    
    /* Best way to keep track of the name after refreshing??? */
    if(props.location.state) {
      localStorage.setItem('username', props.location.state.username);
    }
    this.myName = localStorage.getItem('username');

    this.state = {
      isConnected: false,
      numPlayers: 1,
      selectedChoice: "",
      isLoadingRoom: false,
    }

    /* Event Handlers */
    this.handleSelect = this.handleSelect.bind(this);
  }

  componentDidMount() {
    document.title = "WaitingRoom";
    
    const { match: {params}} = this.props;
    const self = this;
    
    var socket = io.connect(`http://localhost:5000/${params.name}`, {
      reconnection: true,
    });

    socket.on('connect', function() {
      self.socket = socket;
      console.log('The client connected');

      socket.emit('initialConnection', {
        game: params.name,
        name: self.myName,
      });

      self.setState({
        connected: true,
      })
    });

    

    socket.on('print', function(data) {
      console.log(data);
    });
    
    socket.on('disconnect', function() {
      console.log('The client disconnected');
      self.socket = null;
      self.setState({
        connected: false,
        numPlayers: 1,
        selectedChoice: "",
      });
    })
  }


  handleSelect(e) {
    this.socket.emit('hello world', 'garbage');
    this.setState({
      selectedChoice: e,
      isLoadingRoom: true,
    });
  }

  render() {
    const { connected, selectedChoice, isLoadingRoom } = this.state;
    const { match: {params}} = this.props;
    return (
      <div className="wrapper waiting-room-wrapper">
        <div className="header-text">
          <h1>Play {params.name}</h1>
          <h4>Your name is: {this.myName}</h4>
        </div>
        {
          !connected
          ? <Loading />
          : <ConnectedChoices 
              selectedChoice={selectedChoice}
              handleSelect={this.handleSelect}
            />
        }

        <RoomInfo
          name={this.myName}
          host={"a host"}
          selectedChoice={selectedChoice}
          connected={connected}
          isLoadingRoom={isLoadingRoom}
        />
      </div>
    );
  }
}