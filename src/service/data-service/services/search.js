'use strict';

class SearchService {
  constructor(offers) {
    this._offers = offers;
  }

  search(query) {
    return this._offers.filter((item) => item.title.toLowerCase().includes(query.toLowerCase()));
  }
}

module.exports = SearchService;
