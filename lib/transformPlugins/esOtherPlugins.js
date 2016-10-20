'use strict';

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getRightPluginItem = require('../utils').getRightPluginItem;

exports.EVAL = 'transform-eval';
exports.OBJECT_ASSIGN = 'transform-object-assign';
exports.REGENERATOR = 'transform-regenerator';
exports.TRANSFORM_RUNTIME = 'transform-runtime';
exports.STRICT_MODE = 'transform-strict-mode';
exports.ASYNC_FUNCTIONS = 'syntax-async-functions';

(0, _keys2.default)(exports).forEach(function (k) {
  exports[k] = getRightPluginItem(exports[k]);
});

exports.REGENERATOR_RUNTIME = 'regenerator-runtime';