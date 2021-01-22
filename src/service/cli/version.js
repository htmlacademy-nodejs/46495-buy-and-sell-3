'use strict';

const {version: currentVersion} = require('../../../package.json');
const color = require('cli-color');

module.exports = {
  name: '--version',
  run() {
    console.log(`${color.yellow('Текущая версия:')} ${currentVersion}`);
  }
};
