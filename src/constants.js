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
    NOT_FOUND: 404
  },
  HTTP_API_SERVICE_PORT: 3000,
  HTTP_FRONT_SERVICE_PORT: 8000
};
