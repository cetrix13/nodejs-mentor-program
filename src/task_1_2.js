// https://github.com/nickewing/line-reader
import lineReader from 'line-reader';
import csv from 'csvtojson';
import fs from 'fs';
import { FILE_PATH, SEPARATOR, NEW_FILE_PATH } from './constants.js';

let index = 1;
let headers = [];

const newFile = fs.createWriteStream(NEW_FILE_PATH, {
    flags: 'w'
});

function writeJSONLineToCSVFile(json) {
    const line = Object.values(json).join(SEPARATOR);
    newFile.write(`${line}\n`);
}

lineReader.eachLine(FILE_PATH, line => {
    if (index === 1) {
        headers = line.split(SEPARATOR);
    }

    csv({ output: 'json', noheader: true, headers })
        .fromString(line)
        .then(json =>  writeJSONLineToCSVFile(json.pop()));

    if (!line) {
        return false;
    }

    index++;
});

console.log('## New csv file is created! ##');
