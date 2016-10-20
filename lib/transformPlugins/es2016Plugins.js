'use strict';

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getRightPluginItem = require('../utils').getRightPluginItem;

exports.ES2016_EXPONENTIATION_OPERATOR = 'transform-exponentiation-operator';

(0, _keys2.default)(exports).forEach(function (k) {
  exports[k] = getRightPluginItem(exports[k]);
});