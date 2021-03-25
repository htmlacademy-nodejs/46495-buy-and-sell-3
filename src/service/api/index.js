'use strict';

const {Router} = require(`express`);
const offers = require(`./routes/offers`);
const search = require(`./routes/search`);
const category = require(`./routes/category`);
const getMockData = require(`../lib/get-mock-data`);

const {
  OfferService,
  SearchServices,
  CategoryService
} = require(`../data-service`);

async function getAPI() {
  const api = new Router();
  const mockData = await getMockData();

  offers(api, new OfferService(mockData));
  search(api, new SearchServices(mockData));
  category(api, new CategoryService(mockData));

  return api;
}

module.exports = {getAPI};
