/*
 * grunt-scss-lint
 *
 *
 * Copyright (c) 2014 Fabrice Weinberg
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {
  var scsslint = require('./lib/scsslint').init(grunt);

  grunt.registerMultiTask('scsslint', 'Linting your scss with scss-lint', function () {
    var done = this.async();

    scsslint.lint(this.filesSrc, this.options(), function(){
      done();
    });
  });

};
