'use strict';

// var ipc = require('ipc');
const electron = require('electron');
// 引入ipc模块
const ipcMain = electron.ipcMain;
// 控制应用生命周期的模块。
const app = electron.app;
// 创建原生浏览器窗口的模块
const BrowserWindow = electron.BrowserWindow;
// 创建全局模块
const globalShortcut = electron.globalShortcut;

// 保持一个对于 window 对象的全局引用，不然，当 JavaScript 被 GC，
// window 会被自动地关闭
var mainWindow = null;

function createWindow(){
  // 创建浏览器窗口。
  mainWindow = new BrowserWindow({
    width: 200,
    height: 280,
    frame:false,
    resizable: false,//应用窗口能否拉伸
  });

  // 加载应用的 index.html
  mainWindow.loadURL('file://' + __dirname + '/app/index.html');

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

  // 注册全局播放快捷键
  globalShortcut.register('ctrl+shift+1', function () {
    mainWindow.send('global-shortcut', 0);
  });
  globalShortcut.register('ctrl+shift+2', function () {
    mainWindow.send('global-shortcut', 1);
  });
  globalShortcut.register('ctrl+shift+3', function () {
    mainWindow.send('global-shortcut', 2);
  });
}

// 当 Electron 完成了初始化并且准备创建浏览器窗口的时候这个方法就被调用
app.on('ready',createWindow);

// 当所有窗口被关闭了，退出。
app.on('window-all-closed', function() {
  // 在 OS X 上，通常用户在明确地按下 Cmd + Q 之前
  // 应用会保持活动状态
  if (process.platform != 'darwin') {
    app.quit();
  }
});

// 将主进程（main.js）订阅到“关闭主窗口”频道中，当用户点击关闭按钮时，从渲染器进程（index.js）向该频道发送信息
// 把 ipc 模块包含进来之后，从频道中订阅信息就非常简单了：通过 on() 方法和频道名称，再加上一个回调函数就行了
ipcMain.on('close-main-window', function () {
    app.quit();
});

//绘制设置窗口
var settingsWindow = null;
ipcMain.on('open-settings-window',function(){
  // 防止多次实例化窗口
  if(settingsWindow){
    return;
  }

  settingsWindow = new BrowserWindow({
    frame:false,
    height:135,
    width:105,
    resizabla:false,//应用窗口能否拉伸
  });

  settingsWindow.loadURL('file://' + __dirname + '/app/settings.html');

  settingsWindow.on('closed',function(){
    settingsWindow = null;
  })
});

// 监听关闭设置事件
ipcMain.on('close-settings-window', function () {
    settingsWindow.close();
});
