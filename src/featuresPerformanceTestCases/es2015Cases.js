var es2015F = require('../esFeatures/es2015Features');

module.exports = {
  [es2015F.ARROW]: {
    desc: 'arrow functions',
    exec: function() {/*
      var arr = [2, 990, 200, 71, -23, 89.11, 90187.77, -5, 7];

      function transform() {
        arr.map(function (v) {
          return v + 1;
        });
      }

      function feature() {
        arr.map(v => v + 1);
      }
    */}
  },
  [es2015F.CLASS]: {
    desc: 'class',
    exec: function() {/*
      function feature() {
        class b {
          constructor(x) {
            this.y = x + 1;
          }
        }
        class a extends b {
          constructor(x) {
            super(x);
            this.x = x;
          }
          get() {
            return this.x + this.y;
          }
        }

        new a(1).get()
        new a(20).get()
      }

      function transform() {
        "use strict";

        var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

        function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

        function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

        function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

        var b = function b(x) {
          _classCallCheck(this, b);

          this.y = x + 1;
        };

        var a = function (_b) {
          _inherits(a, _b);

          function a(x) {
            _classCallCheck(this, a);

            var _this = _possibleConstructorReturn(this, (a.__proto__ || Object.getPrototypeOf(a)).call(this, x));

            _this.x = x;
            return _this;
          }

          _createClass(a, [{
            key: "get",
            value: function get() {
              return this.x + this.y;
            }
          }]);

          return a;
        }(b);

        new a(1).get();
        new a(20).get();
      }
    */}
  },
  [es2015F.OBJECT_LITERALS]: {
    desc: 'enhanced object literals, including shorthand properties, computed properties, __proto__',
    exec: function() {/*
      function feature() {
        var handler = function() {};
        var theProtoObj = {};
        var obj = {
          __proto__: theProtoObj,
          handler,
          [ 'prop_' + (() => 42)() ]: 42
        };
      }

      function transform() {
        'use strict';
        function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

        var handler = function handler() {};
        var theProtoObj = {};
        var obj = _defineProperty({
          __proto__: theProtoObj,
          handler: handler
        }, 'prop_' + function () {
          return 42;
        }(), 42);
      }
    */}
  },
  [es2015F.TEMPLATE_LITERALS]: {
    desc: 'template literals except tagged template literals',
    exec: function() {/*
      var a = 'a', b = 'b', c = 3, d = [4];

      function feature() {
        return `a:${a} b:${b} c:${c} d:${d}`
      }

      function transform() {
        return 'a:' + a + ' b:' + b + ' c:' + c + ' d:' + d
      }
    */}
  },
  [es2015F.DESTRUCTURING]: {
    desc: 'destructuring in declarations, assignment, parameters',
    exec: function() {/*
      function feature() {
        var [a, , [b], c, { d }, [e]] = [5, null, [6], , {d: 8}, 'abc'];
        var t = a === 5 && b === 6 && c === undefined && d === 8 && e === 'a';
        var qux = "corge";
        !function({ [qux]: grault }) {
          return grault === "garply";
        }({ corge: "garply" });
      }

      function transform() {
        'use strict';
        var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

        var _ref = [5, null, [6],, { d: 8 }, 'abc'];
        var a = _ref[0];

        var _ref$ = _slicedToArray(_ref[2], 1);

        var b = _ref$[0];
        var c = _ref[3];
        var d = _ref[4].d;

        var _ref$2 = _slicedToArray(_ref[5], 1);

        var e = _ref$2[0];

        var t = a === 5 && b === 6 && c === undefined && d === 8 && e === 'a';
        var qux = "corge";
        !function (_ref2) {
          var grault = _ref2[qux];

          return grault === "garply";
        }({ corge: "garply" });
      }
    */}
  },
  [es2015F.DEFAULT_PARAMETERS]: {
    desc: 'default function paramters',
    exec: function() {/*
      function feature() {
        (function (a = 1, b = 2) { return a === 1 && b === 3; }(undefined, 3));
        !function({c, x:d, e}) {
          return c === 7 && d === 8 && e === undefined;
        }({c:7, x:8});
      }

      function transform() {
        "use strict";

        (function () {
          var a = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];
          var b = arguments.length <= 1 || arguments[1] === undefined ? 2 : arguments[1];
          return a === 1 && b === 3;
        })(undefined, 3);
        !function (_ref) {
          var c = _ref.c;
          var d = _ref.x;
          var e = _ref.e;

          return c === 7 && d === 8 && e === undefined;
        }({ c: 7, x: 8 });
      }
    */}
  },
  [es2015F.REST_PARAMETERS]: {
    desc: 'rest paramters',
    exec: function() {/*
      function feature() {
        !function f(x, ...y) {
          return x * y.length;
        }(3, "hello", true);
      }

      function transform() {
        "use strict";
        !function f(x) {
          return x * (arguments.length <= 1 ? 0 : arguments.length - 1);
        }(3, "hello", true);
        !function f(x, y, z) {
          return x + y + z;
        }.apply(undefined, [1, 2, 3]);
      }
    */}
  },
  [es2015F.SPREAD_OPERATOR]: {
    desc: 'spread (...) operator',
    exec: function() {/*
      function feature() {
        return Math.max(...[1,2,3]) === 3;
      }

      function transform() {
        "use strict";
        return Math.max.apply(Math, [1, 2, 3]) === 3;
      }
    */}
  },
  [es2015F.LET]: {
    desc: 'let',
    exec: function() {/*
      function feature() {
        let bar = 123;
        { let bar = 456; }
        for(let bar = 0; false;) {}
        bar === 123;
      }

      function transform() {
        "use strict";

        var bar = 123;
        {
          var _bar = 456;
        }
        for (var _bar2 = 0; false;) {}
        bar === 123;
      }
    */}
  },
  [es2015F.CONST]: {
    desc: 'const variable',
    exec: function() {/*
      function feature() {
        const a = 1;
        const b = '1';
        const c = true;
        const d = {};
        const e = [];
        d.name = 'test';
      }

      function transform() {
        'use strict';

        var a = 1;
        var b = '1';
        var c = true;
        var d = {};
        var e = [];
        d.name = 'test';
      }
    */}
  },
  [es2015F.ITERATORS_FOR_OF]: {
    desc: 'for of loops',
    exec: function() {/*
      function feature() {
        var arr = [5, 8, 20, -2, 7];
        var cnt = 0;
        for(var item of arr) {
          if ( item > 7 ) cnt++;
        }
      }

      function transform() {
        "use strict";
        var arr = [5, 8, 20, -2, 7];
        var cnt = 0;
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = arr[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var item = _step.value;

            if (item > 7) cnt++;
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }
    */}
  },
  [es2015F.GENERATORS]: {
    desc: 'generator/yield',
    exec: function() {/*
      !global._babelPolyfill && require('babel-polyfill');

      function feature() {
        function * generator(){
          yield 5; yield 6;
        };
        var iterator = generator();
        var item = iterator.next();
        var passed = item.value === 5 && item.done === false;
        item = iterator.next();
        passed    &= item.value === 6 && item.done === false;
        item = iterator.next();
        passed    &= item.value === undefined && item.done === true;
      }

      function transform() {
        "use strict";
        var _marked = [generator].map(regeneratorRuntime.mark);

        function generator() {
          return regeneratorRuntime.wrap(function generator$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return 5;

                case 2:
                  _context.next = 4;
                  return 6;

                case 4:
                case "end":
                  return _context.stop();
              }
            }
          }, _marked[0], this);
        };
        var iterator = generator();
        var item = iterator.next();
        var passed = item.value === 5 && item.done === false;
        item = iterator.next();
        passed &= item.value === 6 && item.done === false;
        item = iterator.next();
        passed &= item.value === undefined && item.done === true;
      }
    */}
  },
  // not support in node 6.5.0 util now
  // and this feature can not be tested
  [es2015F.MODULES]: {
    desc: 'language-level support for modules for component definition.',
    promise: function() {/*
      var fs = require('fs');
      var Promise = require('bluebird');
      var path = require('path');
      var featureFilePath = path.resolve(__dirname, './.tmp.f.js');
      var transformFilePath = path.resolve(__dirname, './.tmp.t.js');
      var f = fs.createWriteStream(featureFilePath);
      var t = fs.createWriteStream(transformFilePath);

      var pf = new Promise((resolve, reject) => {
        f.on('finish', () => {
          resolve();
        });
        f.on('error', err => {
          reject(err);
        });
        f.end(`
          // this file is created by 'faster-es-for-node', and can be deleted manually.
          import * as m from 'Math';
          export * from 'path';
          export var e = m.E;
          export default function(x) {
              return m.log(x);
          }
          var pi = m.PI;
          var floor = m.floor;
          export {
            pi,
            floor
          }
        `);
      });

      var pt = new Promise((resolve, reject) => {
        t.on('finish', () => {
          resolve();
        });
        t.on('error', err => {
          reject(err);
        });
        t.end(`
          // this file is created by 'faster-es-for-node', and can be deleted manually.
          'use strict';

          Object.defineProperty(exports, "__esModule", {
            value: true
          });
          exports.floor = exports.pi = exports.e = undefined;

          var _path = require('path');

          Object.keys(_path).forEach(function (key) {
            if (key === "default" || key === "__esModule") return;
            Object.defineProperty(exports, key, {
              enumerable: true,
              get: function get() {
                return _path[key];
              }
            });
          });

          exports.default = function (x) {
            return m.log(x);
          };

          var _Math = require('Math');

          var m = _interopRequireWildcard(_Math);

          function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

          var e = exports.e = m.E;

          var pi = m.PI;
          var floor = m.floor;
          exports.pi = pi;
          exports.floor = floor;
        `);
      });

      function requireUnchached(module) {
        delete require.cache[require.resolve(module)];
        return require(module);
      }

      function feature() {
        return requireUnchached(featureFilePath);
      }

      function transform() {
        return requireUnchached(transformFilePath);
      }

      function done() {
        try {
          fs.unlinkSync(featureFilePath);
          fs.unlinkSync(transformFilePath);
        } catch(e) {}
      }

      return Promise.all([
        pf,
        pt
      ]).then(() => ({
          feature: feature,
          transform: transform,
          done: done
      }));
    */}
  },
  //
  // this feature can not be tested now.
  // [es2015F.MODULE_LOADERS]: {
  // }
  [es2015F.OBJECT_SUPER]: {
    desc: 'super in object method',
    exec: function() {/*
      function feature() {
        function A() {}
        A.prototype.sayHi = function() {
          return 'Hi';
        };
        A.prototype.type = 'test';

        var obj = {
          __proto__: new A(),
          hello () {
            return super.sayHi();
          },
          toString () {
            return A.name + '-' + super.type;
          }
        };

        obj.hello()
        obj.toString()
      }

      function transform() {
        'use strict';
        var _obj;

        var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

        function A() {}
        A.prototype.sayHi = function () {
          return 'Hi';
        };
        A.prototype.type = 'test';

        var obj = _obj = {
          __proto__: new A(),
          hello: function hello() {
            return _get(Object.getPrototypeOf(_obj), 'sayHi', this).call(this);
          },
          toString: function toString() {
            return A.name + '-' + _get(Object.getPrototypeOf(_obj), 'type', this);
          }
        };

        obj.hello();
        obj.toString();
      }
    */}
  },
  [es2015F.BINARY_OCTAL_LITERALS]: {
    desc: 'octal and binary literals',
    exec: function() {/*
      function feature() {
        return 0o10 === 8 && 0b101 === 5 && Number('0o23') === 19 && Number('0b10') === 2;
      }

      function transform() {
        'use strict';
        return 8 === 8 && 5 === 5 && Number('0o23') === 19 && Number('0b10') === 2;
      }
    */}
  },
  [es2015F.UNICODE_REGEX]: {
    desc: 'regexp u (unicode) flag',
    exec: function() {/*
      function feature() {
        return "𝌆".match(/\u{1d306}/u)[0].length === 2 && "ſ".match(/S/iu) && "S".match(/ſ/iu);
      }

      function transform() {
        "use strict";
        return "𝌆".match(/(?:\uD834\uDF06)/)[0].length === 2 && "ſ".match(/[S\u017F]/i) && "S".match(/[S\u017F]/i);
      }
    */}
  },
  [es2015F.STICKY_REGEX]: {
    desc: 'regexp y (sticky) flag',
    exec: function() {/*
      function feature() {
        var str = '#afoo';
        var re = /\w/y;

        re.lastIndex = 0
        re.exec(str)
        re.exec(str)
        re.lastIndex = 1;
        re.test(str);
        // console.log(re.lastIndex)
        re.test(str)
        // console.log(re.lastIndex)
        re.test(str)
        // console.log(re.lastIndex)
        re.test(str)
        // console.log(re.lastIndex)
        re.test(str)
      }

      function transform() {
        'use strict';
        var str = '#afoo';
        var re = new RegExp('\\w', 'y');

        re.lastIndex = 0;
        re.exec(str);
        re.exec(str);
        re.lastIndex = 1;
        re.test(str);
        // console.log(re.lastIndex)
        re.test(str);
        // console.log(re.lastIndex)
        re.test(str);
        // console.log(re.lastIndex)
        re.test(str);
        // console.log(re.lastIndex)
        re.test(str);
      }
    */}
  },
  [es2015F.UNICODE_STRING_LITERALS]: {
    desc: 'unicode code point escapes in string',
    exec: function() {/*
      function feature(){
        return '\u{1d306}' == '\ud834\udf06';
      }

      function transform() {
        return '𝌆' == '𝌆';
      }
    */}
  },
  [es2015F.TYPEOF_SYMBOL]: {
    desc: 'typeof support in Symbol',
    res: true
  },
  [es2015F.FUNCTION_NAME]: {
    desc: 'function "name" property',
    exec: function() {/*
      function feature() {
        function foo(){};
        var o = {
          foo(){},
          hei: function() {},
          bar: function baz(){}
        };
        o.qux = function(){};

        return foo.name === 'foo'
          && (function(){}).name === ''
          && o.foo.name === "foo"
          && o.hei.name === 'hei'
          && o.bar.name === "baz"
          && o.qux.name === ""
          && (new Function).name === "anonymous";
      }

      function transform() {
        'use strict';
        function foo() {};
        var o = {
          foo: function foo() {},
          hei: function hei() {}, bar: function baz() {} };
        o.qux = function () {};

        return foo.name === 'foo' && function () {}.name === '' && o.foo.name === "foo" && o.hei.name === 'hei' && o.bar.name === "baz" && o.qux.name === "" && new Function().name === "anonymous";
      }
    */}
  },
  // only available in non-strict mode
  // and the transformed code's behaviours
  // are different in sloppy mode and strict mode
  // so can't be test
  [es2015F.BLOCK_LEVEL_FUNCTION]: {
    desc: 'block level function only available in sloppy mode',
    ignore: true
  }
};
