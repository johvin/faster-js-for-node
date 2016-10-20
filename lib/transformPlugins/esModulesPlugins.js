'use strict';

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getRightPluginItem = require('../utils').getRightPluginItem;

exports.MODULES_AMD = 'transform-es2015-modules-amd';
exports.MODULES_COMMONJS = 'transform-es2015-modules-commonjs';
exports.MODULES_SYSTEMJS = 'transform-es2015-modules-systemjs';
exports.MODULES_UMD = 'transform-es2015-modules-umd';

(0, _keys2.default)(exports).forEach(function (k) {
  exports[k] = getRightPluginItem(exports[k]);
});