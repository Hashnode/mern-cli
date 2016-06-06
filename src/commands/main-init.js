import program from 'commander';
import chalk from 'chalk';
import elegantSpinner from 'elegant-spinner';
import logUpdate from 'log-update';
import variants from '../../variants.json';
require('shelljs/global');

const frame = elegantSpinner();

program
    .description('Create a MERN app in current directory!')
    .option('-t, --target [name]', 'Initialize the project with a variant [mern-starter]', 'mern-starter')
    .parse(process.argv);

if (!which('git')) {
    console.log(chalk.red('Sorry, this script requires git'));
    exit(1);
}

if (program.args.length > 1) {
    console.log(chalk.red('Please give only one argument as a directory name!!!'));
    exit(1);
}

if (program.args.length === 1) {
    if (test('-d', program.args[0])) {
        console.log(chalk.red(`${program.args[0]} directory already exits! Please choose some another name!!!`));
        exit(1);
    }

    mkdir('-p', program.args[0]);
    cd(program.args[0]);
}

// Check whether the given variant is available or not
const selectedVariant = variants.filter(variant => variant.name === program.target)[0];
if (!selectedVariant) {
    console.log(chalk.red.bold(`${program.variant} is not a valid MERN variant. Execute 'mern list' to list available variants`));
    exit(1);
}

exec('git init');

const interval = setInterval(() => {
    logUpdate(`Fetching the boilerplate...${chalk.cyan.bold.dim(frame())}`);
}, 50);

// Pull the corresponding variant into the given folder
exec(`git pull ${selectedVariant.git} ${selectedVariant['git-branch']}`, (code) => {
    clearInterval(interval);
    logUpdate.clear();
    if (code !== 0) {
        console.log(chalk.red.bold('Error! Try again'));
        exit(1);
    }
    console.log(chalk.green.bold('Completed.....You are good to go!'));
});
