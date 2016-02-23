var program = require('commander');
var chalk = require('chalk');
var elegantSpinner = require('elegant-spinner');
var logUpdate = require('log-update');
var frame = elegantSpinner();
require('shelljs/global');

program
  .description('Create a MERN app in the current directory.')
  .parse(process.argv);

if (!which('git')) {
  console.log(chalk.red('Sorry, this script requires git.'));
  exit(1);
}

if (program.args.length > 1) {
  console.log(chalk.red('Please provide only one argument as a directory name.'));
  exit(1);
}

if (program.args.length === 1) {
  if (test('-d', program.args[0])) {
    console.log(chalk.red('The directory "' + program.args[0] + '" already exists. Please choose a different name.'));
    exit(1);
  }

  mkdir('-p', program.args[0]);
  cd(program.args[0]);
}

exec('git init');

var interval = setInterval(function () {
  logUpdate('Fetching the boilerplate...' + chalk.cyan.bold.dim(frame()));
}, 50)

var e = exec('git pull https://github.com/Hashnode/mern-starter.git', function (code, stdout, stderr) {
  clearInterval(interval);
  if (code !== 0) {
    console.log(chalk.red.bold('Error. Try again.'));
    exit(1);
  }

  console.log(chalk.green.bold('Completed. You are good to go!'));
});
