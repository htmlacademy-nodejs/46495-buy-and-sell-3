'use strict';

const {nanoid} = require(`nanoid`);

class OfferService {
  constructor(offers) {
    this._offers = offers;
  }

  getAll() {
    return this._offers || [];
  }

  getById(offerId) {
    return this._offers.find((item) => item.id === offerId);
  }

  create({title, description, sum, category, type, picture}) {
    const offer = {
      id: nanoid(),
      type,
      picture,
      comments: [],
      title,
      description,
      sum,
      category
    };

    this._offers.push(offer);
    return offer;
  }

  edit(offerId, {title, description, sum, category, type, picture}) {
    this._offers.forEach((item) => {
      if (item.id === offerId) {
        item.title = title;
        item.description = description;
        item.sum = sum;
        item.category = category;
        item.type = type;
        item.picture = picture;
      }
    });

    return {success: this.getById(offerId)};
  }

  delete(offerId) {
    this._offers = this._offers.filter((item) => item.id !== offerId);
  }

  getComments(offerId) {
    const offer = this.getById(offerId);
    return offer.comments;
  }

  deleteComment(offerId, commentId) {
    this._offers.forEach((item) => {
      if (item.id === offerId) {
        item.comments = item.comments.filter((comment) => comment.id !== commentId);
      }
    });
  }

  createComment(offerId, {text}) {
    const comment = {
      id: nanoid(),
      text
    };

    this._offers.forEach((item) => {
      if (item.id === offerId) {
        item.comments = [...item.comments, comment];
      }
    });

    return comment;
  }
}

module.exports = OfferService;
