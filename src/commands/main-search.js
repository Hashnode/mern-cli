import program from 'commander';
import chalk from 'chalk';
import Table from 'cli-table';
import variants from '../../variants.json';

program
    .parse(process.argv);

if (!program.args.length) {
    program.help();
}

if (program.args.length > 1) {
    console.log(chalk.red('Please give only one argument as a search term!!!'));
    process.exit(1);
}

const input = program.args[0];
const variantsTable = new Table({
    head: ['Name', 'Description', 'Author'],
});
const filteredVariants = variants.filter(variant => variant.name.toLowerCase().search(input.toLowerCase()) !== -1 || variant.description.toLowerCase().search(input.toLowerCase()) !== -1);

variantsTable.push(...filteredVariants.map(v => Object.keys(v).map((k) => v[k]).slice(0, 3)));

console.log(chalk.yellow(`Search results for ${input}`));
console.log(chalk.yellow('-------------'));
console.log(variantsTable.toString());
console.log(chalk.yellow('For more info, execute "mern info <variant_name>"'));

process.exit(0);
