var electron = require('electron');
var app = electron.app;
var BrowserWindow = electron.BrowserWindow;

app.on('ready', function() {
    mainWindow = new BrowserWindow({
        width: 200,
        height: 260
    });

    mainWindow.loadURL('file://' + __dirname + '/index.html');

    mainWindow.openDevTools();

    mainWindow.on('closed', function() {
        mainWindow = null;
    });
});
