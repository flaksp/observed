import * as Twitch from './StreamingService/Twitch';
import * as Youtube from './StreamingService/Youtube';
import * as Goodgame from './StreamingService/Goodgame';
import * as Charts from './Charts';

async function refreshTwitchCounter(viewers) {
  const twitchCounter = document
    .querySelector(`#${Twitch.ELEMENT_ID} .online-list__online`);

  Charts.updateChart(0, viewers);

  twitchCounter.innerHTML = Number.isInteger(viewers)
    ? viewers
    : '-';
}

async function refreshYoutubeCounter(viewers) {
  const youtubeCounter = document
    .querySelector(`#${Youtube.ELEMENT_ID} .online-list__online`);

  Charts.updateChart(1, viewers);

  youtubeCounter.innerHTML = Number.isInteger(viewers)
    ? viewers
    : '-';
}

async function refreshGoodgameCounter(viewers) {
  const goodgameCounter = document
    .querySelector(`#${Goodgame.ELEMENT_ID} .online-list__online`);

  Charts.updateChart(2, viewers);

  goodgameCounter.innerHTML = Number.isInteger(viewers)
    ? viewers
    : '-';
}

async function refreshSumCounter(
  twitchViewers,
  youtubeViewers,
  goodgameViewers,
) {
  const sumCounter = document
    .querySelector('#sum .online-list__online');

  if (twitchViewers === null
    && youtubeViewers === null
    && goodgameViewers === null) {
    sumCounter.innerHTML = '-';
  } else {
    const normalizedTwitchViewers = Number.isInteger(twitchViewers)
      ? twitchViewers
      : 0;

    const normalizedYoutubeViewers = Number.isInteger(youtubeViewers)
      ? youtubeViewers
      : 0;

    const normalizedGoodgameViewers = Number.isInteger(goodgameViewers)
      ? goodgameViewers
      : 0;

    sumCounter.innerHTML =
      normalizedTwitchViewers +
      normalizedYoutubeViewers +
      normalizedGoodgameViewers;
  }
}

export default async function refreshCounters() {
  let twitchViewers = null;
  let youtubeViewers = null;
  let goodgameViewers = null;

  if (Twitch.shouldBeFetched() === true) {
    twitchViewers = await Twitch.getViewers(Twitch.getStoredChannelId());

    refreshTwitchCounter(twitchViewers);
  }

  if (Youtube.shouldBeFetched() === true) {
    youtubeViewers = await Youtube.getViewers(Youtube.getStoredChannelId());

    refreshYoutubeCounter(youtubeViewers);
  }

  if (Goodgame.shouldBeFetched() === true) {
    goodgameViewers = await Goodgame.getViewers(Goodgame.getStoredChannelId());

    refreshGoodgameCounter(goodgameViewers);
  }

  refreshSumCounter(twitchViewers, youtubeViewers, goodgameViewers);
}
