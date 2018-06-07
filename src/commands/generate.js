import program from 'commander';
import chalk from 'chalk';
import Generate from '../tasks/generate';
import getMernConfig from '../tasks/getMernConfig';

program
    .description('Generate components, routes, controllers, models using mern generator')
    .arguments('<generator> [args]')
    .parse(process.argv);

/**
 * Generate string output for a single blueprint
 * @param blueprint
 */
const printBlueprint = (blueprint) => {
    console.log(`    ${chalk.yellow(blueprint.name)} - ${blueprint.description}`);
    console.log(`    Usage: ${blueprint.usage}`);
    console.log('');
};

program.on('--help', () => {
    // Get available blueprints from the current mern project
    const { blueprints } = getMernConfig().blueprints;
    console.log(chalk.yellow('Available Generators'));
    console.log(chalk.yellow('____________________'));
    console.log('');

    blueprints.forEach(b => printBlueprint(b));
});

if (!program.args.length) {
    program.help();
}

new Generate([...program.args]).run();
