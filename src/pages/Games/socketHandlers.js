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
  startPlaying,
  roomPrivacyToggled,
} from 'redux/actions/gameActions';

import {
  startSpyfall,
} from 'redux/actions/spyfallActions';

var socket = null;
let userId = null;

export function connectToServer() {
  console.log('connecting...');
  const {username, gamename, userId: uid} = store.getState().gameCredentials;
  userId = uid;
  
  let a = `http://localhost:5000/${gamename}`;
  const newSocket = io.connect(a, {
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
    store.dispatch(setIsConnected(true));
  });

  // newSocket.on('print', function(data) {
  //   console.log(data);
  // });
  
  newSocket.on('createdRoom', function(roomInfo){
    console.log(roomInfo);
    store.dispatch(roomCreated({
      hostname: roomInfo.hostname,
      roomId: roomInfo.roomId,
      members: roomInfo.members,
      isPrivate: roomInfo.isPrivate,
    }));
  });
  
  newSocket.on('togglePrivate', function(newState){
    store.dispatch(roomPrivacyToggled(newState));
  })

  newSocket.on('availableRooms', function(rooms) {
    // console.log('these are available rooms');
    // console.log(rooms);
    store.dispatch(visibleRooms({
      rooms
    }));
  });

  newSocket.on('needId', function() {
    console.log('you need an id to access this room!'); 
  })
  newSocket.on('youJoined', function(roomInfo){
    // console.log(roomInfo);
    store.dispatch(roomJoined({
      hostname: roomInfo.hostname,
      roomId: roomInfo.roomId, 
      members: roomInfo.members,
    }))
  });

  newSocket.on('othersJoined', function(roomInfo){
    store.dispatch(roomUpdated({
      hostname: roomInfo.hostname,
      roomId: roomInfo.roomId, 
      members: roomInfo.members,
    }));
  })

  newSocket.on('gameStarted', function(gameState){
    // console.log(gameState);
    store.dispatch(startSpyfall(gameState));
    // store.dispatch(startPlaying(gameState));
  });

  newSocket.on('playerLeft', function(index) {
    // console.log('PLAYER LEFT WUT');
    store.dispatch(playerLeft(index));
  });

  newSocket.on('disconnect', function() {
    // console.log('The client disconnected');
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
  // console.log('joining Room');
  socket.emit('joinRoom', data);
}

export function startGame() {
  if (!socket) { throw new Error('Socket invalid!');}

  socket.emit('startGame', userId);
}