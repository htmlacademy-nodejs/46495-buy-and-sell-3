'use strict';

const {HTTP_CODES} = require(`../../constants`);

module.exports = (service) => (req, res, next) => {
  const {offerId} = req.params;
  const offer = service.getById(offerId);

  if (!offer) {
    return res.status(HTTP_CODES.NOT_FOUND).json({
      code: HTTP_CODES.BAD_REQUEST,
      errorMessages: [`Offer with id "${offerId}" not found`]
    });
  }

  res.locals.offer = offer;
  return next();
};
