'use strict';

const express = require(`express`);
const chalk = require(`chalk`);
const offersRouter = require(`./api/routes/offers`);
const {HTTP_API_SERVICE_PORT, HTTP_CODES} = require(`../../constants`);

const app = express();
app.use(express.json());
app.use(`/offers`, offersRouter);
app.use((req, res) => {
  res.status(HTTP_CODES.NOT_FOUND).send(`not found...`);
});

module.exports = {
  name: `--server`,
  run(args) {
    const [setPort] = args;
    const port = setPort ? Number(setPort) : HTTP_API_SERVICE_PORT;

    if (!Number.isInteger(port)) {
      console.error(chalk.red(`Wrong port index...`));
      return;
    }

    app.listen(port, (err) => {
      if (err) {
        return console.error(chalk.red(`Something went wrong...`, err));
      }

      return console.log(`${chalk.blue(`API server starts on port:`)} ${port}`);
    });
  }
};
