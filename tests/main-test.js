import test from 'ava';
import childProcess from 'child_process';
import pify from 'pify';

const exec = pify(childProcess.exec);


test('shows help on --help', async t => {
    const stdout = await exec('../bin/main.js --help');
    t.is(stdout.trim(), `Usage: main [options] [command]


  Commands:

    init [name]    Initialize a MERN project.
    list           List MERN variants
    search [term]  Search for MERN variant
    info [term]    View details of a MERN variant
    help [cmd]     display help for [cmd]

  Initialize a MERN powered project

  Options:

    -h, --help     output usage information
    -V, --version  output the version number
    -v, --version  check version`);
});


test('shows help on --h', async t => {
    const stdout = await exec('../bin/main.js --help');
    t.is(stdout.trim(), `Usage: main [options] [command]


  Commands:

    init [name]    Initialize a MERN project.
    list           List MERN variants
    search [term]  Search for MERN variant
    info [term]    View details of a MERN variant
    help [cmd]     display help for [cmd]

  Initialize a MERN powered project

  Options:

    -h, --help     output usage information
    -V, --version  output the version number
    -v, --version  check version`);
});
