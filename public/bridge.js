var ipc = require('ipc');

var GameManager = require('./GameManager');
var ConfigManager = require('./ConfigManager');

var open = require('open');

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
};

var downloadGame = function(data){
  var progress = 0;
  var before = 0;

  window.dispatcher.dispatch('download-start', {buildId: data.buildId});
  GameManager.download(data.downloadUrl, function(chunk, total){
    progress += chunk.length;

    var percentage = progress/total;
    if(percentage - before >= 0.01) {
      before = percentage;

      window.dispatcher.dispatch('download-progress', {buildId: data.buildId, progress: percentage});
    }
  }, function(){
    window.dispatcher.dispatch('download-complete', {buildId: data.buildId, releaseTitle: data.release, type: 'download'});
  });
};

var installGame = function(data){
  var progress = 0;
  var before = 0;

  window.dispatcher.dispatch('download-start', {buildId: data.build.id});
  GameManager.install(data.build, data.downloadUrl, data.release, data.releaseVersion, function(chunk, total){
    progress += chunk.length;

    var percentage = progress/total;
    if(percentage - before >= 0.01) {
      before = percentage;

      window.dispatcher.dispatch('download-progress', {buildId: data.build.id, progress: percentage});
    }
  }, function(){
    window.dispatcher.dispatch('download-complete', {buildId: data.build.id, releaseTitle: data.release, type: 'install'});
  });
};

var getInstalledGames = function(){
  return ConfigManager.getConfig().installedGames;
};

var isInternetConnected = function(){
  return navigator.onLine;
};

var getPlatform = function(){
  if (navigator.appVersion.indexOf("Win")!=-1) return "os_windows";
  else if (navigator.appVersion.indexOf("Mac")!=-1) return "os_mac";
  else if (navigator.appVersion.indexOf("Linux")!=-1) return "os_linux";
  else return "os_other";
};

var openGameFolder = function(gameFolder){
  open(gameFolder);
}
