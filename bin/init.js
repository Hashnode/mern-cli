#!/usr/bin/env node

var program = require('commander');
var chalk = require('chalk');
require('shelljs/global');

program
.description('Create a MERN app in current directory!')
.option('-i, --init [type]', 'Init a new mern boilerplate')
.parse(process.argv);


if (!which('git')) {
  echo(chalk.red('Sorry, this script requires git'));
  exit(1);
}



if(program.init) {
 if(test('-d', program.init)) {
   echo(chalk.red(program.init+ ' already exits! Please choose some another name!!!'));
   exit(1);
 }
 
 mkdir('-p', program.init);
 cd(program.init);
 exec('git init');
 echo('Fetching the boilerplate...')
 var e = exec('git pull https://github.com/Hashnode/mern-starter.git');
 if(e.code !== 0) {
   echo(chalk.red('Error! Try again'));
   exit(1);
 }
 echo(chalk.green('Completed.....You are good to go!'));
}