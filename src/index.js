!global._babelPolyfill && require('babel-polyfill');
var path = require('path');
var semver = require('semver');
var utils = require('./utils');
var log = utils.log;
var exit = utils.exit;
var main = require('./main');

// check support node versions
function checkNodeV() {
  var nodeV = process.versions.node;

  if ( semver.lt(nodeV, '4.0.0') ) {
    try {
      throw new Error('Node version must be equal or greater than 4.0.0');
    } catch (e) {
      log.error(e.message);
    }
    exit();
  }
}

// load babel from .babelrc config file
function loadBabelrc(prjRoot) {
  var babelrc = path.join(prjRoot, '.babelrc');
  try {
    var config = require(babelrc);
    return config;
  } catch(e) {
    log.error('error occurs when load babelrc:', e.message);
    exit();
  }
}

// the entry of this package
// return a promise
function entry(options) {
  options || (options = {});
  options.prjRoot || ( options.prjRoot = process.cwd() );
  // 暂时去掉 configFile 的功能
  // options.configFile = options.configFile || false;
  typeof options.babelrc === 'undefined' && ( options.babelrc = true );

  checkNodeV();
  if ( options.babelrc ) {
    var config = loadBabelrc(options.prjRoot);
    options.presets = config.presets;
    options.plugins = config.plugins;
  }
  if ( !utils.isArray( options.presets ) || !utils.isArray( options.plugins ) ) {
    log.error('babelrc 配置格式错误！ Honey, be careful!')
    exit();
  }

  // main return a promise
  return main(options);
}

module.exports = entry;
