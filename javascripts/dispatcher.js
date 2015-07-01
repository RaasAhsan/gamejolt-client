import UserStore from './stores/UserStore';
import DownloadStore from './stores/DownloadStore';

let dispatcher = require('dispatchr').createDispatcher({
  stores: [
    UserStore,
    DownloadStore
  ]
});

let contextOptions = {};
let dispatcherContext = dispatcher.createContext(contextOptions);

module.exports = dispatcherContext;
