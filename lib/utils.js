'use strict';

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var chalk = require('chalk');

function getRightPresetItemOrPluginItem(type, pn) {
  var prefix = 'babel-' + type + '-';
  var helper = function helper(p) {
    return !p || p.startsWith(prefix) ? p : prefix + p;
  };
  return typeof pn === 'string' ? helper(pn) : [helper(pn[0]), pn[1]];
}

exports.getRightPresetItem = function getRightPresetItem(presetName) {
  return getRightPresetItemOrPluginItem('preset', presetName);
};

exports.getRightPluginItem = function getRightPluginItem(pluginName) {
  return getRightPresetItemOrPluginItem('plugin', pluginName);
};

exports.exit = function exit(status) {
  status === undefined && (status = 1);
  process.exit(status);
};

function renderMsg(renderFn, args) {
  var ret = [];
  for (var i = 0, len = args.length; i < len; i++) {
    switch ((0, _typeof3.default)(args[i])) {
      case 'string':
      case 'number':
        ret[i] = renderFn(args[i]);
        break;
      case 'object':
        ret[i] = renderFn((0, _stringify2.default)(args[i], null, 2));
        break;
      default:
        ret[i] = args[i];
    }
  }

  return ret;
}

exports.log = {
  error: function error() {
    console.error.apply(console, renderMsg(chalk.red, arguments));
  },
  warn: function warn() {
    console.warn.apply(console, renderMsg(chalk.yellow, arguments));
  },
  info: function info() {
    console.info.apply(console, renderMsg(chalk.green, arguments));
  },
  log: function log() {
    console.log.apply(console, arguments);
  }
};

function toString(obj) {
  return Object.prototype.toString.call(obj);
}

exports.isArray = function (obj) {
  return Array.isArray ? Array.isArray(obj) : toString(obj) === '[object Array]';
};

exports.isFunction = function (obj) {
  return toString(obj) === '[object Function]';
};

exports.time = {
  _data: {},
  start: function start(label) {
    this._data[label] = new Date();
  },
  end: function end(label) {
    var t = this._data[label],
        r;
    if (t) {
      r = new Date().getTime() - t.getTime();
      delete this._data[label];
      return r;
    }
    return undefined;
  }
};