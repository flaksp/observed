export const ELEMENT_ID = 'youtube';

const INPUT = document.createElement('input');
INPUT.setAttribute('class', 'online-list__channel-id-field');
INPUT.setAttribute('minlength', '24');
INPUT.setAttribute('maxlength', '24');
INPUT.setAttribute('pattern', '[a-zA-Z0-9_-]{24}');

const FORM = document.createElement('form');
FORM.setAttribute('class', 'online-list__channel-id-form');
FORM.appendChild(INPUT);

function channelExists(channelId) {
  return true;
}

async function handleFormSubmittion(event) {
  event.stopPropagation();

  this.firstChild.oninput = () => {
    this.firstChild.setCustomValidity('');
  };

  if (await channelExists(this.firstChild.value) === false) {
    this.firstChild.setCustomValidity('YouTube account with this ID not found.');

    return;
  }

  localStorage.setItem('youtubeId', this.firstChild.value);
}

FORM.onsubmit = handleFormSubmittion;

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
  return true;
}

export function shouldBeFetched() {
  return getStoredChannelId() !== null
    && isAuthenticated() === true
    && isAuthenticated() === true;
}

export function getStoredChannelId() {
  return localStorage.getItem('youtubeId');
}

export function initialize() {
  const counter = document.getElementById(ELEMENT_ID);

  while (counter.firstChild) {
    counter.removeChild(counter.firstChild);
  }

  counter.appendChild(FORM);

  window.gapi.load('client:auth2', () => {
    window.gapi.client.init({
      apiKey: process.env.YOUTUBE_API_KEY,
      discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest'],
      scopes: 'https://www.googleapis.com/auth/youtube.readonly',
    });
  });
}
