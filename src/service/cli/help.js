'use strict';

const chalk = require(`chalk`);

const helpMessage = `
    Example:
    ${chalk.yellow(`service.js <command>`)}

    Commands:
    ${chalk.yellow(`--version`)}             show current app version
    ${chalk.yellow(`--help`)}                show this message
    ${chalk.yellow(`--generate <count>`)}    generate data to "mocks.json"
    ${chalk.yellow(`--server <port>`)}       start server
`;

module.exports = {
  name: `--help`,
  run() {
    console.log(helpMessage);
  }
};
