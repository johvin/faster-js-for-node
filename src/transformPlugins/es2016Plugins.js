var getRightPluginItem = require('../utils').getRightPluginItem;

// http://babeljs.io/docs/plugins/#es2016
exports.ES2016_EXPONENTIATION_OPERATOR = 'transform-exponentiation-operator';

Object.keys(exports).forEach(k => {
  exports[k] = getRightPluginItem(exports[k]);
});
