'use strict';

// Runs `npm install` in cwd

var NpmTask = require('./npm-task');

module.exports = NpmTask.extend({
  command: 'install',
  options: {
    'save-dev': true,
    'packages': ["mern-cli"],
  },
  startProgressMessage: 'Installing the mern-cli tool via npm',
  completionMessage: 'Installed mern-cli tool via npm.'
});
