'use strict';

const {Router} = require(`express`);
const offersRouter = new Router();

offersRouter.get(`/category/:id`, (req, res) => res.send(`category: ${req.params.id}`));
offersRouter.get(`/add`, (req, res) => res.send(`create new offer`));
offersRouter.get(`/edit/:id`, (req, res) => res.send(`edit offer, id: ${req.params.id}`));
offersRouter.get(`/:id`, (req, res) => res.send(`offer page, id: ${req.params.id}`));

module.exports = offersRouter;
