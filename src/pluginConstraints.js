var transP = require('./transformPlugins');

module.exports = {
  // http://babeljs.io/docs/plugins/transform-decorators/
  [transP.DECORATORS]: [ 'remove' ],
  // https://github.com/loganfsmyth/babel-plugin-transform-decorators-legacy#note-order-of-plugins-matters
  [transP.DECORATORS_LEGACY]: [ [ 'shouldBefore', transP.CLASS_PROPERTIES ] ],
  // http://babeljs.io/docs/plugins/transform-object-rest-spread/
  [transP.OBJECT_REST_SPREAD]: [ [ 'require', transP.ES2015_DESTRUCTURING ] ],
  // http://babeljs.io/docs/plugins/transform-es2015-parameters/
  [transP.ES2015_DESTRUCTURING]: [ [ 'require', transP.ES2015_PARAMETERS ] ],
  [transP.ES2015_PARAMETERS]: [ [ 'require', transP.ES2015_DESTRUCTURING ] ],
  // http://babeljs.io/docs/plugins/transform-regenerator/
  [transP.REGENERATOR]: [ [ 'require', [ transP.ASYNC_FUNCTIONS, transP.REGENERATOR_RUNTIME ] ] ],
  // This check will only validate consts. If you need it to compile down to `var` then you must also install and enable transform-es2015-block-scoping.
  [transP.ES2015_CONSTANTS]: [ [ 'require', transP.ES2015_BLOCK_SCOPING ] ],
  // http://babeljs.io/docs/plugins/transform-es2015-parameters/
  [transP.ES2015_PARAMETERS]: [ [ 'require', transP.ES2015_BLOCK_SCOPING ] ]
};