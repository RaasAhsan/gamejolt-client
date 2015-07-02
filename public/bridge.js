var ipc = require('ipc');

var GameManager = require('./GameManager');
var ConfigManager = require('./ConfigManager');

var open = require('open');
var rimraf = require('rimraf');
var path = require('path');
var FindFiles = require('node-find-files');

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

var uninstall = function(buildId, callback) {
  var data = ConfigManager.getConfig().installedGames[buildId];
  if(data.location.endsWith(data.name + '/')) {
    rimraf(data.location, function(err){
      if(err) {} else {
        ConfigManager.uninstall(buildId);
        callback();
      }
    });
  }
}

var getInstalledGames = function(){
  return ConfigManager.getConfig().installedGames;
};

var isInternetConnected = function(){
  return navigator.onLine;
};

var getPlatform = function(){
  if (process.platform == 'win32') return "os_windows";
  else if (process.platform == 'darwin') return "os_mac";
  else if (process.platform == 'linux') return "os_linux";
  else return "os_other";
};

var getExecutables = function() {
  if(getPlatform() == "os_windows") return [".exe", ".jar"]
  else if(getPlatform() == "os_mac") return [".app", ".sh", ".jar"]
  else if(getPlatform() == "os_linux") return [".sh", ".jar"]
  else return [".sh", ".jar"]
};

var openGame = function(gameFolder){
  var validExtensions = getExecutables();

  var executables = [];

  var finder = new FindFiles({
    rootFolder: gameFolder,
    filterFunction: function(fpath, stat) {
      return validExtensions.indexOf(path.extname(fpath)) != -1;
    }
  });

  finder.on("match", function(strPath, stat) {
    executables.push(strPath);
  })
  finder.on("complete", function() {
    if(executables.length > 0) {
      open(executables[0], function(){
        console.log("complete!");
      });
    }
  })

  finder.startSearch();
};

var openGameFolder = function(gameFolder){
  open(gameFolder);
}
