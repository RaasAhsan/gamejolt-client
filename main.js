var app = require('app');
var BrowserWindow = require('browser-window');
var ipc = require('ipc');

var fs = require('fs');
var jsonfile = require('jsonfile');
var Download = require('download');

require('crash-reporter').start();

var mainWindow = null;
var homeDir = process.env.HOME;
var configDir = process.env.HOME + '/.gamejolt/';
var cacheDir = process.env.HOME + '/.gamejolt/cachedir/';

// Create data + config dirs and files for gamejolt
if(!fs.existsSync(configDir)) {
  fs.mkdirSync(configDir);
  var defaultConfig = {
    downloadedGames: []
  };

  jsonfile.writeFileSync(configDir + 'data.json', defaultConfig);
}

app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', function() {
  mainWindow = new BrowserWindow({width: 1360, height: 800});

  mainWindow.loadUrl('file://' + __dirname + '/public/index.html');

  mainWindow.openDevTools();

  mainWindow.on('closed', function() {
    mainWindow = null;
  });

  mainWindow.webContents.on('did-finish-load', function(){

    ipc.on('get-frontend-cookie', function(event, arg){
      mainWindow.webContents.session.cookies.get({name: 'frontend'}, function(error, cookies){
        if(error) throw error;
        if(cookies) {
          event.sender.send('receive-frontend-cookie', cookies[0].value);
        } else {
          event.sender.send('receive-frontend-cookie', null);
        }
      });
    });

  });
});

ipc.on('save-cached-file', function(event, arg){
  new Download({}).get(arg).dest(cacheDir).run(function (err, files) {
    console.log("Cached " + files.length + " files.");
  });
});

ipc.on('get-cached-file-url', function(event, arg){
  event.sender.send('receive-cached-file-url', cacheDir + arg);
});
