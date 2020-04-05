import io from 'socket.io-client';
import store, { addComment } from './store';

const socket = io(window.location.origin);

socket.on('connect', () => {
  socket.on('new-message', data => {
    store.dispatch(addComment(data));
  });
});

export default socket;
