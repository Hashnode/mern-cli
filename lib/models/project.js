'use strict';

/**
@module mern-cli
*/
var Promise            = require('../ext/promise');
var path               = require('path');
var findup             = Promise.denodeify(require('findup'));
var resolve            = Promise.denodeify(require('resolve'));
var fs                 = require('fs');
var existsSync         = require('exists-sync');
var find               = require('lodash/find');
var assign             = require('lodash/assign');
var merge              = require('lodash/merge');
var debug              = require('debug')('mern-cli:project');
var UI                 = require('../ui');
var nodeModulesPath    = require('node-modules-path');
var getPackageBaseName = require('../utilities/get-package-base-name');
var versionUtils       = require('../utilities/version-utils');
var mernCLIVersion    = versionUtils.mernCLIVersion;

/**
  The Project model is tied to your package.json. It is instiantiated
  by giving Project.closest the path to your project.

  @class Project
  @constructor
  @param {String} root Root directory for the project
  @param {Object} pkg  Contents of package.json
*/
function Project(root, pkg, ui, cli) {
  debug('init root: %s', root);
  this.root          = root;
  this.pkg           = pkg;
  this.ui            = ui;
  this.cli           = cli;
  this.liveReloadFilterPatterns = [];
  this.setupNodeModulesPath();
  this._watchmanInfo = {
    enabled: false,
    version: null,
    canNestRoots: false
  };
}

/**
  Set when the `Watcher.detectWatchman` helper method finishes running,
  so that other areas of the system can be aware that watchman is being used.

  For example, this information is used in the broccoli build pipeline to know
  if we can watch additional directories (like bower_components) "cheaply".

  Contains `enabled` and `version`.

  @private
  @property _watchmanInfo
  @returns {Object}
  @default false
*/

Project.prototype.hasDependencies = function() {
  return !!this.nodeModulesPath;
};
/**
  Sets the path to the node_modules directory for this
  project.

  @private
  @method setupNodeModulesPath
 */
Project.prototype.setupNodeModulesPath = function(){
  this.nodeModulesPath = nodeModulesPath(this.root);
  debug('nodeModulesPath: %s', this.nodeModulesPath);
};

var processCwd = process.cwd();
// ensure NULL_PROJECT is a singleton
var NULL_PROJECT;

Project.nullProject = function (ui, cli) {
  if (NULL_PROJECT) { return NULL_PROJECT; }

  NULL_PROJECT = new Project(processCwd, {}, ui, cli);

  NULL_PROJECT.isMernCLIProject = function() {
    return false;
  };

  NULL_PROJECT.isMernCLIAddon = function() {
    return false;
  };

  NULL_PROJECT.name = function() {
    return path.basename(process.cwd());
  };

  return NULL_PROJECT;
};

/**
  Returns the name from package.json.

  @private
  @method name
  @return {String} Package name
 */
Project.prototype.name = function() {
  return getPackageBaseName(this.pkg.name);
};

/**
  Returns whether or not this is an Mern CLI project.
  This checks whether mern-cli is listed in devDependencies.

  @private
  @method isMernCLIProject
  @return {Boolean} Whether this is an Mern CLI project
 */
Project.prototype.isMernCLIProject = function() {
  return (this.cli ? this.cli.npmPackage : 'mern-cli') in this.dependencies();
};

/**
  Returns the path to the configuration.

  @private
  @method configPath
  @return {String} Configuration path
 */
Project.prototype.configPath = function() {
  var configPath = 'config';

  return path.join(configPath, 'environment');
};

/**
  Loads the configuration for this project.

  @private
  @method config
  @param  {String} env Environment name
  @return {Object}     Merged confiration object
 */
Project.prototype.config = function(env) {
  var configPath = this.configPath();

  if (existsSync(path.join(this.root, configPath + '.js'))) {
    var appConfig = this.require('./' + configPath)(env);

    return appConfig;
  } else {
    return this.getAddonsConfig(env, {});
  }
};

/**
  Returns whether or not the given file name is present in this project.

  @private
  @method has
  @param  {String}  file File name
  @return {Boolean}      Whether or not the file is present
 */
Project.prototype.has = function(file) {
  return existsSync(path.join(this.root, file)) || existsSync(path.join(this.root, file + '.js'));
};

/**
  Resolves the absolute path to a file.

  @private
  @method resolve
  @param  {String} file File to resolve
  @return {String}      Absolute path to file
 */
Project.prototype.resolve = function(file) {
  return resolve(file, {
    basedir: this.root
  });
};

/**
  Resolves the absolute path to a file synchronously

  @private
  @method resolveSync
  @param  {String} file File to resolve
  @return {String}      Absolute path to file
 */
Project.prototype.resolveSync = function(file) {
  return resolve.sync(file, {
    basedir: this.root
  });
};

/**
  Calls `require` on a given module.

  @private
  @method require
  @param  {String} file File path or module name
  @return {Object}      Imported module
 */
Project.prototype.require = function(file) {
  if (/^\.\//.test(file)) { // Starts with ./
    return require(path.join(this.root, file));
  } else {
    return require(path.join(this.nodeModulesPath, file));
  }
};


Project.prototype.mernCLIVersion = mernCLIVersion;

/**
  Returns the dependencies from a package.json

  @private
  @method dependencies
  @param  {Object}  pkg            Package object. If false, the current package is used.
  @param  {Boolean} excludeDevDeps Whether or not development dependencies should be excluded, defaults to false.
  @return {Object}                 Dependencies
 */
Project.prototype.dependencies = function(pkg, excludeDevDeps) {
  pkg = pkg || this.pkg || {};

  var devDependencies = pkg['devDependencies'];
  if (excludeDevDeps) {
    devDependencies = {};
  }

  return assign({}, devDependencies, pkg['dependencies']);
};

/**
  Path to the blueprints for this project.

  @private
  @method localBlueprintLookupPath
  @return {String} Path to blueprints
 */
Project.prototype.localBlueprintLookupPath = function() {
  return path.join(this.root, 'blueprints');
};

/**
  Returns a list of paths where blueprints will be looked up.

  @private
  @method blueprintLookupPaths
  @return {Array} List of paths
 */
Project.prototype.blueprintLookupPaths = function() {
  if (this.isMernCLIProject()) {
    var lookupPaths = [this.localBlueprintLookupPath()];

    return lookupPaths;
  } else {
    return [];
  }
};

/**
  Reloads package.json

  @private
  @method reloadPkg
  @return {Object} Package content
 */
Project.prototype.reloadPkg = function() {
  var pkgPath = path.join(this.root, 'package.json');

  // We use readFileSync instead of require to avoid the require cache.
  this.pkg = JSON.parse(fs.readFileSync(pkgPath, { encoding: 'utf-8' }));

  return this.pkg;
};

/**
  Returns a new project based on the first package.json that is found
  in `pathName`.

  @private
  @static
  @method closest
  @param  {String} pathName Path to your project
  @return {Promise}         Promise which resolves to a {Project}
 */
Project.closest = function(pathName, _ui, _cli) {
  var ui = ensureUI(_ui);
  return closestPackageJSON(pathName)
    .then(function(result) {
      debug('closest %s -> %s', pathName, result);
      if (result.pkg && result.pkg.name === 'mern-cli') {
        return Project.nullProject(_ui, _cli);
      }

      return new Project(result.directory, result.pkg, ui, _cli);
    })
    .catch(function(reason) {
      handleFindupError(pathName, reason);
    });
};

/**
  Returns a new project based on the first package.json that is found
  in `pathName`.

  @private
  @static
  @method closestSync
  @param  {String} pathName Path to your project
  @param  {UI} _ui The UI instance to provide to the created Project.
  @return {Project}         Project instance
 */
Project.closestSync = function(pathName, _ui, _cli) {
  var ui = ensureUI(_ui);
  var directory, pkg;

  if (_cli && _cli.testing) {
    directory = existsSync(path.join(pathName, 'package.json')) && process.cwd();
    if (!directory) {
      if (pathName.indexOf(path.sep) > -1){
        directory = findupPath(pathName);
      } else {
        pkg = {name: 'mern-cli'};
      }
    }
  } else {
    directory = findupPath(pathName);
  }
  if (!pkg) {
    pkg = JSON.parse(fs.readFileSync(path.join(directory, 'package.json')));
  }

  debug('dir' + directory);
  debug('pkg: %s', pkg);
  if (pkg && pkg.name === 'mern-cli') {
    return Project.nullProject(_ui, _cli);
  }

  debug('closestSync %s -> %s', pathName, directory);
  return new Project(directory, pkg, ui, _cli);
};

/**
  Returns a new project based on the first package.json that is found
  in `pathName`, or the nullProject.

  The nullProject signifies no-project, but abides by the null object pattern

  @private
  @static
  @method projectOrnullProject
  @param  {UI} _ui The UI instance to provide to the created Project.
  @return {Project}         Project instance
 */
Project.projectOrnullProject = function(_ui, _cli) {
  try {
    return Project.closestSync(process.cwd(), _ui, _cli);
  } catch(reason) {
    if (reason instanceof Project.NotFoundError) {
      return Project.nullProject(_ui, _cli);
    } else {
      throw reason;
    }
  }
};

/**
  Returns the project root based on the first package.json that is found

  @return {String} The project root directory
 */
Project.getProjectRoot = function () {
  try {
    var directory = findup.sync(process.cwd(), 'package.json');
    var pkg = require(path.join(directory, 'package.json'));

    if (pkg && pkg.name === 'mern-cli') {
      debug('getProjectRoot: named \'mern-cli\'. Will use cwd: %s', process.cwd());
      return process.cwd();
    }

    debug('getProjectRoot %s -> %s', process.cwd(), directory);
    return directory;
  } catch(reason) {
    if (isFindupError(reason)) {
      debug('getProjectRoot: not found. Will use cwd: %s', process.cwd());
      return process.cwd();
    } else{
      throw reason;
    }
  }
};

function NotFoundError(message) {
  this.name = 'NotFoundError';
  this.message = message;
  this.stack = (new Error()).stack;
}

NotFoundError.prototype = Object.create(Error.prototype);
NotFoundError.prototype.constructor = NotFoundError;

Project.NotFoundError = NotFoundError;

function ensureUI(_ui) {
  var ui = _ui;

  if (!ui) {
    // TODO: one UI (lib/cli/index.js also has one for now...)
    ui = new UI({
      inputStream:  process.stdin,
      outputStream: process.stdout,
      ci:           process.env.CI || /^(dumb|emacs)$/.test(process.env.TERM),
      writeLevel:   ~process.argv.indexOf('--silent') ? 'ERROR' : undefined
    });
  }

  return ui;
}

function closestPackageJSON(pathName) {
  return findup(pathName, 'package.json')
    .then(function(directory) {
      return Promise.hash({
        directory: directory,
        pkg: require(path.join(directory, 'package.json'))
      });
    });
}

function findupPath(pathName) {
  try {
    return findup.sync(pathName, 'package.json');
  } catch(reason) {
    handleFindupError(pathName, reason);
  }
}

function isFindupError(reason) {
  // Would be nice if findup threw error subclasses
  return reason && /not found/i.test(reason.message);
}

function handleFindupError(pathName, reason) {
  if (isFindupError(reason)) {
    throw new NotFoundError('No project found at or up from: `' + pathName + '`');
  } else {
    throw reason;
  }
}

// Export
module.exports = Project;
