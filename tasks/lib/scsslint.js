'use strict';

var async = require('async');
var readline  = require('readline');
var dargs = require('dargs');
var numCPUs = require('os').cpus().length;
var chalk = require('chalk');
var spawn = require('win-spawn');
var which = require('which');


exports.init = function ( grunt ){

  var reduceArray = function(options, value){
    if ( !!options[value] ) {
      if ( Array.isArray(options[value])){
        return options[value].join(',');
      } else  {
        return options[value];
      }
    }
  };

  var reporter = function(src, report){
    if ( report.length === 0) {
      grunt.log.writeln('File ' + chalk.cyan(src) + ' lint free');
    } else {
      report.forEach(function(item){
        var type = item.type === 'E' ? chalk.red(item.type) : chalk.yellow(item.type );
        grunt.log.writeln(chalk.cyan(src) + ':' + chalk.magenta(''+item.line) + ' [' + type + '] ' + item.message);
      });
    }
  };

  exports.lint = function ( files, options, done ) {

    try {
      which.sync('scss-lint');
    } catch (err) {
      return grunt.warn(
        '\nYou need to have Ruby and scss-lint installed and in your PATH for this task to work.\n' +
        'More info: https://github.com/fweinb/grunt-scss-lint\n'
      );
    }


    options.excludeLinter = reduceArray(options, 'excludeLinter');
    options.includeLinter = reduceArray(options, 'includeLinter');

    var passedArgs = dargs(options, ['format', 'version', 'showLinters', 'help', 'bundleExec']);


    var bundleExec = options.bundleExec;
    var allResults = {};

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

      var cp = spawn('scss-lint', args);
      var messages = [];

      readline.createInterface({
        input     : cp.stdout,
        terminal  : false
      }).on('line', function(line) {
        var split = line.split(':');
        messages.push({
          line : parseInt(split[1]),
          type : split[1].substr(split[1].indexOf('[')+1, 1),
          message : split[1].substr(split[1].indexOf(']')+2)
        });
      });

      cp.on('close', function(code){

        reporter(src, messages);
        allResults[src] = messages;

        if ( code > 0 ) {
          next(true);
          return grunt.warn('Exited with error code ' + code);
        }
        next();
      });

    }, function(){
      done(allResults);
    });
  };

  return exports;
};