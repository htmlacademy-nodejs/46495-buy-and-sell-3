'use strict';

const chalk = require(`chalk`);
const fs = require(`fs`).promises;
const path = require(`path`);
const mockData = require(`./mock-data`);
const {getRandomNumber} = require(`../../utils`);

const stringPicker = (source, minCount, maxCount) => {
  const out = [];
  const arr = [...source];
  const count = getRandomNumber(minCount, maxCount);

  for (let i = 0; i < count; i++) {
    const item = arr[getRandomNumber(0, arr.length - 1)];
    const index = arr.indexOf(item);
    out.push(item);
    arr.splice(index, 1);
  }

  return out;
};


const generate = (count) => {
  const out = [];

  for (let i = 0; i < count; i++) {
    out.push({
      type: `offer`,
      title: mockData.titles[getRandomNumber(0, mockData.titles.length - 1)],
      description: stringPicker(mockData.descriptions, 1, 5).join(` `),
      sum: getRandomNumber(1000, 100000),
      picture: `item01.jpg`,
      category: stringPicker(mockData.categories, 1, 3)
    });
  }

  return out;
};

module.exports = {
  name: `--generate`,
  async run(args) {
    const [countProp] = args;
    const itemsCount = !countProp ? 1 : Number(countProp);

    if (!Number.isInteger(itemsCount) || itemsCount === 0 || itemsCount > 1000) {
      console.log(chalk.red(`Нужно ввести число от 1 до 1000`));
      return;
    }

    try {
      await fs.writeFile(path.join(__dirname, `../../../mocks.json`), JSON.stringify(generate(itemsCount), null, 2));
      console.log(chalk.green(`Успешно! Данные можно найти в файле mocks.json`));
    } catch (err) {
      console.error(chalk.red(`Что-то пошло не так...`));
    }
  }
};
