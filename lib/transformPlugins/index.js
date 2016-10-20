'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var es2015Plugins = require('./es2015Plugins');
var es2016Plugins = require('./es2016Plugins');
var es2017Plugins = require('./es2017Plugins');
var esModulesPlugins = require('./esModulesPlugins');
var esExperPlugins = require('./esExperimentalPlugins');
var reactPlugins = require('./reactPlugins');
var esOtherPlugins = require('./esOtherPlugins');

module.exports = (0, _extends3.default)({}, es2015Plugins, es2016Plugins, es2017Plugins, esModulesPlugins, esExperPlugins, reactPlugins, esOtherPlugins);