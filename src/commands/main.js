import program from 'commander';
import pjson from '../../package.json';

program
    .version(pjson.version)
    .option('-v, --version', 'check version')
    .description('Initialize a MERN powered project')
    .command('init [name]', 'Initialize a MERN project.')
    //.command('list', 'List MERN variants')
    //.command('search [term]', 'Search for MERN variant')
    //.command('info [term]', 'View details of a MERN variant')
    .parse(process.argv);

if (!program.args.length) {
    program.help();
}
