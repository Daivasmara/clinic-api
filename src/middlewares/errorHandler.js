const { ENVIRONMENT } = require('../utils/helpers/constants');

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, _req, res, _next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);

  const message = {
    message: err.message,
    stack: err.stack,
  };

  if (process.env.NODE_ENV === ENVIRONMENT.production) {
    delete message.stack;
  }

  res.json(message);
};

module.exports = errorHandler;
