import Highcharts from 'highcharts/highstock';
import * as Twitch from './Twitch';
import * as Youtube from './Youtube';

export function initialize() {
  window.chart = Highcharts.stockChart('chart', {
    credits: {
      enabled: false,
    },

    scrollbar: {
      enabled: false,
    },

    legend: {
      enabled: true,
    },

    colors: [Twitch.BRAND_COLOR, Youtube.BRAND_COLOR],

    rangeSelector: {
      inputEnabled: false,
      selected: 5,
      buttons: [
        {
          type: 'minute',
          count: 15,
          text: '15 M',
        },
        {
          type: 'minute',
          count: 30,
          text: '30 M',
        },
        {
          type: 'hour',
          count: 1,
          text: '1 H',
        },
        {
          type: 'hour',
          count: 3,
          text: '3 H',
        },
        {
          type: 'day',
          count: 1,
          text: '1 D',
        },
        {
          type: 'all',
          text: 'All',
        },
      ],
    },

    time: {
      timezoneOffset: new Date().getTimezoneOffset(),
    },

    xAxis: {
      crosshair: {
        zIndex: 10,
      },
    },

    yAxis: {
      title: {
        text: 'Viewers',
      },
      showFirstLabel: false,
    },

    plotOptions: {
      series: {
        showInNavigator: true,
      },
    },

    series: [
      {
        type: 'line',
        name: Twitch.SERVICE_NAME,
        data: [],
      },
      {
        type: 'line',
        name: Youtube.SERVICE_NAME,
        data: [],
      },
    ],
  });
}

export function updateChart(index, viewers) {
  const values = window.chart.series[index].options.data.map(point => point[1]);

  window.chart.series[index].addPoint([
    (new Date()).setMilliseconds(0),
    viewers,
  ]);

  window.chart.yAxis[0].removePlotLine(`plotline_${index}`);
  window.chart.yAxis[0].addPlotLine({
    color: window.chart.series[index].color,
    dashStyle: 'shortdash',
    width: 2,
    id: `plotline_${index}`,
    value: Math.max(viewers, ...values),
    label: {
      text: `${window.chart.series[index].name} maximum`,
    },
  });
}
