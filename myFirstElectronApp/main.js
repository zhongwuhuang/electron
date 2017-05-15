'use strict';
// ??????????????疑问:用这种方式引入模块不行
// var app = require('app');  // 控制应用生命周期的模块。
// var BrowserWindow = require('browser-window');  // 创建原生浏览器窗口的模块

const electron = require('electron')
// 创建全局模块
const globalShortcut = electron.globalShortcut;
// 控制应用生命周期的模块。
const app = electron.app
// 创建原生浏览器窗口的模块
const BrowserWindow = electron.BrowserWindow
const ipcMain = electron.ipcMain;

// 保持一个对于 window 对象的全局引用，不然，当 JavaScript 被 GC，
// window 会被自动地关闭
var mainWindow = null;

function createWindow(){
  // 创建浏览器窗口。
  mainWindow = new BrowserWindow({width: 800, height: 600});

  // 加载应用的 index.html
  mainWindow.loadURL('file://' + __dirname + '/index.html');

  // 打开开发工具  疑问::两个都可以实现
  // mainWindow.openDevTools();
  // mainWindow.webContents.openDevTools();

  // 当 window 被关闭，这个事件会被发出
  mainWindow.on('closed', function() {
    // 取消引用 window 对象，如果你的应用支持多窗口的话，
    // 通常会把多个 window 对象存放在一个数组里面，
    // 但这次不是。
    mainWindow = null;
  });
}

// 当 Electron 完成了初始化并且准备创建浏览器窗口的时候
// 这个方法就被调用
app.on('ready',function(){
  createWindow();

  var ret = globalShortcut.register('ctrl+x', function() {
    app.quit();
  })

  if (!ret) {
    console.log('registration failed');
  }

  // 检查快捷键是否被占用
  console.log(globalShortcut.isRegistered('ctrl+x'));

  globalShortcut.register('ctrl+d', function() {
    console.log(app.getAppPath());
  })

  //打开开发者工具
  globalShortcut.register('f12', function() {
    // if(mainWindow.webContents.isDevToolsOpened()){
    //   mainWindow.webContents.closeDevTools();
    // }else{
    //   mainWindow.webContents.openDevTools();
    // }
    mainWindow.webContents.toggleDevTools();
  })

  //重载网页
  globalShortcut.register('f5', function() {
    mainWindow.webContents.reload();
  })

});

// app.on('activate', function () {
//   if (mainWindow === null) {
//     createWindow()
//   }
// })

// 当所有窗口被关闭了，退出。
app.on('window-all-closed', function() {
  // 在 OS X 上，通常用户在明确地按下 Cmd + Q 之前
  // 应用会保持活动状态
  if (process.platform != 'darwin') {
    app.quit();
  }
});

ipcMain.on('add-css',function(){
  console.log('绿了');
  mainWindow.webContents.insertCSS('body{color:green;}');
});
ipcMain.on('delete-css',function(){
  console.log('黑了');
  mainWindow.webContents.insertCSS('body{color:black;}');
});
