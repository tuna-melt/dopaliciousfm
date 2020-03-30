import io from 'socket.io-client';
import { addComment } from './store';

const socket = io(window.location.origin);

socket.on('connect', () => {
  console.log('socket is connected');

  socket.on('new-message', data => {
    addComment(data);
  });
});

export default socket;
