import React from 'react';
import io from 'socket.io-client';
import Loading from 'components/Loading/loading';
import { Link } from 'react-router-dom';

function ConnectedChoices(props) {
  const { selectedChoice, handleSelect } = props;

  let createClassName = "enabled";
  let joinClassName = "enabled";
  if (selectedChoice === "create") {
    joinClassName = "disabled";
  }
  else if (selectedChoice === "join") {
    createClassName = "enabled";
  }
  return (
    <div className="connected-choices">
      <h4 id="create" className={createClassName} onClick={handleSelect}>Create Room</h4>
      <h4 id="join" className={joinClassName} onClick={handleSelect}>Join Room</h4>
    </div>
  )
}

export default class WaitingRoom extends React.Component {
  constructor(props) {
    super(props);
    
    /* Best way to keep track of the name after refreshing??? */
    if(props.location.state) {
      localStorage.setItem('username', props.location.state.username);
      localStorage.setItem('gameName', props.location.state.gameName);
    }
    this.myName = localStorage.getItem('username');
    this.gameName = localStorage.getItem('gameName');

    this.state = {
      isConnected: false,
      numPlayers: 1,
      selectedChoice: "",
    }


    /* Event Handlers */
    this.handleSelect = this.handleSelect.bind(this);
  }

  componentDidMount() {
    document.title = "WaitingRoom";

    const self = this;
    
    var socket = io.connect('http://localhost:5000', {
      reconnection: true,
    });

    socket.on('connect', function() {
      console.log('The client connected');

      socket.emit('initialConnection', {
        game: self.gameName,
        name: self.myName,
      });

      self.setState({
        connected: true,
      })

    });

    socket.on('disconnect', function() {
      console.log('The client disconnected');
      this.setState({
        connected: false,
        numPlayers: 1,
      });
    })
  }

  componentWillUnmount(){}

  handleSelect(e) {
    this.setState({
      selectedChoice: e.target.id,
    });
  }

  render() {
    const { connected, selectedChoice } = this.state;
    return (
      <div className="wrapper waiting-room-wrapper">
        <div className="header-text">
          <h1>Play Spyfall</h1>
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
      </div>
    );
  }
}