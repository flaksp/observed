import './app.css';
import YandexMetrika from './modules/YandexMetrika';
import GoogleAnalytics from './modules/GoogleAnalytics';
// import Sentry from './modules/Sentry';
import * as Twitch from './modules/Twitch';
import * as YouTube from './modules/YouTube';

window.addEventListener('load', () => {
  YandexMetrika();
  GoogleAnalytics();
  // Sentry();
  YouTube.initialize();

  if (Twitch.shouldBeFetched() === true) {
    Twitch.getViewers('domingo').then((viewers) => {
      document.getElementById('twitch').innerHTML = `Twitch: ${viewers}`;
    });
  }

  if (YouTube.shouldBeFetched() === true) {
    YouTube.getViewers('mwqyTrSrSr8').then((viewers) => {
      document.getElementById('youtube').innerHTML = `YouTube: ${viewers}`;
    });
  }

  setInterval(() => {
    if (Twitch.shouldBeFetched() === true) {
      Twitch.getViewers('domingo').then((viewers) => {
        document.getElementById('twitch').innerHTML = `Twitch: ${viewers}`;
      });
    }

    if (YouTube.shouldBeFetched() === true) {
      YouTube.getViewers('mwqyTrSrSr8').then((viewers) => {
        document.getElementById('youtube').innerHTML = `YouTube: ${viewers}`;
      });
    }
  }, 10000);
});
