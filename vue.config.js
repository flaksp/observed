module.exports = {
  lintOnSave: false,
  chainWebpack(config) {
    config.module.rule('svg').use('svg-fill-loader').loader('svg-fill-loader');
    config.module
      .rule('styl')
      .use('svg-fill-loader')
      .loader('svg-fill-loader/encodeSharp')
      .after('css-loader');
    config.module
      .rule('stylus')
      .use('svg-fill-loader')
      .loader('svg-fill-loader/encodeSharp')
      .after('css-loader');
  },
};
