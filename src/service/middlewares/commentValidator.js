'use strict';

const {HTTP_CODES} = require(`../../constants`);

module.exports = (req, res, next) => {
  const {text} = req.body;
  const errorMessages = [];

  if (!text) {
    errorMessages.push(`text is required`);
  }

  if (errorMessages.length) {
    return res.status(HTTP_CODES.BAD_REQUEST).json({
      errorCode: HTTP_CODES.BAD_REQUEST,
      errorMessages
    });
  }

  return next();
};
