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
        src: 'src/*.js',
        options: {
          jshintrc: 'src/.jshintrc'
        }
      },
      test: {
        src: 'test/unit/*.js',
        options: {
          jshintrc: 'test/unit/.jshintrc'
        }
      }
    },

    qunit: {
      files: ['test/*.html']
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
        src: 'src/<%= pkg.name %>.js',
        dest: 'target/<%= pkg.name %>.min.js'
      }
    }
  });

  // Load the plugins
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-jsdoc');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  grunt.registerTask('default', ['jshint', 'qunit', 'jsdoc', 'uglify']);
  grunt.registerTask('check', ['jshint:core', 'qunit']);
};
