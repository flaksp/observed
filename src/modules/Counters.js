import * as Twitch from './Twitch';
import * as Youtube from './Youtube';

async function refreshTwitchCounter(viewers) {
  document.getElementById(Twitch.ELEMENT_ID).innerHTML = Number.isInteger(viewers)
    ? viewers
    : '**dash from counters**';
}

async function refreshYoutubeCounter(viewers) {
  document.getElementById(Youtube.ELEMENT_ID).innerHTML = Number.isInteger(viewers)
    ? viewers
    : '**dash from counters**';
}

async function refreshSumCounter(
  twitchViewers,
  youtubeViewers,
) {
  if (twitchViewers === null && youtubeViewers === null) {
    document.getElementById('sum').innerHTML = '**dash from counters**';
  } else {
    const normalizedTwitchViewers = Number.isInteger(twitchViewers)
      ? twitchViewers
      : 0;

    const normalizedYoutubeViewers = Number.isInteger(youtubeViewers)
      ? youtubeViewers
      : 0;

    document.getElementById('sum').innerHTML =
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
