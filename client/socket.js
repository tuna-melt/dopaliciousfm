import io from 'socket.io-client';
import store, { addComment, newSong } from './store';

const socket = io(window.location.origin);

socket.on('connect', () => {
  socket.on('new-message', data => {
    store.dispatch(addComment(data));
  });

  socket.on('new-song', data => {
    store.dispatch(newSong(data));
  });
});

export default socket;
