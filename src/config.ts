import { localStorage } from './utils/storage';

let host = window.location.origin;
let staticHost = window.location.origin;

const config = {
  host,
  staticHost
};

if (process.env.VUE_APP_HOST_ENV !== 'production') {
  host = localStorage.getItem('host') || host;
  staticHost = localStorage.getItem('staticHost') || staticHost;
}

if (process.env.NODE_ENV !== 'production') {
  try {
    const localConfig = require('./config.local');
    Object.assign(config, localConfig.default);
  } catch (err) {
    console.error(err);
  }
}

export default config;
