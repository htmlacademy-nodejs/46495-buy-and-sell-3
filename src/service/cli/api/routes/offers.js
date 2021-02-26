'use strict';

const path = require(`path`);
const {Router} = require(`express`);
const {HTTP_CODES} = require(`../../../../constants`);
const offersRouter = new Router();

offersRouter.get(`/`, async (req, res) => {
  try {
    const data = require(path.join(__dirname, `../../../../../mocks.json`));
    res.status(HTTP_CODES.SUCCESS).json(data);
  } catch (err) {
    res.status(HTTP_CODES.SUCCESS).json([]);
  }
});

module.exports = offersRouter;
