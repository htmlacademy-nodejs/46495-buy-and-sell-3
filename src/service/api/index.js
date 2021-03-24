'use strict';

const {Router} = require(`express`);
const offers = require(`./routes/offers`);
const search = require(`./routes/search`);
const category = require(`./routes/category`);
const getMockData = require(`../lib/get-mock-data`);

const api = new Router();

const {
  OfferService,
  SearchServices,
  CategoryService
} = require(`../data-service`);

const provideData = async () => {
  const mockData = await getMockData();

  offers(api, new OfferService(mockData));
  search(api, new SearchServices(mockData));
  category(api, new CategoryService(mockData));
};

module.exports = {api, provideData};
