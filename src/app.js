import './app.css';
import YandexMetrika from './modules/YandexMetrika';
import GoogleAnalytics from './modules/GoogleAnalytics';
import Sentry from './modules/Sentry';
import * as Twitch from './modules/Twitch';
import * as Youtube from './modules/Youtube';
import refreshCounters from './modules/Counters';

function initializeApp() {
  YandexMetrika();
  GoogleAnalytics();
  Sentry();
  Twitch.initialize();
  Youtube.initialize();
}

window.addEventListener('load', () => {
  initializeApp();
  refreshCounters();

  setInterval(() => {
    refreshCounters();
  }, 5000);
});
