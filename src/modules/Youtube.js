import refreshCounters from './Counters';

const jsonp = require('jsonp-promise');

export const ELEMENT_ID = 'youtube';
export const STORAGE_KEY = 'youtubeId';

function isInitialized() {
  return true;
}

export function getViewers(videoId) {
  return jsonp(`https://www.youtube.com/live_stats?v=${videoId}`, {
    param: 'callback',
  }).promise.then(data => data.count);
}

function channelExists(videoId) {
  return getViewers(videoId)
    .then(data => data.count !== 0)
    .catch(() => false);
}

export function isAuthenticated() {
  return true; // no need for authentication
}

export function getStoredChannelId() {
  return localStorage.getItem(STORAGE_KEY);
}

export function shouldBeFetched() {
  return getStoredChannelId() !== null
    && isInitialized() === true
    && isAuthenticated() === true;
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
  const loading = document
    .querySelector(`#${ELEMENT_ID} .online-list__loading`);

  loading.setAttribute('hidden', true);

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

    this.reportValidity();

    return;
  }

  localStorage.setItem(STORAGE_KEY, this.firstChild.value);

  refreshCounters();
  rerenderItems();
}

async function removeStoredChannelId() {
  const form = document
    .querySelector(`#${ELEMENT_ID} .online-list__channel-id-form`);

  form.reset();

  localStorage.removeItem(STORAGE_KEY);

  refreshCounters();
  rerenderItems();
}

export async function initialize() {
  const form = document
    .querySelector(`#${ELEMENT_ID} .online-list__channel-id-form`);
  const deleteButton = document
    .querySelector(`#${ELEMENT_ID} .online-list__delete-button`);

  form.onsubmit = handleChannelIdFormSubmitting;
  deleteButton.onclick = removeStoredChannelId;

  rerenderItems();
}
