'use strict';

var testCases = require('./featuresPerformanceTestCases');
var Promise = require('bluebird');
var utils = require('./utils');
var log = utils.log;
var time = utils.time;

function getTestCode(fn) {
  return fn.toString().replace(/^[^/*]+\/\*/, '').replace(/\*\/[^*]+$/, '').replace(/\n/g, '');
}

function commonTestCodeFunc() {
  /*
    var N = 10000, i = 0;
  
    var transformT, featureT;
  
    time.start('transform');
    while ( i++ < N ) {
      transform();
    }
    transformT = time.end('transform');
  
    i = 0;
    time.start('feature');
    while ( i++ < N ) {
      feature();
    }
    featureT = time.end('feature');
  
    try {
      done();
    } catch(e) {}
  
    return {
      transform: transformT,
      feature: featureT
    };
  */
  1;
}

function dealTestResults(feature, res) {
  var v = global.verbose;
  var pass = res.feature < 5 && res.feature - res.transform < 3 || res.feature <= res.transform * 1.1;
  if (pass) {
    v && log.info('FEATURE: ', feature);
    v && log.info('time:');
    v && log.info('  feature:', res.feature);
    v && log.info('  transform:', res.transform);
  } else {
    v && log.error('FEATURE: ', feature);
    v && log.error('time:');
    v && log.error('  feature:', res.feature);
    v && log.error('  transform:', res.transform);
  }
  return pass;
}

function runInSandBox(fn) {
  try {
    return fn.apply(null, Array.prototype.slice.call(arguments, 1));
  } catch (e) {
    throw e;
  }
}

function startTest(shippedFeaturesArr) {
  var results = {};
  var commonTestCode = getTestCode(commonTestCodeFunc);
  var tasks = [];

  shippedFeaturesArr.forEach(function (feature) {
    var task = new Promise(function (resolve, reject) {
      var testCase = testCases[feature];

      try {
        if (!testCase || 'ignore' in testCase && testCase['ignore']) {

          results[feature] = false;
          resolve();
          return;
        }

        if ('res' in testCase) {
          results[feature] = testCase['res'];
          resolve();
          return;
        }

        if ('exec' in testCase) {
          var testCode = getTestCode(testCase['exec']) + commonTestCode;
          var testFunc = new Function('require', 'time', testCode);
          var res = runInSandBox(testFunc, require, time);
          results[feature] = dealTestResults(feature, res);
          resolve();
          return;
        }

        if ('promise' in testCase) {
          var testCode = getTestCode(testCase['promise']);
          var promiseFunc = new Function('require', testCode);

          var testFunc = new Function('feature', 'transform', 'done', 'time', commonTestCode);

          runInSandBox(promiseFunc, require).then(function (funs) {
            var res = runInSandBox(testFunc, funs.feature, funs.transform, funs.done, time);
            results[feature] = dealTestResults(feature, res);
            resolve();
          });
        } else {
          results[feature] = false;
          resolve();
        }
      } catch (e) {
        log.error('error occurs when test feature: ', feature);
        log.error('error:', e.stack);
        log.error('testCase', testCase);
        reject(e);
      }
    });

    tasks.push(task);
  });

  return Promise.all(tasks).then(function () {
    return results;
  });
}

module.exports = startTest;