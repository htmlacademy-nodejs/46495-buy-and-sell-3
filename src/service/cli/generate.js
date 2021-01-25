'use strict';

const color = require('cli-color');
const fs = require('fs');
const path = require('path');
const mockData = require('./mock-data');
const {EXIT_CODES} = require('../../constants');
const {getRandomNumber} = require('../../utils')

const stringPicker = (source, minCount, maxCount) => {
  const out = [];
  const arr = [...source];
  const count = getRandomNumber(minCount, maxCount);

  for (let i = 0; i < count; i++) {
    const item = arr[getRandomNumber(0, arr.length - 1)]
    const index = arr.indexOf(item);
    out.push(item);
    arr.splice(index, 1);
  }

  return out;
}


const generate = count => {
  const out = [];

  for (let i = 0; i < count; i++) {
    out.push({
      type: 'offer',
      title: mockData.titles[getRandomNumber(0, mockData.titles.length - 1)],
      description: stringPicker(mockData.descriptions, 1, 5).join(' '),
      sum: getRandomNumber(1000, 100000),
      picture: 'item01.jpg',
      category: stringPicker(mockData.categories, 1, 3)
    })
  }

  return out;
}

module.exports = {
  name: '--generate',
  run(args) {
    const [countProp] = args;
    const itemsCount = !countProp ? 1 : Number(countProp);

    if (!Number.isInteger(itemsCount) || itemsCount === 0 || itemsCount > 1000) {
      console.log(color.red('Нужно ввести число от 1 до 1000'))
      return;
    }

    fs.writeFile(path.join(__dirname, '../../../mocks.json'), JSON.stringify(generate(itemsCount), null, 2), err => {
      if (err) {
        console.log(color.red('Что-то пошло не так...'))
        process.exit(EXIT_CODES.error);
      } else {
        console.log(color.green('Успешно! Данные можно найти в файле mocks.json'))
        process.exit(EXIT_CODES.success);
      }
    })
  }
};
