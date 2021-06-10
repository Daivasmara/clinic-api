require('dotenv').config();

const {
  MYSQL_HOST,
  MYSQL_DATABASE,
  MYSQL_USER,
  MYSQL_ROOT_PASSWORD,
} = process.env;

module.exports = {
  development: {
    username: MYSQL_USER,
    password: MYSQL_ROOT_PASSWORD,
    database: MYSQL_DATABASE,
    host: MYSQL_HOST,
    dialect: 'mysql',
  },
  staging: {
    username: MYSQL_USER,
    password: MYSQL_ROOT_PASSWORD,
    database: MYSQL_DATABASE,
    host: MYSQL_HOST,
    dialect: 'mysql',
  },
  production: {
    username: MYSQL_USER,
    password: MYSQL_ROOT_PASSWORD,
    database: MYSQL_DATABASE,
    host: MYSQL_HOST,
    dialect: 'mysql',
  },
};
