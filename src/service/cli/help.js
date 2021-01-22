'use strict';

const Table = require('cli-table');
const color = require('cli-color');

const commandsTable = new Table({
  head: ['Команды:', ''],
  chars: {
    'top': '',
    'top-mid': '',
    'top-left': '',
    'top-right': '',
    'bottom': '',
    'bottom-mid': '',
    'bottom-left': '',
    'bottom-right': '',
    'left': '',
    'left-mid': '',
    'mid': '',
    'mid-mid': '',
    'right': '',
    'right-mid': '',
    'middle': ' '
  }
});

commandsTable.push(
  [color.yellow('--version'), 'выводит номер версии'],
  [color.yellow('--help'), 'печатает этот текст'],
  [color.yellow('--generate <count>'), 'формирует файл mocks.json']
);

module.exports = {
  name: '--help',
  run() {
    console.log(commandsTable.toString());
  }
};
