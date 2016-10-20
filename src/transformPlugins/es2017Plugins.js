var getRightPluginItem = require('../utils').getRightPluginItem;

// http://babeljs.io/docs/plugins/#es2017
exports.ES2017_ASYNC_TO_GENERATOR = 'transform-async-to-generator';
exports.ES2017_TRAILING_FUNCTION_COMMAS = 'syntax-trailing-function-commas';

Object.keys(exports).forEach(k => {
  exports[k] = getRightPluginItem(exports[k]);
});
