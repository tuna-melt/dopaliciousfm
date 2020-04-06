window.onSpotifyWebPlaybackSDKReady = () => {
  window.Spotify = Spotify;

  const bundle = document.createElement('script');
  bundle.type = 'text/javascript';
  bundle.src = '/bundle.js';

  document.querySelector('head').append(bundle);
};
