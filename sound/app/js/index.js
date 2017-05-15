'use strict';

const electron = require('electron');
// 引入ipc模块
const ipcRenderer = electron.ipcRenderer;
// var ipc = require('ipc');

var soundButtons = document.querySelectorAll('.button-sound');
var closeEl = document.querySelectorAll('.closed')[0];
var settingEl = document.querySelector('.settings');

for (var i = 0; i < soundButtons.length; i++) {
    var soundButton = soundButtons[i];
    var soundName = soundButton.attributes['data-sound'].value;

    prepareButton(soundButton, soundName);
}

function prepareButton(buttonEl, soundName) {
    // buttonEl.querySelector('span').style.backgroundImage = 'url("img/icons/' + soundName + '.png")';

    var audio = new Audio(__dirname + '/wav/' + soundName + '.wav');
    buttonEl.addEventListener('click', function () {
        audio.currentTime = 0;
        audio.play();
    });
}

// 快捷键播放声音
ipcRenderer.on('global-shortcut', function () {
    var event = new MouseEvent('click');
    soundButtons[arguments[1]].dispatchEvent(event);
});

// 我们依然需要把 ipc 模块引入到文件中，给关闭按钮绑定点击事件。当点击了关闭按钮时，通过 send() 方法发送一条信息到“关闭主窗口”频道
closeEl.addEventListener('click', function () {
    ipcRenderer.send('close-main-window');
});


//给设置按钮绑定点击事件
settingEl.addEventListener('click',function(){
   ipcRenderer.send('open-settings-window');//向主进程main.js发送请求
});
