let createStore = require('dispatchr/addons/createStore');

let UserStore = createStore({

  storeName: 'UserStore',

  initialize: function() {
    this.user = "guest";
  },

  getState: function() {
    return {
      user: this.user
    };
  },

  dehydrate: function() {
    return this.getState();
  },

  rehydrate: function(state) {
    this.user = state.user;
  },

  handlers: {
    'user-data': function(user){
      this.user = user;

      this.emitChange();
    }
  }

});

module.exports = UserStore;
