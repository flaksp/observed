const DISCOVERY_DOCS = [
  'https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest',
];

function isInitialized() {
  return window.gapi.client !== undefined;
}

export function getViewers(videoId) {
  return window.gapi.client.youtube.videos.list({
    id: videoId,
    part: 'statistics',
  }).then(data => data.result.items[0].statistics.viewCount);
}

export function shouldBeFetched() {
  return isInitialized();
}

export function initialize() {
  window.gapi.load('client', () => {
    window.gapi.client.init({
      discoveryDocs: DISCOVERY_DOCS,
      apiKey: process.env.YOUTUBE_API_KEY,
    });
  });
}
