import Player from '@vimeo/player';
const throttle = require('lodash.throttle');

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);

const STORAGE_KEY = 'videoplayer-current-time';

function onSaveTimeupdate({ seconds } = 0) {
  localStorage.setItem(STORAGE_KEY, seconds);
}

function getVideoplayerCurrentTimeLS() {
  return localStorage.getItem(STORAGE_KEY);
}

player
  .setCurrentTime(getVideoplayerCurrentTimeLS())
  .then(function (seconds) {
    // seconds = the actual time that the player seeked to
  })
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        // the time was less than 0 or greater than the video’s duration
        break;

      default:
        // some other error occurred
        break;
    }
  });

player.on('timeupdate', throttle(onSaveTimeupdate, 1000));
