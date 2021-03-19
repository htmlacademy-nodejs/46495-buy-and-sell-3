'use strict';

const {HTTP_CODES} = require(`../../constants`);

module.exports = (service) => (req, res, next) => {
  const {offerId} = req.params;
  const offer = service.getById(offerId);

  if (!offer) {
    return res.status(HTTP_CODES.NOT_FOUND).send(`Offer with id "${offerId}" not found`);
  }

  res.locals.offer = offer;
  return next();
};
