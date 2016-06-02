import program from 'commander';
import Generate from '../tasks/generate';

program
    .action(() => {
        new Generate(['fullstack', ...program.args]).run();
    })
    .parse(process.argv);

if (!program.args.length) {
    program.help();
}
