import { playSong } from '../spotifyActions';
import socket from '../socket';

const SET_SONG = 'SET_SONG';
export const setSong = (song, position_ms) => {
  return { type: SET_SONG, song, position_ms };
};

const NEW_SONG = 'NEW_SONG';
export const newSong = song => {
  return { type: NEW_SONG, song };
};

const SET_DEVICE_ID = 'SET_DEVICE_ID';
export const setPlayer = deviceId => {
  return { type: SET_DEVICE_ID, deviceId };
};

const defaultPlayer = { currentSong: {}, deviceId: null, startPosition: 0 };

export default (player = defaultPlayer, action, state) => {
  switch (action.type) {
    case SET_DEVICE_ID:
      socket.emit('get-current-song');
      return { ...player, deviceId: action.deviceId };

    case NEW_SONG:
      playSong(player, state.user, action.song);

      return { ...player, currentSong: action.song, startPosition: 0 };
    case SET_SONG:
      playSong(player, state.user, action.song, action.position_ms);
      return {
        ...player,
        currentSong: action.song,
        startPosition: action.position_ms,
      };

    default:
      return player;
  }
};
