'use strict';

var clone                 = require('lodash/clone');
var merge                 = require('lodash/merge');
var Command               = require('../models/command');
var Promise               = require('../ext/promise');
var SilentError           = require('silent-error');
var validProjectName      = require('../utilities/valid-project-name');
var debug                 = require('debug')('ember-cli:command:init');

module.exports = Command.extend({
  name: 'init',
  description: 'Creates a new mern-cli project in the current folder.',
  aliases: ['i'],
  works: 'everywhere',

  availableOptions: [
    { name: 'verbose',    type: Boolean, default: false, aliases: ['v'] },
    { name: 'skip-npm',   type: Boolean, default: false, aliases: ['sn'] },
    { name: 'name',       type: String,  default: '',    aliases: ['n'] }
  ],

  run: function(commandOptions, rawArgs) {
    if (commandOptions.dryRun) {
      commandOptions.skipNpm = true;
    }

    var checkoutStarter = new this.tasks.CheckoutStarter({
      ui: this.ui,
      analytics: this.analytics,
      project: this.project
    });

    // needs an explicit check in case it's just 'undefined'
    // due to passing of options from 'new' and 'addon'
    if (commandOptions.skipGit === false) {
      var gitInit = new this.tasks.GitInit({
        ui: this.ui,
        project: this.project
      });
    }

    if (!commandOptions.skipNpm) {
      var npmInstall = new this.tasks.NpmInstall({
        ui: this.ui,
        analytics: this.analytics,
        project: this.project
      });
    }

    var project     = this.project;
    var packageName = commandOptions.name !== '.' && commandOptions.name || project.name();

    if (!packageName) {
      var message = 'The `mern ' + this.name + '` command requires a ' +
                    'package.json in current folder with name attribute or a specified name via arguments. ' +
                    'For more details, use `mern help`.';

      return Promise.reject(new SilentError(message));
    }

    var checkoutStarterOpts = clone(commandOptions);
    merge(checkoutStarterOpts, {
      rawName: packageName,
      targetFiles: rawArgs || '',
      rawArgs: rawArgs.toString()
    });

    if (!validProjectName(packageName)) {
      return Promise.reject(new SilentError('We currently do not support a name of `' + packageName + '`.'));
    }

    debug('before:checkoutStarter');
    return checkoutStarter.run(checkoutStarterOpts)
      .then(function() {
        debug('after:checkoutStarter');
        if (commandOptions.skipGit === false) {
          return gitInit.run(commandOptions, rawArgs);
        }
      })
      .then(function() {
        if (!commandOptions.skipNpm) {
          return npmInstall.run({
            verbose: commandOptions.verbose,
            optional: false
          });
        }
      });
  }
});
