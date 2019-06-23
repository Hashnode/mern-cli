import program from 'commander';
import pjson from '../../package.json';
import chalk from 'chalk';

const availableCommands = ['init', 'list', 'search', 'info'];

program
    .version(pjson.version)
    .option('-v, --version', 'check version')
    .description('Initialize a MERN powered project')
    .command('init [name]', 'Initialize a MERN project.')
    .command('list', 'List MERN variants')
    .command('search [term]', 'Search for MERN variant')
    .command('info [term]', 'View details of a MERN variant')
    .arguments('<command>')
  .parse(process.argv);

if (program.args.length >= 1) {
	if (!availableCommands.includes(program.args[0])) {
		program.outputHelp()
    	console.log(`  ` + chalk.red(`\n  Unknown command ${chalk.yellow(program.args[0])}.`))
		console.log()
	}
}  

if (!program.args.length) {
    program.help();
}
