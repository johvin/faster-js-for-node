var getRightPluginItem = require('../utils').getRightPluginItem;

// http://babeljs.io/docs/plugins/#other
exports.EVAL = 'transform-eval';
exports.OBJECT_ASSIGN = 'transform-object-assign';
exports.REGENERATOR = 'transform-regenerator';
exports.TRANSFORM_RUNTIME = 'transform-runtime';
exports.STRICT_MODE = 'transform-strict-mode';
exports.ASYNC_FUNCTIONS = 'syntax-async-functions';

Object.keys(exports).forEach(k => {
  exports[k] = getRightPluginItem(exports[k]);
});

// facebook regenerator runtime, regeneratorRuntime is defined
// https://github.com/facebook/regenerator/blob/master/runtime.js
exports.REGENERATOR_RUNTIME = 'regenerator-runtime';
