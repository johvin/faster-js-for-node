var getRightPluginItem = require('../utils').getRightPluginItem;

// http://babeljs.io/docs/plugins/#react

// The plugin will not run on the use of `refs` or `object rest spread`
// see http://babeljs.io/docs/plugins/transform-react-constant-elements/
exports.REACT_CONSTANT_ELEMENTS = 'transform-react-constant-elements';
exports.REACT_DISPLAY_NAME = 'transform-react-display-name';
// The plugin will still use React.createElement when `ref` or `object rest spread` is used
// see http://babeljs.io/docs/plugins/transform-react-inline-elements/
exports.REACT_INLINE_ELEMENTS = 'transform-react-inline-elements';
exports.REACT_JSX = 'transform-react-jsx';

Object.keys(exports).forEach(k => {
  exports[k] = getRightPluginItem(exports[k]);
});
