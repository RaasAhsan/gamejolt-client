
var ipc = require('ipc');
var getFrontendCookie = function(callback){
  ipc.send('get-frontend-cookie');
  ipc.on('receive-frontend-cookie', function(arg){
    callback(arg);
  });
};
