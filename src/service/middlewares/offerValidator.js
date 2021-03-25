'use strict';

const {HTTP_CODES} = require(`../../constants`);

module.exports = (req, res, next) => {
  const {title, description, sum, category, picture, type} = req.body;
  const errorMessages = [];

  if (!title) {
    errorMessages.push(`title is required`);
  }

  if (!description) {
    errorMessages.push(`description is required`);
  }

  if (!sum) {
    errorMessages.push(`sum is required`);
  }

  if (sum && typeof sum !== `number`) {
    errorMessages.push(`type of sum should be a number`);
  }

  if (!category || !Array.isArray(category)) {
    errorMessages.push(`category should be string array`);
  }

  if (Array.isArray(category) && !category.length) {
    errorMessages.push(`at least 1 category is required`);
  }

  if (!picture) {
    errorMessages.push(`picture is required`);
  }

  if (!type) {
    errorMessages.push(`type is required`);
  }

  if (errorMessages.length) {
    return res.status(HTTP_CODES.BAD_REQUEST).json({
      code: HTTP_CODES.BAD_REQUEST,
      errorMessages
    });
  }

  return next();
};
