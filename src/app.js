import './app.css';
import YandexMetrika from './modules/YandexMetrika';
import GoogleAnalytics from './modules/GoogleAnalytics';
// import Sentry from './modules/Sentry';
import * as Twitch from './modules/Twitch';
import * as Youtube from './modules/Youtube';
import * as Counters from './modules/Counters';

function initializeApp() {
  YandexMetrika();
  GoogleAnalytics();
  // Sentry();
  Twitch.initialize();
  Youtube.initialize();
}

window.addEventListener('load', () => {
  initializeApp();

  Counters.refreshCounters();

  setInterval(() => {
    Counters.refreshCounters();
  }, 10000);
});
