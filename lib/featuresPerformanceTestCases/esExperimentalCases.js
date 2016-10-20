'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _module$exports;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var esExperF = require('../esFeatures/esExperimentalFeatures');

module.exports = (_module$exports = {}, (0, _defineProperty3.default)(_module$exports, esExperF.CLASS_PROPERTIES, {
        desc: 'Class properties presents two related proposals: "class instance fields" and "class static fields"',
        exec: function exec() {/*
                               function feature() {
                               class Bork {
                               //Property initializer syntax
                               instanceProperty = "bork";
                               boundFunction = () => {
                               return this.instanceProperty;
                               }
                               //Static class properties
                               static staticProperty = "babeliscool";
                               static staticFunction = function() {
                               return Bork.staticProperty;
                               }
                               }
                               let myBork = new Bork;
                               myBork.boundFunction.call(undefined);
                               Bork.staticFunction();
                               }
                               function transform() {
                               "use strict";
                               function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
                               var Bork = function Bork() {
                               var _this = this;
                               _classCallCheck(this, Bork);
                               this.instanceProperty = "bork";
                               this.boundFunction = function () {
                               return _this.instanceProperty;
                               };
                               }
                               //Property initializer syntax
                               //Static class properties
                               ;
                               Bork.staticProperty = "babeliscool";
                               Bork.staticFunction = function () {
                               return Bork.staticProperty;
                               };
                               var myBork = new Bork();
                               myBork.boundFunction.call(undefined);
                               Bork.staticFunction();
                               }
                               */}
}), (0, _defineProperty3.default)(_module$exports, esExperF.DECORATOR, {
        desc: 'Decorators make it possible to annotate and modify classes and properties at design time.',
        exec: function exec() {/*
                               function feature() {
                               @isTestable(true)
                               class C {
                               @enumerable(false)
                               method() {}
                               }
                               function isTestable(value) {
                               return function decorator(target) {
                               target.isTestable = value;
                               }
                               }
                               function enumerable(value) {
                               return function(target, key, descriptor) {
                               descriptor.enumerable = value;
                               return descriptor;
                               }
                               }
                               }
                               function transform() {
                               "use strict";
                               var _getOwnPropertyDescriptor = require("babel-runtime/core-js/object/get-own-property-descriptor");
                               var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);
                               var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");
                               var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
                               var _createClass2 = require("babel-runtime/helpers/createClass");
                               var _createClass3 = _interopRequireDefault(_createClass2);
                               var _dec, _dec2, _class, _desc, _value, _class2;
                               function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
                               function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
                               var desc = {};
                               Object['ke' + 'ys'](descriptor).forEach(function (key) {
                               desc[key] = descriptor[key];
                               });
                               desc.enumerable = !!desc.enumerable;
                               desc.configurable = !!desc.configurable;
                               if ('value' in desc || desc.initializer) {
                               desc.writable = true;
                               }
                               desc = decorators.slice().reverse().reduce(function (desc, decorator) {
                               return decorator(target, property, desc) || desc;
                               }, desc);
                               if (context && desc.initializer !== void 0) {
                               desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
                               desc.initializer = undefined;
                               }
                               if (desc.initializer === void 0) {
                               Object['define' + 'Property'](target, property, desc);
                               desc = null;
                               }
                               return desc;
                               }
                               var C = (_dec = isTestable(true), _dec2 = enumerable(false), _dec(_class = (_class2 = function () {
                               function C() {
                               (0, _classCallCheck3.default)(this, C);
                               }
                               (0, _createClass3.default)(C, [{
                               key: "method",
                               value: function method() {}
                               }]);
                               return C;
                               }(), (_applyDecoratedDescriptor(_class2.prototype, "method", [_dec2], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, "method"), _class2.prototype)), _class2)) || _class);
                               function isTestable(value) {
                               return function decorator(target) {
                               target.isTestable = value;
                               };
                               }
                               function enumerable(value) {
                               return function (target, key, descriptor) {
                               descriptor.enumerable = value;
                               return descriptor;
                               };
                               }
                               }
                               */}
}), (0, _defineProperty3.default)(_module$exports, esExperF.OBJECT_REST_SPREAD, {
        desc: 'rest properties for object destructuring assignment and spread properties for object literals',
        exec: function exec() {/*
                               var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
                               function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
                               function feature() {
                               let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
                               let n = { x, y, ...z };
                               return x === 1 && y === 2 && z.a === 3 && z.b === 4 && n.x === 1 && n.b === 4;
                               }
                               function transform() {
                               var _x$y$a$b = { x: 1, y: 2, a: 3, b: 4 };
                               var x = _x$y$a$b.x;
                               var y = _x$y$a$b.y;
                               var z = _objectWithoutProperties(_x$y$a$b, ["x", "y"]);
                               var n = _extends({ x: x, y: y }, z);
                               return x === 1 && y === 2 && z.a === 3 && z.b === 4 && n.x === 1 && n.b === 4;
                               }
                               */}
}), (0, _defineProperty3.default)(_module$exports, esExperF.DO_EXPRESSION, {
        desc: 'do { ... } expression executes a block',
        exec: function exec() {/*
                               function feature() {
                               let x = 100;
                               let y = 20;
                               let a = do {
                               if(x > 10) {
                               if(y > 20) {
                               'big x, big y';
                               } else {
                               'big x, small y';
                               }
                               } else {
                               if(y > 10) {
                               'small x, big y';
                               } else {
                               'small x, small y';
                               }
                               }
                               };
                               var c, d;
                               c = do {
                               if (true) {
                               d = 4 + 38;
                               }
                               };
                               }
                               function transform() {
                               'use strict';
                               var x = 100;
                               var y = 20;
                               var a = x > 10 ? y > 20 ? 'big x, big y' : 'big x, small y' : y > 10 ? 'small x, big y' : 'small x, small y';
                               var c, d;
                               c = true ? d = 4 + 38 : void 0;
                               }
                               */}
}), (0, _defineProperty3.default)(_module$exports, esExperF.FUNCTION_DOUBLE_COLON_BIND, {
        desc: 'operator (::) performs this binding and method extraction.',
        exec: function exec() {/*
                               function feature() {
                               var box = {
                               weight: 2,
                               getWeight() { return this.weight; },
                               };
                               var { getWeight } = box;
                               box.getWeight();
                               var bigBox = { weight: 10 };
                               var a = bigBox::getWeight();
                               function add(val) { return this + val; }
                               var c = bigBox::getWeight()::add(5);
                               }
                               function transform() {
                               "use strict";
                               var _context;
                               var box = {
                               weight: 2,
                               getWeight: function getWeight() {
                               return this.weight;
                               }
                               };
                               var getWeight = box.getWeight;
                               box.getWeight();
                               var bigBox = { weight: 10 };
                               var a = getWeight.call(bigBox);
                               function add(val) {
                               return this + val;
                               }
                               var c = (_context = getWeight.call(bigBox), add).call(_context, 5);
                               }
                               */}
}), _module$exports);