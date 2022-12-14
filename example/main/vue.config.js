const path = require('path');

module.exports = {
  devServer: {
    port: 8000,
  },
  chainWebpack: (config) => {
    config.resolve.alias.set(
      '@mini-single-spa/esm',
      path.join(__dirname, '../../lib/bundle.esm.js')
    );
  },
};
