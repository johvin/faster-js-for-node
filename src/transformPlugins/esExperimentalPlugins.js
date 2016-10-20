// es next plugins means es experimental plugins
var getRightPluginItem = require('../utils').getRightPluginItem;

// http://babeljs.io/docs/plugins/#experimental
exports.ASYNC_TO_MODULE_METHOD = 'transform-async-to-module-method';
// deprecated
exports.CLASS_CONSTRUCTOR_CALL = 'transform-class-constructor-call';
exports.CLASS_PROPERTIES = 'transform-class-properties';
exports.DECORATORS = 'transform-decorators';
exports.DECORATORS_LEGACY = 'transform-decorators-legacy';
exports.DO_EXPRESSIONS = 'transform-do-expressions';
exports.EXPORT_EXTENSIONS = 'transform-export-extensions';
exports.FUNCTION_BIND = 'transform-function-bind';
exports.OBJECT_REST_SPREAD = 'transform-object-rest-spread';
// http://babeljs.io/docs/plugins/#experimental-1
exports.ASYNC_GENERATORS = 'syntax-async-generators';
exports.FUNCTION_SENT = 'syntax-function-sent';

Object.keys(exports).forEach(k => {
  exports[k] = getRightPluginItem(exports[k]);
});
