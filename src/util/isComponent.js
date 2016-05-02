var settings = require('../../settings');

module.exports = function(blueprint) {
  return settings.COMPONENTS.indexOf(blueprint) !== -1;
}