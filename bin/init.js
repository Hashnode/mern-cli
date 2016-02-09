#!/usr/bin/env node

var program = require('commander');
var chalk = require('chalk');
var elegantSpinner = require('elegant-spinner');
var logUpdate = require('log-update');
var frame = elegantSpinner();
require('shelljs/global');

program
.description('Create a MERN app in current directory!')
.option('-i, --init [name]', 'Init a new mern boilerplate')
.parse(process.argv);


if (!which('git')) {
  console.log(chalk.red('Sorry, this script requires git'));
  exit(1);
}

if(! program.init) {
  console.log(chalk.cyan('Please pass correct options or type --help or -h for help!'));
  exit(1);
}


if(program.init && program.init !== true) {
 if(test('-d', program.init)) {
   console.log(chalk.red(program.init+ ' already exits! Please choose some another name!!!'));
   exit(1);
 }
 
   mkdir('-p', program.init);
   cd(program.init);
 }
 exec('git init');
 
 var interval = setInterval(function() {
   logUpdate("Fetching the boilerplate..." + chalk.cyan.bold(frame()));
 }, 50)
 
 var e = exec('git pull https://github.com/Hashnode/mern-starter.git', function(code, stdout, stderr) {
   clearInterval(interval);
   if(code !== 0) {
     console.log(chalk.red.bold('Error! Try again'));
     exit(1);
   }
   console.log(chalk.green.bold('Completed.....You are good to go!'));
 });
 
