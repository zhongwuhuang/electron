'use strict';

const electron = require('electron');
// 引入ipc模块
const ipcRenderer = electron.ipcRenderer;

var closeEl = document.querySelector('button');

// 我们依然需要把 ipc 模块引入到文件中，给关闭按钮绑定点击事件。当点击了关闭按钮时，通过 send() 方法发送一条信息到“关闭主窗口”频道
closeEl.addEventListener('click', function () {
    ipcRenderer.send('close-settings-window');
});

// 复选框绑定事件来改变我们的全局快捷键
var modifierCheckboxes = document.querySelectorAll('.global-shortcut');
var configuration = require('../configuration.js');
//打开settings.html页时根据'shortcutKeys'键的值，对相应的复选框勾选
for(var i = 0 ; i<modifierCheckboxes.length;i++){
    var modifierKey = modifierCheckboxes[i].attributes['data-modifier-key'].value;
    var shortcutKeys = configuration.readSettings('shortcutKeys');
    modifierCheckboxes[i].checked = shortcutKeys.indexOf(modifierKey) !== -1;

    modifierCheckboxes[i].addEventListener('click', function (e) {
        bindModifierCheckboxes(e);
    });
};

function bindModifierCheckboxes(e) {
    var shortcutKeys = configuration.readSettings('shortcutKeys');
    var modifierKey = e.target.attributes['data-modifier-key'].value;

    if (shortcutKeys.indexOf(modifierKey) !== -1) {
        var shortcutKeyIndex = shortcutKeys.indexOf(modifierKey);
        shortcutKeys.splice(shortcutKeyIndex, 1);
    }
    else {
        shortcutKeys.push(modifierKey);
    }

    configuration.saveSettings('shortcutKeys', shortcutKeys);
    ipcRenderer.send('set-global-shortcuts');
}
