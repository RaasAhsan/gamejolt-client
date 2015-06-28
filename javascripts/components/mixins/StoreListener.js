
let StoreListener = {

  getStore: function() {
    return this.constructor.stores;
  },

  componentDidMount: function(){
    var stores = this.getStore();
    if(stores)
      stores.forEach(s => window.dispatcher.getStore(s).addChangeListener(this.onChange));
    else
      console.err(new Error("`storeListeners` not defined.").stack);
  },

  componentWillUnmount: function(){
    var stores = this.getStore();
    if(stores)
      stores.forEach(s => window.dispatcher.getStore(s).removeChangeListener(this.onChange));
    else
      console.err(new Error("`storeListeners` not defined.").stack);
  }

};

module.exports = StoreListener;
