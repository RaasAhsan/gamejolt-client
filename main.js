var app = require('app');
var BrowserWindow = require('browser-window');
var ipc = require('ipc');

require('crash-reporter').start();

var mainWindow = null;

console.log(process.env.HOME);

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
