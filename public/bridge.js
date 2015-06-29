var ipc = require('ipc');

var getFrontendCookie = function(callback){
  ipc.send('get-frontend-cookie');
  ipc.on('receive-frontend-cookie', function(arg){
    callback(arg);
  });
};

var saveCachedFile = function(url){
  ipc.send('save-cached-file', url);
};

var getCachedFileUrl = function(name, callback){
  ipc.send('get-cached-file-url', name);
  ipc.on('get-cached-file-url', function(arg){
    callback(arg);
  });
}

var isInternetConnected = function(){
  return navigator.onLine;
}
