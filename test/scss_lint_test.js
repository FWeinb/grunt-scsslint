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

  excludeLinter : function ( test ) {
    test.expect(1);

    var expectedResult = { './test/fixtures/default/lint-free.scss': [] };

    scsslint.lint(['./test/fixtures/default/lint-free.scss'], { excludeLinter : 'SpaceAfterPropertyColon'}, function(actualResult){
      test.deepEqual(
        actualResult,
        expectedResult,
        'Result should include file but no error'
      );
      test.done();
    });
  }

};
