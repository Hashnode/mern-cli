'use strict';

var UnknownCommand = require('../commands/unknown');

module.exports = function(commands, commandName, commandArgs, optionHash) {
  var options = optionHash || {};
  var project = options.project;
  var ui      = options.ui;

  function aliasMatches(alias) {
    return alias === commandName;
  }

  function findCommand(commands, commandName) {
    for (var key in commands) {
      var command = commands[key];

      var name = command.prototype.name;
      var aliases = command.prototype.aliases || [];

      if (name === commandName || aliases.some(aliasMatches)) {
        return command;
      }
    }
  }

  // Attempt to find command in ember-cli core commands
  var command = findCommand(commands, commandName);

  if(command) {
    return command;
  }

  // if we didn't find anything, return an "UnknownCommand"
  return UnknownCommand.extend({
    commandName: commandName
  });
};
