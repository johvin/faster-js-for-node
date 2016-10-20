var chalk = require('chalk');

function getRightPresetItemOrPluginItem(type, pn) {
  const prefix = `babel-${type}-`;
  const helper = p => !p || p.startsWith(prefix) ? p : ( prefix + p );
  return typeof pn === 'string' ?
    helper(pn) :
    [ helper(pn[0]), pn[1] ];
}

exports.getRightPresetItem = function getRightPresetItem(presetName) {
  return getRightPresetItemOrPluginItem('preset', presetName);
}

exports.getRightPluginItem = function getRightPluginItem(pluginName) {
  return getRightPresetItemOrPluginItem('plugin', pluginName);
}

// exit process
exports.exit = function exit(status) {
  status === undefined && ( status = 1 );
  process.exit(status);
};

// petty render various type of arguments
function renderMsg(renderFn, args) {
  var ret = [];
  for(var i = 0, len = args.length; i < len; i++) {
    switch(typeof args[i]) {
      case 'string':
      case 'number':
        ret[i] = renderFn(args[i]);
        break;
      case 'object':
        ret[i] = renderFn(JSON.stringify(args[i], null, 2))
        break;
      default:
        ret[i] = args[i];
    }
  }

  return ret;
}

// custom log util using chalk to add color highlight
exports.log = {
  error: function () {
    console.error.apply(console, renderMsg(chalk.red, arguments));
  },
  warn: function () {
    console.warn.apply(console, renderMsg(chalk.yellow, arguments));
  },
  info: function () {
    console.info.apply(console, renderMsg(chalk.green, arguments));
  },
  log: function() {
    console.log.apply(console, arguments);
  }
};

function toString(obj) {
  return Object.prototype.toString.call(obj);
}

exports.isArray = function (obj) {
  return Array.isArray ? Array.isArray(obj) : toString(obj) === '[object Array]';
}

exports.isFunction = function(obj) {
  return toString(obj) === '[object Function]';
}

// simple time util to calc a certain time period
exports.time = {
  _data: {},
  start: function start(label) {
    this._data[label] = new Date();
  },
  end: function end(label) {
    var t = this._data[label], r;
    if ( t ) {
      r = new Date().getTime() - t.getTime();
      delete this._data[label];
      return r;
    }
    return undefined;
  }
};
