import io from 'socket.io-client';
import store from 'redux-store';

import {
  setIsConnected,
  setUserName,
} from 'redux-store/actions/nameActions';

import {
  setIsLoadingRoom,
  roomCreated,
  roomUpdated,
  visibleRooms,
  roomJoined,
  playerLeft,
  roomPrivacyToggled,
  roomSettingsUpdated,
} from 'redux-store/actions/gameSetupActions';

import {
  startSpyfall,
  updateSpyfallTime,
  clearSpyfallBoard,
} from 'redux-store/actions/spyfallActions';

function addSpyfallEventListeners(newSocket) {
  newSocket.on('timeUpdate', function(time) {
    store.dispatch(updateSpyfallTime(time));
  });
}

var socket = null;
let userId = null;

export function connectToServer() {
  console.log('connecting...');
  const {userId: uid} = store.getState().gameCredentials;
  userId = uid;
  let a = `https://mohithefish.herokuapp.com`;
  if (process.env.NODE_ENV === 'development') {
    a = `http://localhost:5000`;
  }
  const newSocket = io.connect(a, {
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax : 5000,
    reconnectionAttempts: 10,
  });

  newSocket.on('connect', function() {
    console.log('The client connected');
    socket = newSocket;

    store.dispatch(setIsConnected(true));
    socket.emit('initialConnection', userId);
  });

  newSocket.on('nameUpdated', function(name){
    console.log('nameUpdated to: '+ name);
    store.dispatch(setUserName(name));
  });

  newSocket.on('createdRoom', function(roomInfo){
    store.dispatch(roomCreated({
      hostname: roomInfo.hostname,
      roomId: roomInfo.roomId,
      members: roomInfo.members,
      isPrivate: roomInfo.isPrivate,
    }));
  });

  newSocket.on('settingsUpdated', function(settings){
    store.dispatch(roomSettingsUpdated({
      settings,
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
    console.log(roomInfo);
    store.dispatch(roomJoined({
      roomId: roomInfo.roomId, 
      members: roomInfo.members,
      settings: roomInfo.settings
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
  });

  newSocket.on('sentBackToLobby', function(){
    if(store.getState().gameCredentials.gamename === 'spyfall') {
      store.dispatch(clearSpyfallBoard());
    }
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

export function updateMyName(name) {
  if (!socket) { throw new Error('Socket invalid!');}
  console.log('updating my name');
  socket.emit('updateMyName', [userId, name]);
}

function getSpecificGameSettings(settings, gamename) {
  const smallSettings = {
    isPrivate: settings.isPrivate,
  };
  smallSettings[gamename] = settings[gamename];
  return smallSettings;
}

export function createRoomWithSettings(settings) {
  if (!socket) { throw new Error('Socket invalid!');}

  const gamename = store.getState().gameCredentials.gamename;
  socket.emit('createRoom', [userId, gamename, getSpecificGameSettings(settings, gamename)]);
}

export function updateRoomSettings(settings) {
  if (!socket) { throw new Error('Socket invalid!');}
  
  socket.emit('updateSettings', [userId, settings]);
}

export function forceDisconnect() {
  if (!socket) { throw new Error('Socket invalid!');}

  socket.emit('forceDisconnect');
}

export function getAvailableRooms() {
  if (!socket) { throw new Error('Socket invalid!');}

  store.dispatch(setIsLoadingRoom(true));
  socket.emit('getAvailableRooms', store.getState().gameCredentials.gamename);
}

export function ejectFromRoom() {
  if (!socket) { throw new Error('Socket invalid!');}
  
  socket.emit('ejectPlayerFromRoom', userId);
}

export function joinRoom(targetRoom) {
  if (!socket) { throw new Error('Socket invalid!');}
  const data = {
    targetRoom: targetRoom.trim(),
    userId,
  };
  socket.emit('joinRoom', data);
}

export function returnToLobby() {
  if (!socket) { throw new Error('Socket invalid!');}

  socket.emit('returnToLobby', userId);
}

export function startGame() {
  if (!socket) { throw new Error('Socket invalid!');}

  socket.emit('startGame', userId);
}