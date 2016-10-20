'use strict';

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var es2015F = require('./esFeatures/es2015Features');
var es2016F = require('./esFeatures/es2016Features');
var es2017F = require('./esFeatures/es2017Features');
var esExperF = require('./esFeatures/esExperimentalFeatures');

function getNodeShippedFeatureArr(v) {
  var f = {};
  f[es2015F.ARROW] = 1;
  f[es2015F.CLASS] = 1;
  f[es2015F.OBJECT_LITERALS] = 1;
  f[es2015F.TEMPLATE_LITERALS] = 1;
  f[es2015F.DESTRUCTURING] = 1;
  f[es2015F.DEFAULT_PARAMETERS] = 1;
  f[es2015F.REST_PARAMETERS] = 1;
  f[es2015F.SPREAD_OPERATOR] = 1;
  f[es2015F.LET] = 1;
  f[es2015F.CONST] = 1;
  f[es2015F.ITERATORS_FOR_OF] = 1;
  f[es2015F.GENERATORS] = 1;
  f[es2015F.UNICODE_STRING_LITERALS] = 1;
  f[es2015F.MODULES] = 0;
  f[es2015F.MODULE_LOADERS] = 0;
  f[es2015F.OBJECT_SUPER] = 1;
  f[es2015F.BINARY_OCTAL_LITERALS] = 1;
  f[es2015F.UNICODE_REGEX] = 1;
  f[es2015F.STICKY_REGEX] = 1;
  f[es2015F.TYPEOF_SYMBOL] = 1;
  f[es2015F.FUNCTION_NAME] = 1;
  f[es2015F.BLOCK_LEVEL_FUNCTION] = 1;
  f[es2016F.EXPONENTIATION_OPERATOR] = 0;
  f[es2017F.ASYNC] = 0;
  f[es2017F.TRAILING_FUNCTION_COMMAS] = 0;
  f[esExperF.DECORATOR] = 0;
  f[esExperF.OBJECT_REST_SPREAD] = 0;
  f[esExperF.DO_EXPRESSION] = 0;
  f[esExperF.FUNCTION_DOUBLE_COLON_BIND] = 0;
  f[esExperF.CLASS_PROPERTIES] = 0;

  return (0, _keys2.default)(f).filter(function (k) {
    return !!f[k];
  });
}

module.exports = getNodeShippedFeatureArr;