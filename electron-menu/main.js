"use strict";

const electron = require('electron')

const app = electron.app

const BrowserWindow = electron.BrowserWindow

let mainWindow

function createWindow(){
    mainWindow = new BrowserWindow({
        width:800,
        height:400
    })

    mainWindow.loadURL(`file://${__dirname}/index.html`);

    // mainWindow.webContents.openDevTools()

    mainWindow.on('closed', function () {

        mainWindow = null
    })

}

app.on('ready',function(){
  createWindow()
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
