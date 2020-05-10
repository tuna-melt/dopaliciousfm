import axios from 'axios';
import store from './store';

export const transferPlayer = async (deviceId, user) => {
  await axios.put(
    'https://api.spotify.com/v1/me/player',
    {
      device_ids: [deviceId],
      play: true,
    },
    {
      headers: {
        Authorization: 'Bearer ' + user.accessToken,
      },
    }
  );
};

export const playSong = async (player, user, song, position_ms = 0) => {
  const { deviceId } = player;

  const options = {
    url: 'https://api.spotify.com/v1/me/player/play?device_id=' + deviceId,
    method: 'put',
    data: {
      uris: [song.uri],
      position_ms,
    },

    headers: {
      Authorization: 'Bearer ' + user.accessToken,
    },
  };

  await axios(options).catch(err => console.log(err));
};

export const addToQueue = async (user, uri) => {
  const options = {
    method: 'post',
    url: 'https://api.spotify.com/v1/me/player/queue?uri=' + uri,
    headers: {
      Authorization: 'Bearer ' + user.accessToken,
    },
  };

  await axios(options);
};

export const moveNext = async user => {
  const options = {
    method: 'post',
    url: 'https://api.spotify.com/v1/me/player/next',
    headers: {
      Authorization: 'Bearer ' + user.accessToken,
    },
  };

  await axios(options);
};
