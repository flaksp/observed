import * as Twitch from './Twitch';
import * as Youtube from './Youtube';
import {ELEMENT_ID} from "./Youtube";

async function refreshTwitchCounter(viewers) {
  const twitchCounter = document
    .querySelector(`#${Twitch.ELEMENT_ID} .online-list__online`);

  twitchCounter.innerHTML = Number.isInteger(viewers)
    ? viewers
    : '-';
}

async function refreshYoutubeCounter(viewers) {
  const youtubeCounter = document
    .querySelector(`#${Youtube.ELEMENT_ID} .online-list__online`);

  youtubeCounter.innerHTML = Number.isInteger(viewers)
    ? viewers
    : '-';
}

async function refreshSumCounter(
  twitchViewers,
  youtubeViewers,
) {
  const sumCounter = document
    .querySelector('#sum .online-list__online');

  if (twitchViewers === null && youtubeViewers === null) {
    sumCounter.innerHTML = '-';
  } else {
    const normalizedTwitchViewers = Number.isInteger(twitchViewers)
      ? twitchViewers
      : 0;

    const normalizedYoutubeViewers = Number.isInteger(youtubeViewers)
      ? youtubeViewers
      : 0;

    sumCounter.innerHTML =
      normalizedTwitchViewers + normalizedYoutubeViewers;
  }
}

export async function refreshCounters() {
  let twitchViewers = null;
  let youtubeViewers = null;

  if (Twitch.shouldBeFetched() === true) {
    twitchViewers = await Twitch.getViewers(Twitch.getStoredChannelId());

    refreshTwitchCounter(twitchViewers);
  }

  if (Youtube.shouldBeFetched() === true) {
    youtubeViewers = await Youtube.getViewers(Youtube.getStoredChannelId());

    refreshYoutubeCounter(youtubeViewers);
  }

  refreshSumCounter(twitchViewers, youtubeViewers);
}
