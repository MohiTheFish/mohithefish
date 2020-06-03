import React from 'react';
import io from 'socket.io-client';
import { Link } from 'react-router-dom';

export default class WaitingRoom extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className="waiting-room-wrapper">
        <div className="names">
          <h3>Bob</h3>
          <h3>Bob</h3>
          <h3>Bob</h3>
          <h3>Bob</h3>
          <h3>Bob</h3>
          <h3>Bob</h3>
          <h3>Bob</h3>

          <Link to="/games/spyfall/play">Begin playing.</Link>
        </div>
      </div>
    )
  }
}