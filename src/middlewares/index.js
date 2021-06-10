const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const auth = require('./auth');
const notFound = require('./notFound');
const errorHandler = require('./errorHandler');

module.exports = {
  cors,
  helmet,
  morgan,
  auth,
  notFound,
  errorHandler,
};
