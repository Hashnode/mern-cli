import program from 'commander';
import chalk from 'chalk';
import Table from 'cli-table';
import variants from '../../variants.json';

program
    .parse(process.argv);

if (!program.args.length) {
    program.help();
}

if (program.args.length < 1) {
    console.log(chalk.red('Please provide the variant name!!!'));
    process.exit(1);
}

// Check whether the given variant is available or not
const selectedVariant = variants.filter(variant => variant.name === program.args[0])[0];
if (!selectedVariant) {
    console.log(chalk.red.bold(`${program.args[0]} is not a valid MERN variant. Execute 'mern list' to list available variants`));
    process.exit(1);
}

// Process the variants json file into an array
const selectedVariantArr = Object.keys(selectedVariant).map((k) => {
    const obj = {};
    obj[k.charAt(0).toUpperCase() + k.slice(1)] = selectedVariant[k];
    return obj;
});

// Show all the variants in a table
const variantsTable = new Table();
variantsTable.push(...selectedVariantArr);
console.log(variantsTable.toString());
process.exit(0);
