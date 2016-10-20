'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var es2015Cases = require('./es2015Cases');
var es2016Cases = require('./es2016Cases');
var es2017Cases = require('./es2017Cases');
var esExperCases = require('./esExperimentalCases');

module.exports = (0, _extends3.default)({}, es2015Cases, es2016Cases, es2017Cases, esExperCases);