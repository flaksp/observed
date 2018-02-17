const httpBuildQuery = require('http-build-query');

export const ELEMENT_ID = 'twitch';

const INPUT = document.createElement('input');
INPUT.setAttribute('class', 'online-list__channel-id-field');
INPUT.setAttribute('minlength', '3');
INPUT.setAttribute('maxlength', '25');
INPUT.setAttribute('pattern', '[a-zA-Z0-9][a-zA-Z0-9_]{2,24}');

const FORM = document.createElement('form');
FORM.setAttribute('class', 'online-list__channel-id-form');
FORM.appendChild(INPUT)

function channelExists(username) {
  const parameters = httpBuildQuery({
    login: username,
  });

  const streamsRequest = new Request(`https://api.twitch.tv/helix/users?${parameters}`, {
    method: 'GET',
    headers: new Headers({
      'Client-ID': process.env.TWITCH_CLIENT_ID,
    }),
  });

  return fetch(streamsRequest)
    .then(response => response.json())
    .then(data => data.data[0] !== undefined);
}

async function handleFormSubmittion(event) {
  event.preventDefault();

  this.firstChild.oninput = () => {
    this.firstChild.setCustomValidity('');
  };

  if (await channelExists(this.firstChild.value) === false) {
    this.firstChild.setCustomValidity('Twitch account with this username not found.');

    return;
  }

  localStorage.setItem('twitchId', this.firstChild.value);
}

FORM.onsubmit = handleFormSubmittion;

export function isAuthenticated() {
  return true;
}

export function shouldBeFetched() {
  return getStoredChannelId() !== null
    && isAuthenticated() === true;
}

export function getStoredChannelId() {
  return localStorage.getItem('twitchId');
}

export function getViewers(username) {
  const parameters = httpBuildQuery({
    user_login: username,
  });

  const streamsRequest = new Request(`https://api.twitch.tv/helix/streams?${parameters}`, {
    method: 'GET',
    headers: new Headers({
      'Client-ID': process.env.TWITCH_CLIENT_ID,
    }),
  });

  return fetch(streamsRequest)
    .then(response => response.json())
    .then((data) => {
      if (data.data[0] !== undefined) {
        return data.data[0].viewer_count;
      }

      return null;
    });
}

export function initialize() {
  const counter = document.getElementById(ELEMENT_ID);

  counter.appendChild(FORM);
}
