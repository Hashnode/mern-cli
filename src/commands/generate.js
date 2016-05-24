import program from 'commander';

program
    .description('Generate components, routes, controllers, models using mern generator')
    .command('dumb [component_name]', 'Generate a dumb component')
    .command('functional [component_name]', 'Generate a functional component')
    .command('container [component_name]', 'Generate a container component')
    .command('model [model_name]', 'Generate a mongoose model')
    .command('fullstack [component_name]', 'Generate a dumb component, controller and mongoose model')
    .parse(process.argv);

if (!program.args.length) {
    program.help();
}
