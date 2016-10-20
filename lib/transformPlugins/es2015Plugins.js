'use strict';

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getRightPluginItem = require('../utils').getRightPluginItem;

exports.ES2015_ARROW = 'transform-es2015-arrow-functions';
exports.ES2015_BLOCK_SCOPED_FUNCTIONS = 'transform-es2015-block-scoped-functions';
exports.ES2015_BLOCK_SCOPING = 'transform-es2015-block-scoping';
exports.ES2015_CLASSES = 'transform-es2015-classes';
exports.ES2015_COMPUTED_PROPERTIES = 'transform-es2015-computed-properties';
exports.ES2015_CONSTANTS = 'check-es2015-constants';
exports.ES2015_DESTRUCTURING = 'transform-es2015-destructuring';
exports.ES2015_DUPLICATE_KEYS = 'transform-es2015-duplicate-keys';
exports.ES2015_FOR_OF = 'transform-es2015-for-of';
exports.ES2015_FUNCTION_NAME = 'transform-es2015-function-name';
exports.ES2015_LITERALS = 'transform-es2015-literals';
exports.ES2015_OBJECT_SUPER = 'transform-es2015-object-super';
exports.ES2015_PARAMETERS = 'transform-es2015-parameters';
exports.ES2015_SHORTHAND_PROPERTIES = 'transform-es2015-shorthand-properties';
exports.ES2015_SPREAD = 'transform-es2015-spread';
exports.ES2015_STICKY_REGEX = 'transform-es2015-sticky-regex';
exports.ES2015_TEMPLATE_LITERALS = 'transform-es2015-template-literals';
exports.ES2015_TYPEOF_SYMBOL = 'transform-es2015-typeof-symbol';
exports.ES2015_UNICODE_REGEX = 'transform-es2015-unicode-regex';

(0, _keys2.default)(exports).forEach(function (k) {
  exports[k] = getRightPluginItem(exports[k]);
});