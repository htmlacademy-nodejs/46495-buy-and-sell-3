'use strict';

const express = require(`express`);
const chalk = require(`chalk`);
const {getAPI} = require(`../api`);
const {HTTP_API_SERVICE_PORT, HTTP_CODES, API_PREFIX} = require(`../../constants`);

module.exports = {
  name: `--server`,
  async run(args) {
    const [setPort] = args;
    const port = setPort ? Number(setPort) : HTTP_API_SERVICE_PORT;

    if (!Number.isInteger(port)) {
      console.error(chalk.red(`Wrong port index...`));
      return;
    }

    const app = express();
    const api = await getAPI();

    app.use(express.json());
    app.use(API_PREFIX, api);
    app.use((req, res) => {
      res.status(HTTP_CODES.NOT_FOUND).json({
        code: HTTP_CODES.NOT_FOUND,
        errorMessages: [`route not found...`]
      });
    });

    app.listen(port, (err) => {
      if (err) {
        return console.error(chalk.red(`Something went wrong...`, err));
      }

      return console.log(`${chalk.blue(`API server starts on port:`)} ${port}`);
    });
  }
};
