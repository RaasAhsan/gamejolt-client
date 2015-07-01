var Download = require('download');
var jsonfile = require('jsonfile');
var unzip = require('unzip');
var fs = require('fs');

var ConfigManager = require('./ConfigManager');

var homeDir = process.env.HOME;
var configDir = process.env.HOME + '/.gamejolt/';
var downloadDir = process.env.HOME + '/Downloads/';

module.exports = {

  download: function(url, onProgress, onEnd){
    var file = url.split("/").pop();
    file = file.substring(0, file.lastIndexOf('?'));

    new Download().get(url).rename(file).dest(downloadDir).use(function(res, url){
      var totalBytes = parseFloat(res.headers['content-length']);

      res.on('data', function(data){
        onProgress(data, totalBytes);
      });

      res.on('end', function(){
        onEnd();
      });
    }).run(function (err, files) {
      console.log("Downloaded " + url + " to " + file + ".");
    });
  },

  install: function(build, downloadUrl, release, releaseVersion, onProgress, onEnd){
    var file = downloadUrl.split("/").pop();
    file = file.substring(0, file.lastIndexOf('?'));

    var gameDir = configDir + 'games/' + release + '/';

    new Download().get(downloadUrl).rename(file).dest(gameDir).use(function(res, url){
      var totalBytes = parseFloat(res.headers['content-length']);

      res.on('data', function(data){
        onProgress(data, totalBytes);
      });

      res.on('end', function(){
        var installData = {
          location: gameDir,
          executable: build.primary_file.filename,
          version: releaseVersion
        };

        ConfigManager.addInstalledGame(build.id, installData);

        onEnd();
      });
    }).run(function (err, files) {
      console.log("Downloaded " + downloadUrl + " to " + file + ".");

      if(file.endsWith(".zip")) {
        fs.createReadStream(gameDir + file).pipe(unzip.Extract({ path: gameDir }));
      }
    });
  }

}
