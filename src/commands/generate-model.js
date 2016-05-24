import program from 'commander';
import Generate from '../tasks/generate';

program
    .action(() => {
        new Generate().run(['model', ...program.args]);
    })
    .parse(process.argv);

if (!program.args.length) {
    program.help();
}
