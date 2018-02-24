import * as Counters from './Counters';

export const ELEMENT_ID = 'youtube';
export const STORAGE_KEY = 'youtubeId';

function channelExists(channelId) {
  return true;
}

function isInitialized() {
  return window.gapi.client !== undefined;
}

export function getViewers(videoId) {
  return window.gapi.client.youtube.videos.list({
    id: videoId,
    part: 'statistics',
  }).then(data => data.result.items[0].statistics.viewCount);
}

export function isAuthenticated() {
  return false;
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
  event.stopPropagation();

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

  rerenderItems();
}

async function removeStoredChannelId() {
  const form = document
    .querySelector(`#${ELEMENT_ID} .online-list__channel-id-form`);

  form.reset();

  Counters.refreshCounters();
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

  window.gapi.load('client:auth2', () => {
    window.gapi.client.init({
      apiKey: process.env.YOUTUBE_API_KEY,
      discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest'],
      scopes: 'https://www.googleapis.com/auth/youtube.readonly',
    });
  });

  rerenderItems();
}
