/*jshint node:true*/

var stringUtil         = require('ember-cli-string-utils');
var pathUtil           = require('ember-cli-path-utils');
var validComponentName = require('../../lib/utilities/valid-component-name');
var getPathOption      = require('../../lib/utilities/get-component-path-option');
var path               = require('path');

var normalizeEntityName = require('ember-cli-normalize-entity-name');

module.exports = {
  description: 'Generates a component.',

  anonymousOptions: [
    '<props...>'
  ],

  fileMapTokens: function() {
    return {
      __path__: function(options) {
        return 'shared/components/' + options.locals.entity.name;
      }
    };
  },

  normalizeEntityName: function(entityName) {
    entityName = normalizeEntityName(entityName);

    return validComponentName(entityName);
  },

  locals: function(options) {
    var name = '';
    var templatePath   = '';
    var importTemplate = '';
    var contents       = '';

    return {
      entity: options.entity,
      importTemplate: importTemplate,
      contents: contents,
      props: options.entity.options,
      path: getPathOption(options)
    };
  }
};
