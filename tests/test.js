import test from 'ava';
import path from 'path';
import childProcess from 'child_process';
import pify from 'pify';

const exec = pify(childProcess.exec);


test('shows help on --help', async t => {
	const stdout = await exec('../bin/init.js --help');
	t.is(stdout.trim(), 'Usage: init [options]\n\n  Create a MERN app in current directory!\n\n  Options:\n\n    -h, --help  output usage information');
});


test('shows help on --h', async t => {
	const stdout = await exec('../bin/init.js --help');
	t.is(stdout.trim(), 'Usage: init [options]\n\n  Create a MERN app in current directory!\n\n  Options:\n\n    -h, --help  output usage information');
});


