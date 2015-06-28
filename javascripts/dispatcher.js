import UserStore from './stores/UserStore';

let dispatcher = require('dispatchr').createDispatcher({
  stores: [
    UserStore
  ]
});

let contextOptions = {};
let dispatcherContext = dispatcher.createContext(contextOptions);

module.exports = dispatcherContext;
