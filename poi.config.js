const Dotenv = require('dotenv-webpack');
const PoiPresetBabelMinify = require('poi-preset-babel-minify');
const pgk = require('./package');

module.exports = {
  entry: pgk.main,
  html: {
    title: pgk.name,
    template: 'src/app.ejs',
    minify: {
      removeAttributeQuotes: true,
      collapseWhitespace: true,
      removeComments: true,
      removeScriptTypeAttributes: true,
    },
  },
  filename: {
    js: '[name]-[hash:8].js',
    css: '[name]-[hash:8].css',
  },
  presets: [
    PoiPresetBabelMinify(),
  ],
  sourceMap: false,
  browsers: pgk.browserslist,
  webpack(config) {
    config.plugins.push(new Dotenv({
      systemvars: true,
    }));

    return config;
  },
};
