'use strict';

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getRightPluginItem = require('../utils').getRightPluginItem;

exports.ASYNC_TO_MODULE_METHOD = 'transform-async-to-module-method';

exports.CLASS_CONSTRUCTOR_CALL = 'transform-class-constructor-call';
exports.CLASS_PROPERTIES = 'transform-class-properties';
exports.DECORATORS = 'transform-decorators';
exports.DECORATORS_LEGACY = 'transform-decorators-legacy';
exports.DO_EXPRESSIONS = 'transform-do-expressions';
exports.EXPORT_EXTENSIONS = 'transform-export-extensions';
exports.FUNCTION_BIND = 'transform-function-bind';
exports.OBJECT_REST_SPREAD = 'transform-object-rest-spread';

exports.ASYNC_GENERATORS = 'syntax-async-generators';
exports.FUNCTION_SENT = 'syntax-function-sent';

(0, _keys2.default)(exports).forEach(function (k) {
  exports[k] = getRightPluginItem(exports[k]);
});