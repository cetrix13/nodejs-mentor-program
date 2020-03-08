var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// https://github.com/nickewing/line-reader
const line_reader_1 = __importDefault(require("line-reader"));
const csvtojson_1 = __importDefault(require("csvtojson"));
const fs_1 = __importDefault(require("fs"));
const constants_js_1 = require("./constants.js");
let index = 1;
let headers = [];
const newFile = fs_1.default.createWriteStream(constants_js_1.NEW_FILE_PATH, {
    flags: 'w'
});
function writeJSONLineToCSVFile(json) {
    const line = Object.values(json).join(constants_js_1.SEPARATOR);
    newFile.write(`${line}\n`);
}
line_reader_1.default.eachLine(constants_js_1.FILE_PATH, line => {
    if (index === 1) {
        headers = line.split(constants_js_1.SEPARATOR);
    }
    csvtojson_1.default({ output: 'json', noheader: true, headers })
        .fromString(line)
        .then(json => writeJSONLineToCSVFile(json.pop()));
    index++;
});
console.log('## New csv file is created! ##');
//# sourceMappingURL=task_1_2.js.map