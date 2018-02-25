import './app.css';
import YandexMetrika from './modules/YandexMetrika';
import GoogleAnalytics from './modules/GoogleAnalytics';
import Sentry from './modules/Sentry';
import * as Twitch from './modules/StreamingService/Twitch';
import * as Youtube from './modules/StreamingService/Youtube';
import * as Goodgame from './modules/StreamingService/Goodgame';
import * as Charts from './modules/Charts';
import refreshCounters from './modules/Counters';

function initializeApp() {
  if (process.env.NODE_ENV === 'production') {
    YandexMetrika();
    GoogleAnalytics();
    Sentry();
  }

  Twitch.initialize();
  Youtube.initialize();
  Goodgame.initialize();
  Charts.initialize();
}

window.addEventListener('load', () => {
  initializeApp();
  refreshCounters();

  setInterval(() => {
    refreshCounters();
  }, 10000);
});
