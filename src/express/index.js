'use strict';

const express = require(`express`);
const path = require(`path`);
const mainRouter = require(`./routes/main`);
const myRouter = require(`./routes/my`);
const offersRouter = require(`./routes/offers`);
const chalk = require(`chalk`);
const {HTTP_FRONT_SERVICE_PORT, HTTP_CODES} = require(`../constants`);

const app = express();

app.use(`/`, mainRouter);
app.use(`/my`, myRouter);
app.use(`/offers`, offersRouter);

app.use(express.static(path.resolve(__dirname, `public`)));

app.use((req, res) => res.status(HTTP_CODES.NOT_FOUND).render(`layouts/404`));
app.use((err, _req, res, _next) => res.status(HTTP_CODES.SERVER_ERROR).render(`layouts/500`));

app.set(`views`, path.resolve(__dirname, `templates`));
app.set(`view engine`, `pug`);

app.listen(HTTP_FRONT_SERVICE_PORT, (err) => {
  if (err) {
    return console.error(chalk.red(`Something went wrong...`, err));
  }

  return console.log(`${chalk.blue(`Front server starts on port:`)} ${HTTP_FRONT_SERVICE_PORT}`);
});
