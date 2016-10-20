'use strict';

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _mapPluginAndFeature = require('./mapPluginAndFeature');

var _test = require('./test');

var _test2 = _interopRequireDefault(_test);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getNodeShippedFeatureArr = require('./getNodeShippedFeatureArr');
var myRequire = require('./require');
var utils = require('./utils');
var exit = utils.exit;
var log = utils.log;
var getRightPresetItem = utils.getRightPresetItem;
var getRightPluginItem = utils.getRightPluginItem;
var pluginConstraints = require('./pluginConstraints');


var nodeV = process.versions.node;
var configFilename = 'es4node.config.js';

var existConfigFile = false;
var existNodeConfig = false;

var config = [];

function checkIFExistConfig(config) {
  return config.filter(function (cfg) {
    return cfg.node === nodeV;
  }).filter(function (cfg) {
    var pr1 = config.presets;
    var pr2 = cfg.babel.presets;
    var pl1 = config.plugins;
    var pl2 = cfg.babel.plugins;

    if (pr1.length !== pr2.length || pl1.length !== pl2.length) {
      return false;
    }

    var len, i;
    for (i = 0, len = pr1.length; i < len; i++) {
      if (pr1[i] !== pr2[i]) {
        return false;
      }
    }

    for (i = 0, len = pl1.length; i < len; i++) {
      if (pl1[i] !== pl2[i]) {
        return false;
      }
    }

    return true;
  });
}

function checkConfigExist(options) {
  try {
    var configFilePath = require('path').join(options.prjRoot, configFilename);
    config = require(configFilePath);
    existConfigFile = true;
    var NodeConfig = checkIFExistConfig(config);

    if (existNodeConfig = NodeConfig.length > 0) {
      if (options.configFile) {
        log.info('es4node.config.js exits');
      }
      return NodeConfig[0];
    }
    return false;
  } catch (err) {
    if (err && err.code !== 'ENOENT') {
      log.error(err.stack);
      exit();
    }
    return false;
  }
}

function main(options) {
  var verbose = global.verbose = options.verbose || false;

  var transformPluginArr;

  var shippedFeatureArr;

  var transformFeatureArr;

  var transformShippedFeatureArr;

  var notTransformShippedFeatureArr;

  var transformUnshippedFeatureArr;

  var pluginArr = getBabelPluginArrFromConfig(options);

  transformPluginArr = getUniquePluginArr(pluginArr);

  verbose && log.info('transformPluginArr', transformPluginArr);

  transformFeatureArr = (0, _keys2.default)((0, _mapPluginAndFeature.pluginArrToFeaturesObj)(transformPluginArr));

  shippedFeatureArr = getNodeShippedFeatureArr(nodeV);

  transformShippedFeatureArr = transformFeatureArr.filter(function (f) {
    return shippedFeatureArr.includes(f);
  });
  notTransformShippedFeatureArr = shippedFeatureArr.filter(function (f) {
    return !transformFeatureArr.includes(f);
  });
  transformUnshippedFeatureArr = transformFeatureArr.filter(function (f) {
    return !shippedFeatureArr.includes(f);
  });

  verbose && log.info('transformShippedFeatureArr', transformShippedFeatureArr);
  verbose && log.info('notTransformShippedFeatureArr', notTransformShippedFeatureArr);
  verbose && log.info('transformUnshippedFeatureArr', transformUnshippedFeatureArr);

  return (0, _test2.default)(shippedFeatureArr).then(function (results) {
    verbose && log.info('results', results);
    var unpassFeatureArr = [];
    (0, _keys2.default)(results).forEach(function (f) {
      results[f] || unpassFeatureArr.push(f);
    });

    var unpassFeatureArrToPluginsObj = (0, _mapPluginAndFeature.featuresToPluginsObj)(unpassFeatureArr);

    var shippedFeatureArrToPluginsObj = (0, _mapPluginAndFeature.featuresToPluginsObj)(shippedFeatureArr);

    var recommendedPluginArr = [];
    var recommenedRemovePluginArr = [];

    function addPluginConstraint(plugin) {
      var p = typeof plugin === 'string' ? plugin : plugin[0];
      var constraintArr = pluginConstraints[p];
      constraintArr && constraintArr.forEach(function (constraint) {
        var type = typeof constraint === 'string' ? constraint : constraint[0];
        switch (type) {
          case 'require':
            addUniquePlugin(plugin);
            var arr = utils.isArray(constraint[1]) ? constraint[1] : [constraint[1]];
            arr.forEach(function (pl) {
              addUniquePlugin(pl) && pl in pluginConstraints && addPluginConstraint(pl);
            });
            break;
          case 'remove':
            recommenedRemovePluginArr.push(plugin);
            break;
          case 'shouldBefore':
            var index = recommendedPluginArr.indexOf(constraint[1]);
            if (index > -1) {
              recommendedPluginArr.splice(index, 0, plugin);
            } else {
              addUniquePlugin(plugin);
            }
            break;
          default:
            process.env.NODE_ENV !== 'production' && log.warn('unknown plugin constraint type: ' + type + '\nconstraint: ' + (0, _stringify2.default)(constraint, null, 2) + '\n');
        }
      });
    }

    function addUniquePlugin(plugin) {
      var p = typeof plugin === 'string' ? plugin : plugin[0];
      var index = recommendedPluginArr.findIndex(function (x) {
        return typeof x === 'string' ? x === p : x[0] === p;
      });
      if (index === -1) {
        recommendedPluginArr.push(plugin);
        return true;
      }
      return false;
    }

    transformPluginArr.forEach(function (plugin) {
      var p = typeof plugin === 'string' ? plugin : plugin[0];
      if (!(p in shippedFeatureArrToPluginsObj) || p in unpassFeatureArrToPluginsObj) {

        if (p in pluginConstraints) {
          addPluginConstraint(plugin);
        } else {
          recommendedPluginArr.push(plugin);
        }
      } else {
        recommenedRemovePluginArr.push(plugin);
      }
    });

    recommendedPluginArr = getUniquePluginArr(recommendedPluginArr);

    verbose && log.info('recommendedPluginArr', recommendedPluginArr);
    verbose && log.info('recommenedRemovePluginArr', recommenedRemovePluginArr);

    return {
      recommendedPluginArr: recommendedPluginArr,
      recommenedRemovePluginArr: recommenedRemovePluginArr
    };
  }).catch(function (err, testCode) {
    log.error('error occurs when test features:', err);
    log.error('testCode:', testCode);
    exit();
  });
}

function getUniquePluginArr(pluginArr) {
  var o = {};


  var ret = [],
      plugin,
      p;
  for (var len = pluginArr.length, i = len - 1; i >= 0; i--) {
    plugin = pluginArr[i];
    p = typeof plugin === 'string' ? plugin : plugin[0];
    if (p in o) continue;
    o[p] = 1;
    ret.unshift(plugin);
  }

  return ret;
}

function getBabelPluginArrFromConfig(config) {
  return getBabelPluginArrFromPreset({
    presets: config.presets || [],
    plugins: config.plugins || []
  }, config.prjRoot);
}

function getBabelPluginArrFromPreset(preset, prjDir) {
  function getPluginArrFromPreset(presetObj) {
    var arr = (presetObj.plugins || []).map(function (p) {
      return getRightPluginItem(p);
    });

    (presetObj.presets || []).reverse().forEach(function (pObj) {
      var p = utils.isArray(pObj) ? (0, pObj[0])({}, pObj[1]) : pObj;
      arr.push.apply(arr, (0, _toConsumableArray3.default)(getPluginArrFromPreset(p)));
    });

    return arr;
  }

  var mRequire = new myRequire(prjDir, require);

  var ret = (preset.presets || []).map(function (presetItem) {
    try {
      presetItem = getRightPresetItem(presetItem);
      var presetName, opts;

      if (typeof presetItem === 'string') {
        presetName = presetItem;
        opts = undefined;
      } else {
        presetName = presetItem[0];
        opts = presetItem[1];
      }

      var presetExport = mRequire.customRequire(presetName);
      return typeof presetExport === 'function' ? [presetExport, opts] : presetExport;
    } catch (e) {
      log.error('error occurs when reading babel presets:', presetItem);
      log.error(e.stack);
      exit();
    }
  });

  return getPluginArrFromPreset({
    presets: ret,
    plugins: preset.plugins
  });
}

module.exports = main;