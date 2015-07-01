let createStore = require('dispatchr/addons/createStore');

let notify = require('../actions/notify');

let DownloadStore = createStore({

  storeName: 'DownloadStore',

  initialize: function() {
    this.builds = [];
  },

  getState: function() {
    return {
      builds: this.builds
    };
  },

  dehydrate: function() {
    return this.getState();
  },

  rehydrate: function(state) {
    this.user = state.user;
  },

  handlers: {
    'download-start': function(payload) {
      this.builds[payload.buildId] = 0;

      this.emitChange();
    },

    'download-progress': function(payload){
      if(payload.progress > this.builds[payload.buildId]) {
        this.builds[payload.buildId] = payload.progress;

        this.emitChange();
      }
    },

    'download-complete': function(payload) {
      delete this.builds[payload.buildId];

      notify(`Game ${payload.type} complete`, `${payload.releaseTitle} has been ${payload.type}ed.`);

      this.emitChange();
    }
  }

});

module.exports = DownloadStore;
