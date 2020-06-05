/* eslint-disable */
import io from 'socket.io-client';
import store from 'redux/store';

import {
  setIsConnected,
  setIsLoadingRoom,
  setSelectedChoice,
  setNumPlayers,
} from 'redux/actions/gameActions';

var socket = null;

export function connectToServer() {
  console.log('connecting...')
  const {username, gamename, uuid} = store.getState().gameCredentials;
  socket = io.connect(`http://localhost:5000/${gamename}`, {
    reconnection: true,
  });


  socket.on('connect', function() {
    console.log('The client connected');

    socket.emit('initialConnection', {
      username,
      gamename,
      uuid,
    });
    console.log('now connected');
    store.dispatch(setIsConnected(true));
  });

  socket.on('print', function(data) {
    console.log(data);
  });
  
  socket.on('disconnect', function() {
    console.log('The client disconnected');
    socket = null;
  })


  return socket;
}