'use strict';

const express = require(`express`);
const {getLogger} = require(`../lib/logger`);
const {getAPI} = require(`../api`);
const {HTTP_API_SERVICE_PORT, HTTP_CODES, API_PREFIX} = require(`../../constants`);

module.exports = {
  name: `--server`,
  async run(args) {
    const [setPort] = args;
    const port = setPort ? Number(setPort) : HTTP_API_SERVICE_PORT;

    if (!Number.isInteger(port)) {
      return logger.error(`Can't start server, wrong port index`);
    }

    const app = express();
    const api = await getAPI();
    const logger = getLogger({name: `api`});

    app.use(express.json());

    app.use((req, res, next) => {
      logger.debug(`Request on route ${req.url}`);
      res.on(`finish`, () => {
        logger.info(`Response status code ${res.statusCode}`);
      });
      next();
    });

    app.use(API_PREFIX, api);

    app.use((req, res) => {
      res.status(HTTP_CODES.NOT_FOUND).json({
        code: HTTP_CODES.NOT_FOUND,
        errorMessages: [`route not found...`]
      });
      logger.error(`Route not found: ${req.url}`);
    });

    app.use((err, _req, _res, _next) => {
      logger.error(`An error occurred on processing request: ${err.message}`);
    });

    try {
      app.listen(port, (err) => {
        if (err) {
          return logger.error(`An error occurred on server creation: ${err.message}`);
        }

        return logger.info(`Listening to connections on ${port}`);
      });

    } catch (err) {
      logger.error(`An error occurred: ${err.message}`);
      process.exit(1);
    }
  }
};
