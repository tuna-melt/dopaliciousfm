import { playSong } from '../spotifyActions';

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

const TOGGLE_CONNECTION = 'TOGGLE_CONNECTION';
export const toggleConnection = () => {
  return { type: TOGGLE_CONNECTION };
};

const SET_VOLUME = 'SET_VOLUME';
export const setVolume = volume => {
  return { type: SET_VOLUME, volume };
};

const defaultPlayer = {
  currentSong: {},
  deviceId: null,
  startPosition: 0,
  volume: 0.5,
  connected: false,
};

export default (player = defaultPlayer, action, state) => {
  switch (action.type) {
    case SET_DEVICE_ID:
      return { ...player, deviceId: action.deviceId, connected: true };

    case NEW_SONG:
      if (player.connected) playSong(player, state.user, action.song);

      return { ...player, currentSong: action.song, startPosition: 0 };
    case SET_SONG:
      if (player.connected) {
        playSong(player, state.user, action.song, action.position_ms);
      }

      return {
        ...player,
        currentSong: action.song,
        startPosition: action.position_ms,
      };

    case TOGGLE_CONNECTION:
      return { ...player, connected: !player.connected };

    case SET_VOLUME:
      return { ...player, volume: action.volume };
    default:
      return player;
  }
};
