// eslint-disable-next-line no-restricted-globals
const isValidDate = (date) => date instanceof Date && !isNaN(date);

module.exports = {
  isValidDate,
};
