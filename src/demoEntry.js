var entry = require('./index');

var res = entry({
  // configFile: false,
  prjRoot: require('path').join(process.cwd(), '../../../Youku Files'),
  // verbose: true,
  babelrc: false,
  presets: [ 'react', ['latest', {es2015: {loose: true}, es2017: false}], 'stage-0' ],
  // presets: [
  //   'react',
  //   'es2015',
  //   'stage-0'
  // ],
  plugins: [
    'transform-runtime',
    'transform-object-rest-spread',
    'transform-decorators-legacy'
  ]
});

res.then(ret => {
  console.log('recommendedPluginArr', ret.recommendedPluginArr);
  console.log('recommenedRemovePluginArr', ret.recommenedRemovePluginArr);
});