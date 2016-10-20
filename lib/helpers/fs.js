'use strict';

var fs = require('fs');
var Promise = require('bluebird');

exports.readFileAsync = function (filepath) {
  return new Promise(function (resolve, reject) {
    try {
      fs.readFile(filepath, 'utf8', function (err, data) {
        return err ? reject(err) : resolve(data);
      });
    } catch (e) {
      reject(e);
    }
  });
};