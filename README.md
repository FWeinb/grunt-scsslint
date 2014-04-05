# grunt-scsslint

> Linting your scss with scsslint

## Getting Started
If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-scsslint --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-scsslint');
```

## The "scsslint" task

### Overview

This task requires you to have [Ruby](http://www.ruby-lang.org/en/downloads/) and [scss-lint](https://github.com/causes/scss-lint) installed. If you're on OS X or Linux you probably already have Ruby installed; test with `ruby -v` in your terminal. When you've confirmed you have Ruby installed, run `gem install scss-lint` to install scss-lint.


In your project's Gruntfile, add a section named `scsslint` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  scsslint: {
    options: {
      // Options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
})
```

### Options

#### config

Type: `String`

Path to the Yaml config file. See [scss-lint#configuration](https://github.com/causes/scss-lint#configuration)

#### exclude

Type. `String`

Allows you to specify a glob pattern of files that should not be linted .

#### excludeLinter

Type. `String|Array`

Specify which linters you **don't** want to run. A list of linters can be found [here](https://github.com/causes/scss-lint/blob/master/lib/scss_lint/linter/README.md)

#### excludeLinter

Type. `String|Array`

Specify which linters you **want** to run. A list of linters can be found [here](https://github.com/causes/scss-lint/blob/master/lib/scss_lint/linter/README.md)


### Usage Examples

#### Example config

```js
grunt.initConfig({
  scsslint: {
    dist: {
      src: ['./app/style/main.scss'],
    }
  },
});

grunt.loadNpmTasks('grunt-scsslint');

grunt.registerTask('default', ['scsslint']);
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_

## License
Copyright (c) 2014 Fabrice Weinberg. Licensed under the MIT license.
