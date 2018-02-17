const httpBuildQuery = require('http-build-query');

const STREAMS_ENDPOINT = 'https://api.twitch.tv/helix/streams';

export function shouldBeFetched() {
  return true;
}

export function getViewers(username) {
  const parameters = httpBuildQuery({
    user_login: username,
  });

  const streamsRequest = new Request(`${STREAMS_ENDPOINT}?${parameters}`, {
    method: 'GET',
    headers: new Headers({
      'Client-ID': process.env.TWITCH_CLIENT_ID,
    }),
  });

  return fetch(streamsRequest)
    .then(response => response.json())
    .then(data => data.data[0].viewer_count);
}
