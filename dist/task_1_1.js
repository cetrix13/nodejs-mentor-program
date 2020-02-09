const __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { 'default': mod };
};
Object.defineProperty(exports, '__esModule', { value: true });
// https://nodejs.org/api/readline.html
const readline_1 = __importDefault(require('readline'));
const helpers_1 = require('./helpers');
const rl = readline_1.default.createInterface({
    input: process.stdin,
    output: process.stdout
});
console.log('## Press ctrl-C or ctrl-D to end transmision ##');
rl.on('line', input => console.log(helpers_1.reversedStr(input)));
// # sourceMappingURL=task_1_1.js.map
