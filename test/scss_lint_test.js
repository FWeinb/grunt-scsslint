'use strict';


var grunt = require('grunt');
var scsslint = require('../tasks/lib/scsslint').init(grunt);

// Monkeypatch grunt...
grunt.warn = function(){};

exports.scssLint = {
  defaultOptions: function (test) {
    test.expect(1);

    var expectedResult = {
      './test/fixtures/default/lint-error.scss' : [{
        line : 2,
        type : 'W',
        message: 'Color `blue` should be written in hexadecimal form as `#00f`'
      }]
    };
    scsslint.lint(['./test/fixtures/default/lint-error.scss'], {}, function(actualResult){
      test.deepEqual(
        actualResult,
        expectedResult,
        'Should match'
      );
      test.done();
    });
  },

  defaultOptionsLintFree : function (test){
    test.expect(1);

    var expectedResult = { './test/fixtures/default/lint-free.scss': [] };

    scsslint.lint(['./test/fixtures/default/lint-free.scss'], {}, function(actualResult){
      test.deepEqual(
        actualResult,
        expectedResult,
        'Result should include file but no error'
      );
      test.done();
    });
  },

  excludeLinterLintFree : function ( test ) {
    test.expect(1);

    var expectedResult = { './test/fixtures/linter/exclude-lint-free.scss': [] };

    scsslint.lint(['./test/fixtures/linter/exclude-lint-free.scss'], { excludeLinter : 'SpaceAfterPropertyColon' }, function(actualResult){
      test.deepEqual(
        actualResult,
        expectedResult,
        'Result should include file but no error'
      );
      test.done();
    });
  },

  excludeLinterError : function ( test ){
    test.expect(1);

    var expectedResult = { './test/fixtures/linter/exclude-lint-error.scss': [{
      line: 12,
      type: 'W',
      message: 'Name of mixin `_error` should be written in lowercase with hyphens instead of underscores'
    }] };

    scsslint.lint(['./test/fixtures/linter/exclude-lint-error.scss'], { excludeLinter : 'SpaceAfterPropertyColon' }, function(actualResult){
      test.deepEqual(
        actualResult,
        expectedResult,
        'Should match'
      );
      test.done();
    });
  },

  includeLinterLintFree : function ( test ) {
    test.expect(1);

    var expectedResult = { './test/fixtures/linter/include-lint-free.scss': [] };

    scsslint.lint(['./test/fixtures/linter/include-lint-free.scss'], { includeLinter : 'Comment' }, function(actualResult){
      test.deepEqual(
        actualResult,
        expectedResult,
        'Result should include file but no error'
      );
      test.done();
    });
  },

  includeLinterLintError : function ( test ) {
    test.expect(1);

    var expectedResult = { './test/fixtures/linter/include-lint-error.scss': [{
      line : 7,
      type : 'W',
      message: 'Color `blue` should be written in hexadecimal form as `#00f`'
    }] };

    scsslint.lint(['./test/fixtures/linter/include-lint-error.scss'], { includeLinter : 'ColorKeyword' }, function(actualResult){
      test.deepEqual(
        actualResult,
        expectedResult,
        'Result should include file but no error'
      );
      test.done();
    });
  },

  configLinterLintError : function ( test ) {
    test.expect(1);

    var expectedResult = { './test/fixtures/config/config-lint-error.scss': [{
      line : 3,
      type : 'W',
      message: 'Opening curly braces ({) should be preceded by one space'
    }] };

    scsslint.lint(['./test/fixtures/config/config-lint-error.scss'], { config : './test/fixtures/config/config.yml' }, function(actualResult){
      test.deepEqual(
        actualResult,
        expectedResult,
        'Result should include file but no error'
      );
      test.done();
    });
  }

};
