'use strict';

const chalk = require(`chalk`);

const helpMessage = `
    Гайд:
    ${chalk.yellow(`service.js <command>`)}

    Команды:
    ${chalk.yellow(`--version`)}             выводит номер версии
    ${chalk.yellow(`--help`)}                печатает этот текст
    ${chalk.yellow(`--generate <count>`)}    формирует файл mocks.json
`;

module.exports = {
  name: `--help`,
  run() {
    console.log(helpMessage);
  }
};
