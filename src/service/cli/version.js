'use strict';

const {version: currentVersion} = require(`../../../package.json`);
const chalk = require(`chalk`);

module.exports = {
  name: `--version`,
  run() {
    console.log(`Current version: ${chalk.blue(currentVersion)}`);
  }
};
