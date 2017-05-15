'use strict';

const electron = require('electron');
// 引入ipc模块
const ipcRenderer = electron.ipcRenderer;

var closeEl = document.querySelector('button');

// 我们依然需要把 ipc 模块引入到文件中，给关闭按钮绑定点击事件。当点击了关闭按钮时，通过 send() 方法发送一条信息到“关闭主窗口”频道
closeEl.addEventListener('click', function () {
    ipcRenderer.send('close-settings-window');
});
