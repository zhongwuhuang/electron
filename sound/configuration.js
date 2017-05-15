'use strict';
// var electron = require('electron');

var nconf = require('nconf').file({file: getUserHome() + '/sound-machine-config.json'});

// 通过 nconf 模块的 set() 和 get() 方法结合文件操作的 save() 和 load()，我们可以实现设置文件的读写操作
function saveSettings(settingKey, settingValue) {
    nconf.set(settingKey, settingValue);
    nconf.save();
};
function readSettings(settingKey) {
    nconf.load();
    return nconf.get(settingKey);
};

// 文件位置和文件名传 nconf 模块
function getUserHome() {
    return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
};

// 然后通过 module.exports 将接口暴露到外部
module.exports = {
    saveSettings: saveSettings,
    readSettings: readSettings
};
