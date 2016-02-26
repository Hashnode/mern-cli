'use strict';

// Main entry point
var Project       = require('../models/project');
var requireAsHash = require('../utilities/require-as-hash');
var Command       = require('../models/command');
var commands      = requireAsHash('../commands/*.js', Command);
var Task          = require('../models/task');
var tasks         = requireAsHash('../tasks/*.js', Task);
var CLI           = require('./cli');
var packageConfig = require('../../package.json');
var debug         = require('debug')('mern-cli:cli/index');
var merge         = require('lodash/merge');
var path          = require('path');

var version      = packageConfig.version;
var name         = packageConfig.name;
var trackingCode = packageConfig.trackingCode;

// Options: Array cliArgs, Stream inputStream, Stream outputStream
module.exports = function(options) {
  var UI = options.UI || require('../ui');
  var Yam = options.Yam || require('yam');

  // TODO: one UI (lib/models/project.js also has one for now...)
  var ui = new UI({
    inputStream:  options.inputStream,
    outputStream: options.outputStream,
    errorStream:  options.errorStream || process.stderr,
    ci:           process.env.CI || /^(dumb|emacs)$/.test(process.env.TERM),
    writeLevel:   ~process.argv.indexOf('--silent') ? 'ERROR' : undefined
  });

  var config = new Yam('mern-cli', {
    primary: Project.getProjectRoot()
  });

  var defaultUpdateCheckerOptions = {
    checkForUpdates: false
  };

  var cli = new CLI({
    ui:        ui,
    testing:   options.testing,
    name: options.cli ? options.cli.name : 'mern',
    disableDependencyChecker: options.disableDependencyChecker,
    root: options.cli ? options.cli.root : path.resolve(__dirname, '..', '..'),
    npmPackage: options.cli ? options.cli.npmPackage : 'mern-cli'
  });

  var project = Project.projectOrnullProject(ui, cli);

  var environment = {
    tasks:    tasks,
    cliArgs:  options.cliArgs,
    commands: commands,
    project:  project,
    settings: merge(defaultUpdateCheckerOptions, config.getAll())
  };

  return cli.run(environment);
};
