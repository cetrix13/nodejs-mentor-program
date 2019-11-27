// https://nodejs.org/api/readline.html
const readline = require('readline');
const helpers = require('./helpers');
const reversedStr = helpers.reversedStr;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('## Press ctrl-C or ctrl-D to end transmision ##');


rl.on('line', (input) => {
  const result = reversedStr(input);
  console.log(result);
});
