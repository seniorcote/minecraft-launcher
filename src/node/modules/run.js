const { app, BrowserWindow } = require('electron');
const storage = require('electron-json-storage-sync');
const defaultConfig = require('../../../resources/config');
// const mkdirp = require('mkdirp');

function initConfig() {
    if (!storage.get('config').status) {
        defaultConfig.gameDirectory = app.getPath('home').concat('/.minecraft');

        // todo: Создавать папку (если ее нет) будем при попытке запуска игры.
        // mkdirp(defaultConfig.gameDirectory, () => {
        //     throw 'Unable to create game directory.';
        // });

        const result = storage.set('config', defaultConfig);

        if (!result.status) {
            throw 'Failed to initialize application config.';
        }
    }
}

function initWindow() {
    let window = new BrowserWindow({
        width: defaultConfig.width,
        height: defaultConfig.height,
    });

    window.on('closed', () => window = null);
    window.loadFile('index.html');

    return window;
}

module.exports = function run() {
    initConfig();

    require('../listeners');

    initWindow();

    if (process.env.NODE_ENV === 'development') {
        require('vue-devtools').install();
    }
};
