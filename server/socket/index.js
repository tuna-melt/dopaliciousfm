require('../../secrets');
const QueryString = require('query-string');
const btoa = require('btoa');
const axios = require('axios');

module.exports = io => {
  let currentSong = {};
  let position_ms = 0;

  const data = QueryString.stringify({
    grant_type: 'client_credentials',
  });

  const options = {
    method: 'post',
    url: 'https://accounts.spotify.com/api/token',
    data,
    headers: {
      Authorization: `Basic ${btoa(
        process.env.SPOTIFYCLIENTID + ':' + process.env.SPOTIFYCLIENTSECRET
      )}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };

  axios(options)
    .then(res => {
      const { access_token } = res.data;
      const getTracks = {
        method: 'get',
        url:
          'https://api.spotify.com/v1/playlists/6n13xnZ4wf4vuOyklYrUfi/tracks',
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      };

      axios(getTracks).then(resp => {
        const tracks = resp.data.items.map(item => item.track);
        const playSongs = index => {
          if (index < tracks.length) {
            console.log(`
            
            Playing '${tracks[index].name}'
            
            `);
            io.emit('new-song', tracks[index]);

            currentSong = tracks[index];
            setInterval(() => {
              position_ms += 1000;
            }, 1000);

            setTimeout(() => {
              playSongs(index + 1);
            }, tracks[index].duration_ms);
          }
        };
        playSongs(1);
      });
    })
    .catch(err => {
      console.log(err);
    });

  io.on('connection', socket => {
    socket.on('new-message', message => {
      socket.broadcast.emit('new-message', message);
    });

    socket.on('get-current-song', () => {
      socket.emit('send-current-song', { currentSong, position_ms });
    });
  });
};
