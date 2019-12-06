// https://github.com/nickewing/line-reader
const lineReader = require('line-reader');
const csv = require('csvtojson')
const helpers = require('./helpers');
const fs = require('fs');
const FILE_PATH = './csv/file.csv';
const NEW_FILE_PATH = './csv/new-file.csv';
const SEPARATOR = ',';
let index = 1;

const newFile = fs.createWriteStream(NEW_FILE_PATH, {
  flags: 'w'
})

function writeJSONLineToCSVFile(json) {
  const line = Object.values(json).join(SEPARATOR);
  newFile.write(line + "\n");
}

lineReader.eachLine(FILE_PATH, function(line) {
  if (index === 1) {
    headers = line.split(SEPARATOR);
  }

  csv({ output: 'json', noheader: true, headers: headers })
  .fromString(line)
  .then(json =>  writeJSONLineToCSVFile(json.pop()));

  if (!line) {
    return false;
  }

  index++;
});

console.log('## New csv file is created! ##');
