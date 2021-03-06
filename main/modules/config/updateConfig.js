'use strict';

const storage = require('electron-json-storage-sync');
const deepmerge = require('deepmerge');
const sendMessageToRenderer = require('../util/sendMessageToRenderer');
const defaultConfig = require('../../../resources/config');
const setLocale = require('../util/setLocale');

module.exports = function updateConfig(key, value) {
    let currentConfig = storage.get('config');

    if (currentConfig.status) {
        let result = storage.set('config', Object.assign(currentConfig.data, { [key]: value }));

        if (result.status) {
            if (key === 'locale') {
                setLocale(value);
            }

            sendMessageToRenderer('config:updated', {
                config: deepmerge(defaultConfig, result.data),
            });
        }
    }
};