'use strict';

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getRightPluginItem = require('../utils').getRightPluginItem;

exports.REACT_CONSTANT_ELEMENTS = 'transform-react-constant-elements';
exports.REACT_DISPLAY_NAME = 'transform-react-display-name';

exports.REACT_INLINE_ELEMENTS = 'transform-react-inline-elements';
exports.REACT_JSX = 'transform-react-jsx';

(0, _keys2.default)(exports).forEach(function (k) {
  exports[k] = getRightPluginItem(exports[k]);
});