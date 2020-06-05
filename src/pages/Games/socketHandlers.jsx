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

export function connectToServer(endpoint, initialData) {
  socket = io.connect(endpoint, {
    reconnection: true,
  });

  socket.on('connect', function() {
    console.log('The client connected');

    socket.emit('initialConnection', initialData);
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