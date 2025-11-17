const path = require('path');

module.exports = {
  webpack: (config) => {
    config.resolve.alias['@auth'] = path.resolve(__dirname, '../../packages/auth');
    return config;
  },
};
