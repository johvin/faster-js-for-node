var transP = require('./transformPlugins');
var es2015F = require('./esFeatures/es2015Features');
var es2016F = require('./esFeatures/es2016Features');
var es2017F = require('./esFeatures/es2017Features');
var esExperF = require('./esFeatures/esExperimentalFeatures');

// current plugins to features' map
var pluginToFeatureMap = {
  [transP.ES2015_TEMPLATE_LITERALS]: es2015F.TEMPLATE_LITERALS,
  [transP.ES2015_LITERALS]: [es2015F.BINARY_OCTAL_LITERALS, es2015F.UNICODE_STRING_LITERALS],
  [transP.ES2015_FUNCTION_NAME]: es2015F.FUNCTION_NAME,
  [transP.ES2015_ARROW]: es2015F.ARROW,
  [transP.ES2015_BLOCK_SCOPED_FUNCTIONS]: es2015F.BLOCK_LEVEL_FUNCTION,
  [transP.ES2015_CLASSES]: es2015F.CLASS,
  [transP.ES2015_OBJECT_SUPER]: es2015F.OBJECT_SUPER,
  [transP.ES2015_SHORTHAND_PROPERTIES]: es2015F.OBJECT_LITERALS,
  [transP.ES2015_DUPLICATE_KEYS]: es2015F.OBJECT_LITERALS,
  [transP.ES2015_COMPUTED_PROPERTIES]: es2015F.OBJECT_LITERALS,
  [transP.ES2015_FOR_OF]: es2015F.ITERATORS_FOR_OF,
  [transP.ES2015_STICKY_REGEX]: es2015F.STICKY_REGEX,
  [transP.ES2015_UNICODE_REGEX]: es2015F.UNICODE_REGEX,
  [transP.ES2015_CONSTANTS]: es2015F.CONST,
  [transP.ES2015_SPREAD]: es2015F.SPREAD_OPERATOR,
  [transP.ES2015_PARAMETERS]: [es2015F.DESTRUCTURING, es2015F.REST_PARAMETERS, es2015F.DEFAULT_PARAMETERS],
  [transP.ES2015_DESTRUCTURING]: es2015F.DESTRUCTURING,
  [transP.ES2015_BLOCK_SCOPING]: [es2015F.LET, es2015F.CONST],
  [transP.ES2015_TYPEOF_SYMBOL]: es2015F.TYPEOF_SYMBOL,
  [transP.CLASS_PROPERTIES]: esExperF.CLASS_PROPERTIES,
  [transP.CLASS_CONSTRUCTOR_CALL]: esExperF.CALLABLE_CLASS_CONSTRUCTOR,
  [transP.MODULES_COMMONJS]: es2015F.MODULES,
  [transP.MODULES_SYSTEMJS]: es2015F.MODULE_LOADERS,
  [transP.ES2016_EXPONENTIATION_OPERATOR]: es2016F.EXPONENTIATION_OPERATOR,
  [transP.EXPORT_EXTENSIONS]: es2015F.MODULES,
  [transP.ES2017_ASYNC_TO_GENERATOR]: es2017F.ASYNC,
  [transP.ES2017_TRAILING_FUNCTION_COMMAS]: es2017F.TRAILING_FUNCTION_COMMAS,
  // 'transform-decorators' 在 babel 6.x 中不起作用了
  // [transP.DECORATORS]: esExperF.DECORATOR,

  // 如果使用了 transform-class-properties 插件，
  // 需要保证 transform-decorators-legacy 在
  // transform-class-properties 的前面
  [transP.DECORATORS_LEGACY]: esExperF.DECORATOR,
  [transP.OBJECT_REST_SPREAD]: esExperF.OBJECT_REST_SPREAD,
  [transP.REGENERATOR]: [es2015F.GENERATORS, es2017F.ASYNC]
};

var featureToPluginMap = do {
  var map = {};
  const addPlugin = (plugin, feature) => {
    if (!(feature in map)) {
      map[feature] = plugin;
    } else if ( Array.isArray(map[feature]) ) {
      map[feature].push(plugin);
    } else {
      map[feature] = [ map[feature], plugin ];
    }
  };

  Object.keys(pluginToFeatureMap).forEach(plugin => {
    let t = pluginToFeatureMap[plugin];
    if ( Array.isArray(t) ) {
      t.forEach(f => {
        addPlugin(plugin, f);
      });
    } else {
      addPlugin(plugin, t);
    }
  });

  map;
};

function pluginArrToFeaturesObj(pluginArr) {
  return pluginArr.reduce((prev, cur) => {
    let p = typeof cur === 'string' ? cur : cur[0];
    if ( p in pluginToFeatureMap ) {
      let f = pluginToFeatureMap[p];
      if ( Array.isArray(f) ) {
        f.forEach(t => { prev[t] = 1; });
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

  ( isArr ? features : Object.keys(features) ).forEach(feature => {
    var t = featureToPluginMap[feature];
    if ( Array.isArray(t) ) {
      t.forEach(plugin => {
        plugins[plugin] = 1;
      })
    } else {
      plugins[t] = 1;
    }
  });

  return plugins;
}

export {
  pluginArrToFeaturesObj,
  featuresToPluginsObj
}