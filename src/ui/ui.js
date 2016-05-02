var chalk = require('chalk');
var elegantSpinner = require('elegant-spinner');
var logUpdate = require('log-update');
var DEFAULT_WRITE_LEVEL = 'INFO';
var EOL = require('os').EOL;

function UI(options) {
  this.inputStream  = options.inputStream || process.stdin;
  this.outputStream = options.outputStream || process.stdout;
  this.errorStream  = options.errorStream || process.stderr;
  this.writeLevel = 'INFO'
}

UI.prototype.write = function(data, writeLevel) {
  if (writeLevel === 'ERROR') {
    this.errorStream.write(data + EOL);
  } else if (this.writeLevelVisible(writeLevel)) {
    this.outputStream.write(data);
  }
};

UI.prototype.writeError = function(error) {
  this.write(chalk.red(error), 'ERROR');
};

UI.prototype.writeDebugLine = function(data) {
  this.writeLine(chalk.gray(data), 'DEBUG');
};

UI.prototype.writeInfoLine = function(data) {
  this.writeLine(chalk.cyan(data), 'INFO');
};

UI.prototype.writeLevelVisible = function(writeLevel) {
  var levels = this.WRITE_LEVELS;
  writeLevel = writeLevel || DEFAULT_WRITE_LEVEL;
  return levels[writeLevel] >= levels[this.writeLevel];
};


UI.prototype.writeLine = function(data, writeLevel) {
  this.write(data + EOL, writeLevel);
};


UI.prototype.WRITE_LEVELS = {
  'DEBUG': 1,
  'INFO': 2,
  'WARNING': 3,
  'ERROR': 4
};

module.exports = UI;
