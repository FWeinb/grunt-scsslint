/*
 * grunt-scss-lint
 *
 *
 * Copyright (c) 2014 Fabrice Weinberg
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {
  var path = require('path');
  var ScssLinter = require('scsslint');

  var linter = new ScssLinter({
    reporter : grunt
  });

  var toAbsolutePath  = function(src){
    return path.resolve(src);
  };

  grunt.registerMultiTask('scsslint', 'Linting your scss with scss-lint', function () {
    linter.lint(this.filesSrc.map(toAbsolutePath), this.options(), this.async());
  });

};
