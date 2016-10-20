var testCases = require('./featuresPerformanceTestCases');
var Promise = require('bluebird');
var utils = require('./utils');
var log = utils.log;
var time = utils.time;

// 获取测试代码
function getTestCode(fn) {
  return fn.toString().replace(/^[^/*]+\/\*/, '').replace(/\*\/[^*]+$/, '').replace(/\n/g, '');
}

// 测试代码后面需要添加的部分代码
// 用于控制测试代码运行的次数并统计时间
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
1;// if remove '1', then the transformed code by babel is incorrent
}

// 测试结果通过的标准需满足如下两个条件之一：
// 1. feature 时间在 5ms 内，且超过 transform 的时间不多于 3ms
// 2. feature 的时间不大于 1.1 倍的 transform 时间
function dealTestResults(feature, res) {
  var v = global.verbose;
  var pass = (res.feature < 5 && (res.feature - res.transform < 3) ) || (res.feature <= res.transform * 1.1);
  if ( pass ) {
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
  } catch(e) {
    throw e;
  }
}

// start to exec test code
// including 4 conditions:
// exec: exec code is sync functions
// promise: exec code return promise
// res: already have a result
// ignore: can not test
//
// 返回一个 promise 的结果
function startTest(shippedFeaturesArr) {
  var results = {};
  var commonTestCode = getTestCode(commonTestCodeFunc);
  var tasks = [];

  shippedFeaturesArr.forEach(function(feature) {
    var task = new Promise(function(resolve, reject) {
      var testCase = testCases[feature];

      try {
        if (!testCase || ('ignore' in testCase && testCase['ignore']) ) {

          results[feature] = false;
          resolve();
          return;
        }

        if ( 'res' in testCase ) {
          results[feature] = testCase['res'];
          resolve();
          return;
        }

        if ( 'exec' in testCase ) {
          var testCode = getTestCode(testCase['exec']) + commonTestCode;
          var testFunc = new Function(
            'require',
            'time',
            testCode
          );
          var res = runInSandBox(
            testFunc,
            require,
            time
          );
          results[feature] = dealTestResults(feature, res);
          resolve();
          return;
        }

        if ( 'promise' in testCase ) {
          var testCode = getTestCode(testCase['promise']);
          var promiseFunc = new Function(
            'require',
            testCode
          );

          var testFunc = new Function(
            'feature',
            'transform',
            'done',
            'time',
            commonTestCode
          );

          runInSandBox(
            promiseFunc,
            require
          ).then(function(funs) {
            var res = runInSandBox(
              testFunc,
              funs.feature,
              funs.transform,
              funs.done,
              time
            );
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

  return Promise.all(tasks).then(() => results);
}

module.exports = startTest;
