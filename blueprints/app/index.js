/*jshint node:true*/

var stringUtil = require('ember-cli-string-utils');

module.exports = {
  description: 'The default blueprint for mern projects.',

  locals: function(options) {
    var entity    = options.entity;
    var rawName   = entity.name;
    var name      = rawName;
    var namespace = stringUtil.classify(rawName);

    return {
      name: name,
      modulePrefix: name,
      namespace: namespace,
      mernCLIVersion: require('../../package').version
    };
  }
};
