import React from 'react';
import io from 'socket.io-client';

const locations = [
  'Desert',
  'Swamp',
  'Forest',
  'City',
  'Boat'
];

export default class Spyfall extends React.Component {
  constructor(props) {
    super(props);

    console.log(props);
    if(props.location.state) {
      localStorage.setItem('username', props.location.state.username)
    }

    this.myName = localStorage.getItem('username');
  }


  // componentDidMount() {
  //   const socket = io('http://localhost:5000', {
  //     reconnection: false,
  //   });

  //   socket.on('connect', function(){
  //     console.log('THe client connected');
  //   });

  //   socket.on('my response', function(data){
  //     console.log(data);
  //   });
  // }


  render () {
    return (
      <div className="spyfall-page-wrapper">
        <h1>Play Spyfall</h1>
        <h4>Your name is: {this.myName}</h4>
      </div>
    );
  }
}