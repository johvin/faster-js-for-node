var getRightPluginItem = require('../utils').getRightPluginItem;

// http://babeljs.io/docs/plugins/#modules
exports.MODULES_AMD = 'transform-es2015-modules-amd';
exports.MODULES_COMMONJS = 'transform-es2015-modules-commonjs';
exports.MODULES_SYSTEMJS = 'transform-es2015-modules-systemjs';
exports.MODULES_UMD = 'transform-es2015-modules-umd';

Object.keys(exports).forEach(k => {
  exports[k] = getRightPluginItem(exports[k]);
});
