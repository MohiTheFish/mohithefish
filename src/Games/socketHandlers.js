import io from 'socket.io-client';
import store from 'redux-store';

import {
  setIsConnected,
  setUserName,
} from 'redux-store/actions/nameActions';

import {
  setIsLoadingRoom,
  roomCreated,
  visibleRooms,
  roomJoined,
  roomSpectated,
  setMyIndex,
  playerAdded,
  playerLeft,
  roomPrivacyToggled,
  roomSettingsUpdated,
} from 'redux-store/actions/gameSetupActions';

import {
  startSpyfall,
  updateSpyfallTime,
  clearSpyfallBoard,
} from 'redux-store/actions/spyfallActions';

import {
  startMafia,
  clearMafiaBoard,
  beginTrial,
  updateMainMafiaTime,
  secondaryTimeUpdate,
  chatUpdated,
  otherPlayerVotedMafia,
  iVotedMafia,
} from 'redux-store/actions/mafiaActions';

var socket = null;
let userId = null;
let prevGame = "";

const events = {
  spyfall: ['timeUpdate'],
  mafia: ['mainTimeUpdate', 'mafiaChatUpdated', 'otherPlayerVotedMafia', 'iVotedMafia'],
};

function invalidSocket(socket) {
  if (!socket) {throw new Error('Socket invalid!');}
}

function removePrevEventListeners(newSocket) {
  if (!prevGame) return;

  const eventNames = events[prevGame];
  eventNames.forEach(event => {
    newSocket.off(event);
  });
}

function addSpyfallEventListeners(newSocket) {
  if (prevGame !== 'spyfall') {
    removePrevEventListeners(newSocket);
    prevGame = 'spyfall';

    newSocket.on('mainTimeUpdate', function(time) {
      store.dispatch(updateSpyfallTime(time));
    });
  }
}

function addMafiaEventListeners(newSocket) {
  if (prevGame !== 'mafia') {
    removePrevEventListeners(newSocket);
    prevGame = 'mafia';
    
    newSocket.on('mainTimeUpdate', function(time) {
      store.dispatch(updateMainMafiaTime(time));
    });


    newSocket.on('beginTrial', function(name) {
      // console.log(name);
      store.dispatch(beginTrial(name));
    })
    newSocket.on('secondaryTimeUpdate', function(time) {
      store.dispatch(secondaryTimeUpdate(time));
    })
    
    newSocket.on('mafiaChatUpdated', function (data) {
      store.dispatch(chatUpdated(data));
    });

    newSocket.on('otherPlayerVotedMafia', function(data) {
      console.log('other player voted');
      store.dispatch(otherPlayerVotedMafia(data));
    });

    newSocket.on('iVotedMafia', function(data){
      console.log('I voted');
      store.dispatch(iVotedMafia(data));
    });
  }
}

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
    store.dispatch(setUserName(name));
  });

  newSocket.on('createdRoom', function(roomInfo){
    store.dispatch(roomCreated(roomInfo));
  });

  newSocket.on('settingsUpdated', function(settings){
    store.dispatch(roomSettingsUpdated(settings));
  });
  
  newSocket.on('togglePrivate', function(newState){
    store.dispatch(roomPrivacyToggled(newState));
  })

  newSocket.on('availableRooms', function(rooms) {
    store.dispatch(visibleRooms(rooms));
  });

  newSocket.on('needId', function() {
    console.log('you need an id to access this room!'); 
  });

  newSocket.on('youJoined', function(roomInfo){
    store.dispatch(roomJoined(roomInfo))
  });

  newSocket.on('youSpectated', function(roomInfo) {
    store.dispatch(roomSpectated(roomInfo))
  })

  newSocket.on('othersJoined', function(roomInfo){
    store.dispatch(playerAdded(roomInfo));
  })

  newSocket.on('gameStarted', function(gameState){
    const gamename = store.getState().gameCredentials.gamename;
    if (gamename === 'spyfall') {
      addSpyfallEventListeners(newSocket);
      store.dispatch(startSpyfall(gameState));
    }
    else if (gamename === 'mafia') {
      addMafiaEventListeners(newSocket);
      store.dispatch(startMafia(gameState));
    }
  });

  newSocket.on('sentBackToLobby', function(){
    const gamename = store.getState().gameCredentials.gamename;
    if(gamename === 'spyfall') {
      store.dispatch(clearSpyfallBoard());
    }
    else if (gamename === 'mafia') {
      store.dispatch(clearMafiaBoard());
    }
  });

  newSocket.on('myIndex', function(data){
    store.dispatch(setMyIndex(data));
  })

  newSocket.on('roomReady', function() {
    store.dispatch(setIsLoadingRoom(false));
  })
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
  invalidSocket(socket);

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
  invalidSocket(socket);

  const gamename = store.getState().gameCredentials.gamename;
  socket.emit('createRoom', [userId, gamename, getSpecificGameSettings(settings, gamename)]);
}

export function updateRoomSettings(settings) {
  invalidSocket(socket);
  
  socket.emit('updateSettings', [userId, settings]);
}

// export function forceDisconnect() {
//   invalidSocket(socket);

//   socket.emit('forceDisconnect');
// }

export function getAvailableRooms() {
  invalidSocket(socket);

  store.dispatch(setIsLoadingRoom(true));
  socket.emit('getAvailableRooms', store.getState().gameCredentials.gamename);
}

export function ejectFromRoom() {
  invalidSocket(socket);
  
  socket.emit('ejectPlayerFromRoom', userId);
}

export function joinRoom(targetRoom) {
  invalidSocket(socket);
  const data = {
    targetRoom: targetRoom.trim(),
    userId,
  };
  socket.emit('joinRoom', data);
}

export function returnToLobby() {
  invalidSocket(socket);

  socket.emit('returnToLobby', userId);
}

export function startGame() {
  invalidSocket(socket);

  socket.emit('startGame', userId);
}

export function sendMafiaMessage(message, myIndex) {
  invalidSocket(socket);

  socket.emit('sendMafiaMessage', {
    userId,
    message,
    index: myIndex,
  });
}

export function votePlayer(myIndex, targetIndex) {
  invalidSocket(socket);
  
  socket.emit('voteMafiaPlayer', {
    userId,
    myIndex,
    targetIndex,
  });
}

export function voteGuiltyMafia(myIndex, decision) {
  invalidSocket(socket);
  socket.emit('voteMafiaGuilty', {
    userId,
    myIndex,
    decision,
  });
}