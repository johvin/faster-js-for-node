'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _module$exports;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var es2017F = require('../esFeatures/es2017Features');

module.exports = (_module$exports = {}, (0, _defineProperty3.default)(_module$exports, es2017F.ASYNC, {
  desc: 'async functions (async support, await support, arrow async functions)',
  exec: function exec() {/*
                         !global._babelPolyfill && require('babel-polyfill');
                         function feature() {
                         return (async () => 42 + await Promise.resolve(42))() instanceof Promise;
                         }
                         function transform() {
                         "use strict";
                         function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }
                         _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
                         return regeneratorRuntime.wrap(function _callee$(_context) {
                         while (1) {
                         switch (_context.prev = _context.next) {
                         case 0:
                         _context.next = 2;
                         return Promise.resolve(42);
                         case 2:
                         _context.t0 = _context.sent;
                         return _context.abrupt("return", 42 + _context.t0);
                         case 4:
                         case "end":
                         return _context.stop();
                         }
                         }
                         }, _callee, undefined);
                         }))() instanceof Promise;
                         }
                         */}
}), (0, _defineProperty3.default)(_module$exports, es2017F.TRAILING_FUNCTION_COMMAS, {
  desc: 'trailing commas in function syntax',
  exec: function exec() {/*
                         function feature() {
                         typeof function f( a, b, ){} === 'function';
                         Math.min(1,2,3,) === 1;
                         }
                         function transform() {
                         typeof function f(a, b) {} === 'function';
                         Math.min(1, 2, 3) === 1;
                         }
                         */}
}), _module$exports);