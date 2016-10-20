var fs = require('fs');
var path = require('path');
var gulp = require('gulp');
var gbabel = require('gulp-babel');
var through2 = require('through2');
var Promise = require('bluebird');
var runSequence = require('gulp-sequence');
var shell = require('child_process').exec;

gulp.task('build', function(cb) {
  runSequence('clean', 'compile', cb);
});

gulp.task('clean', function(cb) {
  shell('rm -rf lib/*', function(err) {
    if ( err ) return cb(err);
    cb();
  });
});

function getDirFiles(dirPath, cb) {
  fs.readdir(dirPath, function(err, files) {
    if ( err ) return cb(err);
    Promise.all(files.map(function(file) {
      return new Promise(function(resolve, reject) {
        var p = path.join(dirPath, file);
        fs.stat(p, function(err, stats) {
          if ( err ) return cb(err);
          if ( stats.isFile() ) return resolve(p);
          getDirFiles(p, function(err, files) {
            if ( err ) return cb(err);
            resolve(files);
          });
        });
      });
    }))
    .then(function(files) {
      var ret = [];
      files.forEach(function(file) {
        if ( typeof file === 'string' ) {
          ret.push(file);
        } else {
          ret.push.apply(ret, file);
        }
      });
      cb(null, ret);
    });
  });
}

gulp.task('compile', function(cb) {
  getDirFiles('src', function(err, files) {
    if ( err ) return cb(err);
    Promise.all(
      files.map(function(file) {
        return new Promise(function(resolve, reject) {
          gulp.src(file)
            .pipe(gbabel({
              presets: [
                'es2015',
                'stage-0'
              ],
              plugins: [
                'transform-runtime'
              ],
              shouldPrintComment: function(comment) {
                return file.indexOf('Cases.js') > -1 || (file.indexOf('test.js') > -1 && comment.indexOf('transformT') > -1);
              }
            }))
            .pipe(gulp.dest(path.dirname(file).replace('src', 'lib')))
            .pipe(through2.obj(function(chunk, enc, callback) {
              this.push(chunk);
              callback();
            }))
            .on('data', function() {})
            .on('end', resolve);
        });
      })
    )
    .then(function() {
      cb();
    })
    .catch(cb);
  });
});