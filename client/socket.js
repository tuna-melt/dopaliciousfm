import io from 'socket.io-client';
import store, { addComment, newSong, setSong, me } from './store';

const socket = io(window.location.origin);

socket.on('connect', () => {
  socket.on('new-message', data => {
    store.dispatch(addComment(data));
  });

  socket.on('new-song', data => {
    store.dispatch(newSong(data));
  });

  socket.on('send-current-song', data => {
    store.dispatch(setSong(data.currentSong, data.position_ms));
  });
});

export default socket;
