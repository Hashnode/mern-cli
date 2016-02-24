'use strict';

var Promise  = require('../../lib/ext/promise');
var Task     = require('../models/task');
var exec     = Promise.denodeify(require('child_process').exec);
var path     = require('path');
var pkg      = require('../../package.json');
var fs       = require('fs');
var template = require('lodash/template');

module.exports = Task.extend({
  run: function(commandOptions) {
    var chalk  = require('chalk');
    var ui     = this.ui;

    return exec('git --version')
      .then(function() {
        return exec('git init')
          .then(function() {
            return exec('git pull https://github.com/Hashnode/mern-starter.git');
          })
          .then(function(){
            ui.writeLine(chalk.green('Successfully fetched the starter kit.'));
          });
      })
      .catch(function(error){
        if (commandOptions.logErrors) {
          ui.writeError(error);
        }
      });
  }
});
