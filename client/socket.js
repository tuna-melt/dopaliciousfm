import io from 'socket.io-client';

const socket = io(window.location.origin);

socket.on('connect', () => {
  console.log('socket is connected');

  socket.on('new-message', data => {});
});

export default socket;
