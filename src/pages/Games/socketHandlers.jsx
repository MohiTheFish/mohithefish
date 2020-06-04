import io from 'socket.io-client';

var socket = null;

export function connectToServer(endpoint, initialData, callbacks) {
  socket = io.connect(endpoint, {
    reconnection: true,
  });

  const {onConnectCallback, onDisconnectCallback} = callbacks;

  socket.on('connect', function() {
    console.log('The client connected');

    socket.emit('initialConnection', initialData);
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