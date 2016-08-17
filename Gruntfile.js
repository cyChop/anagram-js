module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      grunt: {
        // Check Gruntfile with JSHint defaults
        src: 'Gruntfile.js'
      },
      core: {
        src: 'src/**/*.js',
        options: {
          jshintrc: 'src/.jshintrc'
        }
      },
      test: {
        src: 'test/**/*-spec.js',
        options: {
          jshintrc: 'test/.jshintrc'
        }
      }
    },

    qunit: {
  		all: ['test/*.html']
    },

    jasmine: {
      pivotal: {
        src: 'src/**/*.js',
        options: {
          specs: 'test/**/*-spec.js'
        }
      }
    },

    jsdoc: {
      core: {
        src: 'src/*.js',
        dest: 'doc'
      }
    },

    uglify: {
      options: {
        banner: '/*!\n' +
                ' * <%= pkg.name %> v<%= pkg.version %>\n' +
                ' * by <%= pkg.author.name %> (<%= pkg.author.url %>)\n' +
                ' * Licensed under <%= pkg.license %>\n' +
                ' */\n'
      },
      build: {
        src: 'src/anagram.js',
        dest: 'build/target/anagram.min.js'
      }
    }
  });

  // Load the plugins
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-croc-qunit');
  grunt.loadNpmTasks('grunt-jsdoc');

  // Default task(s).
  grunt.registerTask('default', ['jshint', 'uglify', 'jasmine', 'jsdoc']);
};
