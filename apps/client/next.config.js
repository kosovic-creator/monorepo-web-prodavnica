
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com'],
  },
};

const path = require('path');

module.exports = {
  ...nextConfig,
  webpack: (config) => {
    config.resolve.alias['@auth'] = path.resolve(__dirname, '../../packages/auth');
    return config;
  },
};
