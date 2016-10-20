var getNodeShippedFeatureArr = require('./getNodeShippedFeatureArr');
var myRequire = require('./require');
var utils = require('./utils');
var exit = utils.exit;
var log = utils.log;
var getRightPresetItem = utils.getRightPresetItem;
var getRightPluginItem = utils.getRightPluginItem;
var pluginConstraints = require('./pluginConstraints');
import { pluginArrToFeaturesObj, featuresToPluginsObj } from './mapPluginAndFeature';
import startTest from './test';

var nodeV = process.versions.node;
var configFilename = 'es4node.config.js';

var existConfigFile = false;
var existNodeConfig = false;

var config = [];

// check whether or not exists
// the output of faster-es-for-node in
// the es4node.config.js
function checkIFExistConfig(config) {
  return config.filter(cfg => cfg.node === nodeV)
    .filter(cfg => {
      var pr1 = config.presets;
      var pr2 = cfg.babel.presets;
      var pl1 = config.plugins;
      var pl2 = cfg.babel.plugins;

      if ( pr1.length !== pr2.length || pl1.length !== pl2.length ) {
        return false;
      }

      var len, i;
      for(i = 0, len = pr1.length; i < len; i++) {
        if ( pr1[i] !== pr2[i] ) {
          return false;
        }
      }

      for(i = 0, len = pl1.length; i < len; i++) {
        if ( pl1[i] !== pl2[i] ) {
          return false;
        }
      }

      return true;
    });
}

// check if exists the running results
// in es4node.config.js
function checkConfigExist(options) {
  try {
    var configFilePath = require('path').join(options.prjRoot, configFilename);
    config = require(configFilePath);
    existConfigFile = true;
    var NodeConfig = checkIFExistConfig(config);

    if ( existNodeConfig = NodeConfig.length > 0 ) {
      if ( options.configFile ) {
        log.info('es4node.config.js exits');
      }
      return NodeConfig[0];
    }
    return false;
  } catch (err) {
    // no such file
    if ( err && err.code !== 'ENOENT' ) {
      log.error(err.stack);
      exit();
    }
    return false;
  }
}

function main(options) {
  var verbose = global.verbose = options.verbose || false;
  // 暂时去掉 configFile 的功能
  //var config = checkConfigExist(options);
  //if ( config ) return config;

  // 要启用的 babel plugins
  var transformPluginArr;
  // 获取 node 支持且开启的 features
  var shippedFeatureArr;
  // 启用的 plugins 对应的 features
  var transformFeatureArr;
  // 被转换的且node 支持的 features
  var transformShippedFeatureArr;
  // 不被转换的且node 支持的 features
  var notTransformShippedFeatureArr;
  // 被转换的且node 不支持的 features
  var transformUnshippedFeatureArr;

  var pluginArr = getBabelPluginArrFromConfig(options);

  transformPluginArr = getUniquePluginArr(pluginArr);

  verbose && log.info('transformPluginArr', transformPluginArr);

  // 根据 plugins 获取需要转换的 features
  transformFeatureArr = Object.keys(pluginArrToFeaturesObj(transformPluginArr));

  shippedFeatureArr = getNodeShippedFeatureArr(nodeV);

  transformShippedFeatureArr = transformFeatureArr.filter(f => shippedFeatureArr.includes(f));
  notTransformShippedFeatureArr = shippedFeatureArr.filter(f => !transformFeatureArr.includes(f));
  transformUnshippedFeatureArr = transformFeatureArr.filter(f => !shippedFeatureArr.includes(f));

  verbose && log.info('transformShippedFeatureArr', transformShippedFeatureArr);
  verbose && log.info('notTransformShippedFeatureArr', notTransformShippedFeatureArr);
  verbose && log.info('transformUnshippedFeatureArr', transformUnshippedFeatureArr);

  return startTest(shippedFeatureArr)
  .then(function(results) {
    verbose && log.info('results', results);
    var unpassFeatureArr = [];
    Object.keys(results).forEach(f => {
      results[f] || unpassFeatureArr.push(f);
    });

    var unpassFeatureArrToPluginsObj = featuresToPluginsObj(unpassFeatureArr);

    var shippedFeatureArrToPluginsObj = featuresToPluginsObj(shippedFeatureArr);

    var recommendedPluginArr = [];
    var recommenedRemovePluginArr = [];

    function addPluginConstraint(plugin) {
      let p = typeof plugin === 'string' ? plugin : plugin[0];
      let constraintArr = pluginConstraints[p];
      constraintArr && constraintArr.forEach(constraint => {
        var type = typeof constraint === 'string' ? constraint : constraint[0];
        switch(type) {
          case 'require':
            addUniquePlugin(plugin);
            let arr = utils.isArray(constraint[1]) ? constraint[1] : [ constraint[1] ];
            arr.forEach(pl => {
              addUniquePlugin(pl) && pl in pluginConstraints && addPluginConstraint(pl);
            });
            break;
          case 'remove':
            recommenedRemovePluginArr.push(plugin);
            break;
          case 'shouldBefore':
            let index = recommendedPluginArr.indexOf(constraint[1]);
            if ( index > -1 ) {
              recommendedPluginArr.splice(index, 0, plugin);
            } else {
              addUniquePlugin(plugin);
            }
            break;
          default:
            process.env.NODE_ENV !== 'production' &&
            log.warn(`unknown plugin constraint type: ${type}\nconstraint: ${JSON.stringify(constraint, null, 2)}\n`);
        }
      });
    }

    function addUniquePlugin(plugin) {
      var p = typeof plugin === 'string' ? plugin : plugin[0];
      var index = recommendedPluginArr.findIndex(x => typeof x === 'string' ? x === p : x[0] === p );
      if ( index === -1 ) {
        recommendedPluginArr.push(plugin);
        return true;
      }
      return false;
    }

    transformPluginArr.forEach(plugin => {
      let p = typeof plugin === 'string' ? plugin : plugin[0];
      if ( !(p in shippedFeatureArrToPluginsObj)
        || p in unpassFeatureArrToPluginsObj ) {

        if ( p in pluginConstraints ) {
          addPluginConstraint(plugin);
        } else {
          recommendedPluginArr.push(plugin);
        }
      } else {
        recommenedRemovePluginArr.push(plugin);
      }
    });

    recommendedPluginArr = getUniquePluginArr(recommendedPluginArr);

    verbose && log.info('recommendedPluginArr', recommendedPluginArr)
    verbose && log.info('recommenedRemovePluginArr', recommenedRemovePluginArr);

    return {
      recommendedPluginArr,
      recommenedRemovePluginArr
    };
  })
  .catch(function(err, testCode) {
    log.error('error occurs when test features:', err);
    log.error('testCode:', testCode);
    exit();
  });
}

// 去掉重复的 plugin
function getUniquePluginArr(pluginArr) {
  var o = {};
  // var ret = pluginArr.filter(plugin => {
  //   var p = typeof plugin === 'string' ? plugin : plugin[0];
  //   if ( p in o ) {
  //     if ( utils.isArray(o[p]) ) {
  //       o[p].push(plugin);
  //     } else {
  //       o[p] = [ o[p], plugin ];
  //     }
  //     return false;
  //   }
  //   o[p] = plugin;
  //   return true;
  // });

  var ret = [], plugin, p;
  for(var len = pluginArr.length, i = len - 1; i >= 0; i--) {
    plugin = pluginArr[i];
    p = typeof plugin === 'string' ? plugin : plugin[0];
    if ( p in o ) continue;
    o[p] = 1;
    ret.unshift(plugin);
  }

  return ret;
}

// 根据 babelrc 的配置获取 pluginArr
function getBabelPluginArrFromConfig(config) {
  return getBabelPluginArrFromPreset({
    presets: config.presets || [],
    plugins: config.plugins || []
  }, config.prjRoot);
}

function getBabelPluginArrFromPreset(preset, prjDir) {

  // 根据 preset 的 export 结果，
  // 获取 plugin array
  function getPluginArrFromPreset(presetObj) {
    var arr = (presetObj.plugins || []).map(p => getRightPluginItem(p));

    // preset ordering is reversed
    (presetObj.presets || []).reverse().forEach(pObj => {
      var p = utils.isArray(pObj) ? (0, pObj[0])({}, pObj[1]) : pObj;
      arr.push(...getPluginArrFromPreset(p));
    });

    return arr;
  }

  var mRequire = new myRequire(prjDir, require);

  var ret = (preset.presets || []).map(presetItem => {
    try {
      presetItem = getRightPresetItem(presetItem);
      var presetName, opts;

      if ( typeof presetItem === 'string' ) {
        presetName = presetItem;
        opts = undefined;
      } else {
        presetName = presetItem[0];
        opts = presetItem[1];
      }

      var presetExport = mRequire.customRequire(presetName);
      return typeof presetExport === 'function' ?
        [presetExport, opts] :
        presetExport;
    } catch(e) {
      // reset();
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

// old getBabelPluginArrFromPreset function (removed)
//
// 从 preset 获取 pluginArr
//
// @return promise
// function getBabelPluginArrFromPreset(preset, modulesRoot) {

//   return Promise.all(
//     // Preset ordering is reversed
//     (preset.presets || []).reverse().map(presetName => new Promise((resolve, reject) => {
//       try {
//         if ( presetName === undefined ) {
//           throw new Error(`Unsupport preset\n${JSON.stringify(preset, null, 2)}`);
//         }
//         presetName = getRightPresetItem(presetName);
//         var opts = typeof presetName === 'string' ? undefined : presetName[1];
//         opts && (presetName = presetName[0]);

//         var entryFileName = do {
//           var pjson, pkgPath = path.join(modulesRoot, presetName + '/package.json');

//           try {
//             pjson = require(pkgPath);
//           } catch (e) {}
//           pjson && pjson.main || 'index.js';
//         };

//         var entryPath = path.join(modulesRoot, presetName, '/', entryFileName);
//         readFileAsync(entryPath)
//         .then(code => code.replace(/require\(([^)]*)\)/g, '$1'))
//         .then(code => {
//           var m = {
//             exports: {}
//           };
//           var f = new Function('module', 'exports', code);
//           f(m, m.exports);
//           return typeof m.exports === 'function' ?
//             (0, m.exports)({}, opts) :
//             m.exports;
//         })
//         .then(preset => getBabelPluginArrFromPreset(preset, modulesRoot).catch(e => {
//           log.error(`error occurs when reading babel preset: ${presetName}`, e.stack);
//         }))
//         .then(pArr => resolve(pArr))
//         .catch(e => {
//           log.error(`error occurs when reading ${entryPath}:`, e.stack);
//           return reject(e.stack);
//         });
//       } catch(e) {
//         log.error('error occurs when reading babel presets:');
//         log.error(e.stack);
//         exit();
//       }
//     }))
//   ).then(args => {
//     // Plugin ordering is first to last
//     var pluginArr = (preset.plugins || []).map(p => getRightPluginItem(p));

//     return args.reduce((prev, cur) => {
//       prev.push(...cur);
//       return prev;
//     }, pluginArr);
//   });
// }

module.exports = main;
