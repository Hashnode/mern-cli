import test from 'ava';
import childProcess from 'child_process';
import pify from 'pify';

const exec = pify(childProcess.exec);


test('shows help on --help', async (t) => {
    const stdout = await exec('./bin/mern.js --help');
    t.is(stdout.trim(), `Usage: mern [options] [command]

  Initialize a MERN powered project

  Options:

    -V, --version  output the version number
    -v, --version  check version
    -h, --help     output usage information

  Commands:

    init [name]    Initialize a MERN project.
    list           List MERN variants
    search [term]  Search for MERN variant
    info [term]    View details of a MERN variant
    help [cmd]     display help for [cmd]`);
});
