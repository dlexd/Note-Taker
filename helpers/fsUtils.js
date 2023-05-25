const fs = require('fs').promises;

const readFromFile = (filePath) => {
  return fs.readFile(filePath, 'utf8');
};

const writeToFile = (filePath, data) => {
  return fs.writeFile(filePath, JSON.stringify(data, null, 2));
};

const readAndAppend = (dataToAppend, filePath) => {
  return fs.readFile(filePath, 'utf8')
    .then((existingData) => {
      let newData = [];

      if (existingData) {
        newData = JSON.parse(existingData);
      }

      newData.push(dataToAppend);

      return fs.writeFile(filePath, JSON.stringify(newData, null, 2), 'utf8');
    });
};

module.exports = { readFromFile, writeToFile, readAndAppend };
