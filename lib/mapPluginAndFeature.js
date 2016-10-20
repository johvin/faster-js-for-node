'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.featuresToPluginsObj = exports.pluginArrToFeaturesObj = undefined;

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _pluginToFeatureMap;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var transP = require('./transformPlugins');
var es2015F = require('./esFeatures/es2015Features');
var es2016F = require('./esFeatures/es2016Features');
var es2017F = require('./esFeatures/es2017Features');
var esExperF = require('./esFeatures/esExperimentalFeatures');

var pluginToFeatureMap = (_pluginToFeatureMap = {}, (0, _defineProperty3.default)(_pluginToFeatureMap, transP.ES2015_TEMPLATE_LITERALS, es2015F.TEMPLATE_LITERALS), (0, _defineProperty3.default)(_pluginToFeatureMap, transP.ES2015_LITERALS, [es2015F.BINARY_OCTAL_LITERALS, es2015F.UNICODE_STRING_LITERALS]), (0, _defineProperty3.default)(_pluginToFeatureMap, transP.ES2015_FUNCTION_NAME, es2015F.FUNCTION_NAME), (0, _defineProperty3.default)(_pluginToFeatureMap, transP.ES2015_ARROW, es2015F.ARROW), (0, _defineProperty3.default)(_pluginToFeatureMap, transP.ES2015_BLOCK_SCOPED_FUNCTIONS, es2015F.BLOCK_LEVEL_FUNCTION), (0, _defineProperty3.default)(_pluginToFeatureMap, transP.ES2015_CLASSES, es2015F.CLASS), (0, _defineProperty3.default)(_pluginToFeatureMap, transP.ES2015_OBJECT_SUPER, es2015F.OBJECT_SUPER), (0, _defineProperty3.default)(_pluginToFeatureMap, transP.ES2015_SHORTHAND_PROPERTIES, es2015F.OBJECT_LITERALS), (0, _defineProperty3.default)(_pluginToFeatureMap, transP.ES2015_DUPLICATE_KEYS, es2015F.OBJECT_LITERALS), (0, _defineProperty3.default)(_pluginToFeatureMap, transP.ES2015_COMPUTED_PROPERTIES, es2015F.OBJECT_LITERALS), (0, _defineProperty3.default)(_pluginToFeatureMap, transP.ES2015_FOR_OF, es2015F.ITERATORS_FOR_OF), (0, _defineProperty3.default)(_pluginToFeatureMap, transP.ES2015_STICKY_REGEX, es2015F.STICKY_REGEX), (0, _defineProperty3.default)(_pluginToFeatureMap, transP.ES2015_UNICODE_REGEX, es2015F.UNICODE_REGEX), (0, _defineProperty3.default)(_pluginToFeatureMap, transP.ES2015_CONSTANTS, es2015F.CONST), (0, _defineProperty3.default)(_pluginToFeatureMap, transP.ES2015_SPREAD, es2015F.SPREAD_OPERATOR), (0, _defineProperty3.default)(_pluginToFeatureMap, transP.ES2015_PARAMETERS, [es2015F.DESTRUCTURING, es2015F.REST_PARAMETERS, es2015F.DEFAULT_PARAMETERS]), (0, _defineProperty3.default)(_pluginToFeatureMap, transP.ES2015_DESTRUCTURING, es2015F.DESTRUCTURING), (0, _defineProperty3.default)(_pluginToFeatureMap, transP.ES2015_BLOCK_SCOPING, [es2015F.LET, es2015F.CONST]), (0, _defineProperty3.default)(_pluginToFeatureMap, transP.ES2015_TYPEOF_SYMBOL, es2015F.TYPEOF_SYMBOL), (0, _defineProperty3.default)(_pluginToFeatureMap, transP.CLASS_PROPERTIES, esExperF.CLASS_PROPERTIES), (0, _defineProperty3.default)(_pluginToFeatureMap, transP.CLASS_CONSTRUCTOR_CALL, esExperF.CALLABLE_CLASS_CONSTRUCTOR), (0, _defineProperty3.default)(_pluginToFeatureMap, transP.MODULES_COMMONJS, es2015F.MODULES), (0, _defineProperty3.default)(_pluginToFeatureMap, transP.MODULES_SYSTEMJS, es2015F.MODULE_LOADERS), (0, _defineProperty3.default)(_pluginToFeatureMap, transP.ES2016_EXPONENTIATION_OPERATOR, es2016F.EXPONENTIATION_OPERATOR), (0, _defineProperty3.default)(_pluginToFeatureMap, transP.EXPORT_EXTENSIONS, es2015F.MODULES), (0, _defineProperty3.default)(_pluginToFeatureMap, transP.ES2017_ASYNC_TO_GENERATOR, es2017F.ASYNC), (0, _defineProperty3.default)(_pluginToFeatureMap, transP.ES2017_TRAILING_FUNCTION_COMMAS, es2017F.TRAILING_FUNCTION_COMMAS), (0, _defineProperty3.default)(_pluginToFeatureMap, transP.DECORATORS_LEGACY, esExperF.DECORATOR), (0, _defineProperty3.default)(_pluginToFeatureMap, transP.OBJECT_REST_SPREAD, esExperF.OBJECT_REST_SPREAD), (0, _defineProperty3.default)(_pluginToFeatureMap, transP.REGENERATOR, [es2015F.GENERATORS, es2017F.ASYNC]), _pluginToFeatureMap);

var featureToPluginMap = function () {
  var map = {};
  var addPlugin = function addPlugin(plugin, feature) {
    if (!(feature in map)) {
      map[feature] = plugin;
    } else if (Array.isArray(map[feature])) {
      map[feature].push(plugin);
    } else {
      map[feature] = [map[feature], plugin];
    }
  };

  (0, _keys2.default)(pluginToFeatureMap).forEach(function (plugin) {
    var t = pluginToFeatureMap[plugin];
    if (Array.isArray(t)) {
      t.forEach(function (f) {
        addPlugin(plugin, f);
      });
    } else {
      addPlugin(plugin, t);
    }
  });

  return map;
}();

function pluginArrToFeaturesObj(pluginArr) {
  return pluginArr.reduce(function (prev, cur) {
    var p = typeof cur === 'string' ? cur : cur[0];
    if (p in pluginToFeatureMap) {
      var f = pluginToFeatureMap[p];
      if (Array.isArray(f)) {
        f.forEach(function (t) {
          prev[t] = 1;
        });
      } else {
        prev[f] = 1;
      }
    }
    return prev;
  }, {});
}

function featuresToPluginsObj(features) {
  var isArr = Array.isArray(features);
  var plugins = {};

  (isArr ? features : (0, _keys2.default)(features)).forEach(function (feature) {
    var t = featureToPluginMap[feature];
    if (Array.isArray(t)) {
      t.forEach(function (plugin) {
        plugins[plugin] = 1;
      });
    } else {
      plugins[t] = 1;
    }
  });

  return plugins;
}

exports.pluginArrToFeaturesObj = pluginArrToFeaturesObj;
exports.featuresToPluginsObj = featuresToPluginsObj;