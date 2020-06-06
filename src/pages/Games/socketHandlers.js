/* eslint-disable */
import io from 'socket.io-client';
import store from 'redux/store';

import {
  setIsConnected,
  setIsLoadingRoom,
  setSelectedChoice,
  setNumPlayers,
  roomCreated,
  roomUpdated,
  visibleRooms,
} from 'redux/actions/gameActions';

var socket = null;
let uuid = null;

export function connectToServer() {
  console.log('connecting...');
  const {username, gamename, uuid: userId} = store.getState().gameCredentials;
  uuid = userId;
  
  const newSocket = io.connect(`http://localhost:5000/${gamename}`, {
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax : 5000,
    reconnectionAttempts: 10,
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
  
  newSocket.on('createdRoom', function(roomInfo){
    console.log(roomInfo);
    store.dispatch(roomCreated({
      hostname: roomInfo.hostname,
      roomname: roomInfo.roomname,
      members: roomInfo.members,
    }));
  });

  newSocket.on('availableRooms', function(rooms) {
    store.dispatch(visibleRooms({
      rooms
    }));
  })

  newSocket.on('othersJoined', function(roomInfo){
    console.log(roomInfo);
    store.dispatch(roomUpdated({
      hostname: roomInfo.hostname,
      roomname: roomInfo.roomname, 
      members: roomInfo.members,
    }));
  })

  newSocket.on('disconnect', function() {
    console.log('The client disconnected');
    socket = null;
    store.dispatch(setIsConnected(false));
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

export function getAvailableRooms() {
  if (!socket) { throw new Error('Socket invalid!');}

  store.dispatch(setIsLoadingRoom(true));
  socket.emit('getAvailableRooms');
}