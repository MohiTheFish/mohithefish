import io from 'socket.io-client';
import store from 'redux/store';

import {
  setIsConnected,
  setIsLoadingRoom,
  roomCreated,
  roomUpdated,
  visibleRooms,
  roomJoined,
  playerLeft,
} from 'redux/actions/gameActions';

import {
  startSpyfall
} from 'redux/actions/spyfallActions';

var socket = null;
let userId = null;

export function connectToServer() {
  console.log('connecting...');
  const {username, gamename, userId: uid} = store.getState().gameCredentials;
  userId = uid;
  
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
      userId,
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
    console.log('these are available rooms');
    console.log(rooms);
    store.dispatch(visibleRooms({
      rooms
    }));
  });

  newSocket.on('youJoined', function(roomInfo){
    console.log(roomInfo);
    store.dispatch(roomJoined({
      hostname: roomInfo.hostname,
      roomname: roomInfo.roomname, 
      members: roomInfo.members,
    }))
  }) 

  newSocket.on('othersJoined', function(roomInfo){
    store.dispatch(roomUpdated({
      hostname: roomInfo.hostname,
      roomname: roomInfo.roomname, 
      members: roomInfo.members,
    }));
  })

  newSocket.on('gameStarted', function(gameState){
    console.log(gameState);
    const { gamename } = store.getState().gameCredentials;
    switch (gamename) {
      case 'spyfall': {
        store.dispatch(startSpyfall(gameState));
        break;
      }
      default: {
        store.dispatch(startGame(gameState));
      }
    }
  });

  newSocket.on('playerLeft', function(index) {
    console.log('PLAYER LEFT WUT');
    store.dispatch(playerLeft(index));
  });

  newSocket.on('disconnect', function() {
    console.log('The client disconnected');
    socket = null;
    store.dispatch(setIsConnected(false));
  });
}

export function createRoom() {
  if (!socket) { throw new Error('Socket invalid!');}

  socket.emit('createRoom', userId);
}

export function forceDisconnect() {
  if (!socket) { throw new Error('Socket invalid!');}

  socket.emit('forceDisconnect');
}

export function getAvailableRooms() {
  if (!socket) { throw new Error('Socket invalid!');}

  store.dispatch(setIsLoadingRoom(true));
  socket.emit('getAvailableRooms', userId);
}

export function joinRoom(targetRoom) {
  if (!socket) { throw new Error('Socket invalid!');}
  const data = {
    targetRoom: targetRoom.trim(),
    userId,
  };
  console.log('joining Room');
  socket.emit('joinRoom', data);
}

export function startGame() {
  if (!socket) { throw new Error('Socket invalid!');}

  socket.emit('startGame', userId);
}