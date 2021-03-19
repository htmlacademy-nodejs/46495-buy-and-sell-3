'use strict';

const {Router} = require(`express`);
const offers = require(`./routes/offers`);
const search = require(`./routes/search`);
const category = require(`./routes/category`);
const getMockData = require(`../lib/get-mock-data`);

const app = new Router();

const {
  OfferService,
  SearchServices,
  CategoryService
} = require(`../data-service`);

(async () => {
  const mockData = await getMockData();

  offers(app, new OfferService(mockData));
  search(app, new SearchServices(mockData));
  category(app, new CategoryService(mockData));
})();

module.exports = app;
