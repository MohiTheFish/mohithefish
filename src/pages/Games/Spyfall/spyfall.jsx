import React from 'react';
import io from 'socket.io-client';

export default class Spyfall extends React.Component {
  constructor(props) {
    super(props);

    console.log(props);
  }

  componentDidMount() {

    
    const socket = io('http://localhost:5000');
    socket.on('connect', function(){
      console.log('THe client connected');
    });

    socket.on('my response', function(data){
      console.log(data);
    });
  }


  render () {
    return (
      <div>
        Play Spyfall here
      </div>
    )
  }
}