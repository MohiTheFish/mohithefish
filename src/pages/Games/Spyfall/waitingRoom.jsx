import React from 'react';
import io from 'socket.io-client';
import { Link } from 'react-router-dom';

export default class WaitingRoom extends React.Component {
  constructor(props) {
    super(props);
    
    /* Best way to keep track of the name after refreshing??? */
    if(props.location.state) {
      localStorage.setItem('username', props.location.state.username)
    }
    this.myName = localStorage.getItem('username');
  }

  componentDidMount() {
    document.title = "Spyfall";
  }

  render() {
    return (
      <div className="wrapper waiting-room-wrapper">
        <div className="header-text">
          <h1>Play Spyfall</h1>
          <h4>Your name is: {this.myName}</h4>
        </div>
        <Link to="/games/spyfall/play">Begin playing.</Link>
      </div>
    );
  }
}