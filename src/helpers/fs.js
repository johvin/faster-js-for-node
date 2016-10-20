var fs = require('fs');
var Promise = require('bluebird');

exports.readFileAsync = (filepath) => new Promise((resolve, reject) => {
  try {
    fs.readFile(filepath, 'utf8', (err, data) => err ? reject(err) : resolve(data));
  } catch (e) {
    reject(e);
  }
});