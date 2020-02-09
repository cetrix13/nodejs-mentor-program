// https://nodejs.org/api/readline.html
import readline from 'readline';
import { reversedStr } from './helpers';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('## Press ctrl-C or ctrl-D to end transmision ##');

rl.on('line', input => console.log(reversedStr(input)));
