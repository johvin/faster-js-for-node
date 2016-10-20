var utils = require('./utils');
var Promise = require('bluebird');
var shell = require('child_process').exec;

// get current version node's stage and in-progress features of es
function getNodeFeaturesStatus() {
  var harmonyCmd = 'node --v8-options | grep harmony';

  return new Promise((resolve, reject) => {
    shell(harmonyCmd, (err, stdout, stderr) => {
      if ( err ) {
        log.error(`exec command ( ${harmonyCmd} ) error: ${err}`);
        reject(err);
        return;
      }
      resolve(pretty(stdout));
    });
  });

  function pretty(harmonyInfo) {
    var lines = harmonyInfo.split('\n');
    var len = lines.length;
    var i = 0;
    var re = /--harmony_([a-zA-Z_]+)/;
    var match;

    var ret = {
      stage: {},
      progress: {}
    };

    while(i < len) {
      match = lines[i].match(re);
      if ( match && match.length === 2 && match[1] !== 'shipping' ) {
        if ( /in progress/.test(lines[i]) ) {
          ret.progress[match[1]] = false;
        } else {
          ret.stage[match[1]] = false;
        }
      }
      i++;
    }
    return ret;
  }
}

module.exports = getNodeFeaturesStatus;