'use strict';

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getRightPluginItem = require('../utils').getRightPluginItem;

exports.ES2017_ASYNC_TO_GENERATOR = 'transform-async-to-generator';
exports.ES2017_TRAILING_FUNCTION_COMMAS = 'syntax-trailing-function-commas';

(0, _keys2.default)(exports).forEach(function (k) {
  exports[k] = getRightPluginItem(exports[k]);
});