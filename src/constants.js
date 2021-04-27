'use strict';

module.exports = {
  DEFAULT_COMMAND: `--help`,
  USER_ARGV_INDEX: 2,
  EXIT_CODES: {
    success: 0,
    error: 1
  },
  HTTP_CODES: {
    SUCCESS: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    SERVER_ERROR: 500
  },
  HTTP_API_SERVICE_PORT: 3000,
  HTTP_FRONT_SERVICE_PORT: 8000,
  API_PREFIX: `/api`,
  ENV: {
    DEVELOPMENT: `development`,
    PRODUCTION: `production`
  }
};
