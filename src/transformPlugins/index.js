var es2015Plugins = require('./es2015Plugins');
var es2016Plugins = require('./es2016Plugins');
var es2017Plugins = require('./es2017Plugins');
var esModulesPlugins = require('./esModulesPlugins');
var esExperPlugins = require('./esExperimentalPlugins');
var reactPlugins = require('./reactPlugins');
var esOtherPlugins = require('./esOtherPlugins');

module.exports = {
  ...es2015Plugins,
  ...es2016Plugins,
  ...es2017Plugins,
  ...esModulesPlugins,
  ...esExperPlugins,
  ...reactPlugins,
  ...esOtherPlugins
};