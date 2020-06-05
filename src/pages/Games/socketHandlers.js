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
let uuid = null;

export function connectToServer() {
  console.log('connecting...')
  const {username, gamename, uuid: userId} = store.getState().gameCredentials;
  uuid = userId;
  
  const newSocket = io.connect(`http://localhost:5000/${gamename}`, {
    reconnection: true,
  });


  newSocket.on('connect', function() {
    console.log('The client connected');
    socket = newSocket;

    newSocket.emit('initialConnection', {
      username,
      gamename,
      uuid,
    });
    console.log('now connected');
    store.dispatch(setIsConnected(true));
  });

  newSocket.on('print', function(data) {
    console.log(data);
  });
  
  newSocket.on('disconnect', function() {
    console.log('The client disconnected');
    socket = null;
  });
}

export function createRoom() {
  if (!socket) { throw new Error('Socket invalid!');}

  socket.emit('createRoom', uuid);
}

export function forceDisconnect() {
  if (!socket) { throw new Error('Socket invalid!');}

  socket.emit('forceDisconnect');
}