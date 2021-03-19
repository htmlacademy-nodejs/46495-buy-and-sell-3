'use strict';

class CategoryService {
  constructor(offers) {
    this._offers = offers;
  }

  getAll() {
    const categories = this._offers.reduce((acc, offer) => {
      offer.category.forEach((category) => acc.add(category));
      return acc;
    }, new Set());

    return [...categories];
  }
}

module.exports = CategoryService;
