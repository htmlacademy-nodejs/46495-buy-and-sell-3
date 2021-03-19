'use strict';

const {Router} = require(`express`);
const {HTTP_CODES} = require(`../../../constants`);

module.exports = (app, categoryService) => {
  const route = new Router();
  app.use(`/categories`, route);

  route.get(`/`, (req, res) => {
    return res.status(HTTP_CODES.SUCCESS).json(categoryService.getAll());
  });

};
