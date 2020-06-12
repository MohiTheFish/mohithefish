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
} from 'redux/actions/gameSetupActions';

import {
  startSpyfall,
  updateSpyfallTime,
} from 'redux/actions/spyfallActions';

function addSpyfallEventListeners(newSocket) {
  newSocket.on('timeUpdate', function(time) {
    store.dispatch(updateSpyfallTime(time));
  });
}

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

  if(gamename === 'spyfall') {
    addSpyfallEventListeners(newSocket);
  }


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

  newSocket.on('createdRoom', function(roomInfo){
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
    store.dispatch(visibleRooms({
      rooms
    }));
  });

  newSocket.on('needId', function() {
    console.log('you need an id to access this room!'); 
  });

  newSocket.on('youJoined', function(roomInfo){
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
    store.dispatch(startSpyfall(gameState));
    store.dispatch(startPlaying(gameState));
  });

  newSocket.on('playerLeft', function(index) {
    store.dispatch(playerLeft(index));
  });

  newSocket.on('disconnect', function() {
    socket = null;
    store.dispatch(setIsConnected(false));
  });
}

export function isConnected() {
  return !socket;
}

export function createRoomWithSettings(settings) {
  if (!socket) { throw new Error('Socket invalid!');}

  socket.emit('createRoom', [userId, settings]);
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

export function informOtherRoomMembers() {
  if (!socket) { throw new Error('Socket invalid!');}
  // console.log('other room members');
  socket.emit('nowCreatingRoom', userId);
}

export function joinRoom(targetRoom) {
  if (!socket) { throw new Error('Socket invalid!');}
  const data = {
    targetRoom: targetRoom.trim(),
    userId,
  };
  socket.emit('joinRoom', data);
}

export function startGame() {
  if (!socket) { throw new Error('Socket invalid!');}

  socket.emit('startGame', userId);
}