'use strict';

var async = require('async');
var dargs = require('dargs');
var numCPUs = require('os').cpus().length;
var chalk = require('chalk');
var spawn = require('win-spawn');
var which = require('which');


exports.init = function ( grunt ){

  exports.lint = function ( files, options, done ) {

    try {
      which.sync('scss-lint');
    } catch (err) {
      return grunt.warn(
        '\nYou need to have Ruby and scss-lint installed and in your PATH for this task to work.\n' +
        'More info: https://github.com/fweinb/grunt-scss-lint\n'
      );
    }

    var passedArgs = dargs(options, ['format', 'version', 'showLinters', 'help', 'bundleExec']);
    var bundleExec = options.bundleExec;

    async.eachLimit(files, numCPUs, function(src, next){

      if (!grunt.file.exists(src)) {
        grunt.log.warn('Source file "' + src + '" not found.');
        return next();
      }

      var args = [
        src
      ].concat(passedArgs);

      var bin = 'scss-lint';

      if (bundleExec) {
        bin = 'bundle';
        args.unshift('exec', bin);
      }

      var cp = spawn('scss-lint', args, { stdio: 'inherit' });

      cp.on('error', function (err) {
        grunt.warn(err);
      });

      cp.on('close', function (code) {
        if (code > 0) {
          return grunt.warn('Exited with error code ' + code);
        }

        grunt.log.writeln('File ' + chalk.cyan(src) + ' lint-free.');
        next();
      });
    }, done);
  };

  return exports;
};