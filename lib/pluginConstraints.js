'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _module$exports;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var transP = require('./transformPlugins');

module.exports = (_module$exports = {}, (0, _defineProperty3.default)(_module$exports, transP.DECORATORS, ['remove']), (0, _defineProperty3.default)(_module$exports, transP.DECORATORS_LEGACY, [['shouldBefore', transP.CLASS_PROPERTIES]]), (0, _defineProperty3.default)(_module$exports, transP.OBJECT_REST_SPREAD, [['require', transP.ES2015_DESTRUCTURING]]), (0, _defineProperty3.default)(_module$exports, transP.ES2015_DESTRUCTURING, [['require', transP.ES2015_PARAMETERS]]), (0, _defineProperty3.default)(_module$exports, transP.ES2015_PARAMETERS, [['require', transP.ES2015_DESTRUCTURING]]), (0, _defineProperty3.default)(_module$exports, transP.REGENERATOR, [['require', [transP.ASYNC_FUNCTIONS, transP.REGENERATOR_RUNTIME]]]), (0, _defineProperty3.default)(_module$exports, transP.ES2015_CONSTANTS, [['require', transP.ES2015_BLOCK_SCOPING]]), (0, _defineProperty3.default)(_module$exports, transP.ES2015_PARAMETERS, [['require', transP.ES2015_BLOCK_SCOPING]]), _module$exports);