const { Sequelize } = require('sequelize');
const {
  MYSQL_DATABASE,
  MYSQL_USER,
  MYSQL_ROOT_PASSWORD,
  MYSQL_HOST,
} = process.env;

class DB {
  constructor() {
    this._sequelize = new Sequelize(MYSQL_DATABASE, MYSQL_USER, MYSQL_ROOT_PASSWORD, {
      host: MYSQL_HOST,
      dialect: 'mysql',
    });
  }

  get sequelize() {
    return this._sequelize;
  }

  async testConnection() {
    try {
      await this.sequelize.authenticate();
      // eslint-disable-next-line no-console
      console.log('Connection has been established successfully.');
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Unable to connect to the database:', error);
    }
  }
}

module.exports = DB;
