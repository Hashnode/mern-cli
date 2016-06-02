import program from 'commander';
import chalk from 'chalk';
import Table from 'cli-table';
import variants from '../../variants.json';

program
    .parse(process.argv);

const variantsTable = new Table({
    head: ['Name', 'Description', 'Author'],
});

variantsTable.push(...variants.map(v => Object.keys(v).map((k) => v[k]).slice(0, 3)));

console.log(chalk.yellow('MERN Variants'));
console.log(chalk.yellow('-------------'));
console.log(variantsTable.toString());
console.log(chalk.yellow('For more info, execute "mern info <variant_name>"'));

process.exit(0);
