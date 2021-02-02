'use strict';

const chalk = require(`chalk`);
const fs = require(`fs`).promises;
const path = require(`path`);
const {getRandomNumber} = require(`../../utils`);

const FILE_PATH = {
  destination: path.join(__dirname, `../../../mocks.json`),
  source: {
    titles: path.join(__dirname, `../../../data/titles.txt`),
    sentences: path.join(__dirname, `../../../data/sentences.txt`),
    categories: path.join(__dirname, `../../../data/categories.txt`)
  }
};

const readContent = async (filePath) => {
  try {
    const content = await fs.readFile(filePath, `utf8`);
    return content.trim().split(`\n`);
  } catch (err) {
    console.error(chalk.red(err));
    throw new Error();
  }
};

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

const generate = async (count) => {
  const out = [];
  const mockData = {
    sentences: await readContent(FILE_PATH.source.sentences),
    titles: await readContent(FILE_PATH.source.titles),
    categories: await readContent(FILE_PATH.source.categories)
  };

  for (let i = 0; i < count; i++) {
    out.push({
      type: `offer`,
      title: mockData.titles[getRandomNumber(0, mockData.titles.length - 1)],
      description: stringPicker(mockData.sentences, 1, 5).join(` `),
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
      console.log(chalk.red(`Please, set number from 1 to 1000`));
      return;
    }

    try {
      await fs.writeFile(FILE_PATH.destination, JSON.stringify(await generate(itemsCount), null, 2));
      console.log(chalk.green(`Success! You can find generated data in file "mocks.json"`));
    } catch (err) {
      console.error(chalk.red(`Something went wrong...`));
    }
  }
};
