const httpBuildQuery = require('http-build-query');

export const ELEMENT_ID = 'twitch';
export const STORAGE_KEY = 'twitchId';

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

export function isAuthenticated() {
  return true;
}

export function getStoredChannelId() {
  return localStorage.getItem(STORAGE_KEY);
}

export function shouldBeFetched() {
  return getStoredChannelId() !== null
    && isAuthenticated() === true;
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

export function rerenderItems() {
  const counter = document
    .querySelector(`#${ELEMENT_ID} .online-list__online`);
  const form = document
    .querySelector(`#${ELEMENT_ID} .online-list__channel-id-form`);
  const deleteButton = document
    .querySelector(`#${ELEMENT_ID} .online-list__delete-button`);
  const authButton = document
    .querySelector(`#${ELEMENT_ID} .online-list__auth-button`);

  if (isAuthenticated() === false) {
    counter.setAttribute('hidden', true);
    form.setAttribute('hidden', true);
    deleteButton.setAttribute('hidden', true);
    authButton.removeAttribute('hidden');

    return;
  }

  if (getStoredChannelId() === null) {
    counter.setAttribute('hidden', true);
    form.removeAttribute('hidden');
    deleteButton.setAttribute('hidden', true);
    authButton.setAttribute('hidden', true);

    return;
  }

  counter.removeAttribute('hidden');
  form.setAttribute('hidden', true);
  deleteButton.removeAttribute('hidden');
  authButton.setAttribute('hidden', true);
}

async function handleChannelIdFormSubmitting(event) {
  event.preventDefault();

  this.firstChild.oninput = () => {
    this.firstChild.setCustomValidity('');
  };

  if (await channelExists(this.firstChild.value) === false) {
    this.firstChild
      .setCustomValidity(this.firstChild.dataset.channelNotFoundMessage);

    return;
  }

  localStorage.setItem(STORAGE_KEY, this.firstChild.value);

  rerenderItems();
}

async function removeStoredChannelId() {
  localStorage.removeItem(STORAGE_KEY);

  rerenderItems();
}

export function initialize() {
  const form = document
    .querySelector(`#${ELEMENT_ID} .online-list__channel-id-form`);
  const deleteButton = document
    .querySelector(`#${ELEMENT_ID} .online-list__delete-button`);
  const authButton = document
    .querySelector(`#${ELEMENT_ID} .online-list__auth-button`);

  form.onsubmit = handleChannelIdFormSubmitting;
  deleteButton.onclick = removeStoredChannelId;

  rerenderItems();
}
