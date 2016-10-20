var es2015Cases = require('./es2015Cases');
var es2016Cases = require('./es2016Cases');
var es2017Cases = require('./es2017Cases');
var esExperCases = require('./esExperimentalCases');

module.exports = {
  ...es2015Cases,
  ...es2016Cases,
  ...es2017Cases,
  ...esExperCases
};
