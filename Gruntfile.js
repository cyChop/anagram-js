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
  		options: {
  		  "--web-security": "no",
  			coverage: {
  				src: [ "src/*.js" ],
  				instrumentedFiles: "temp/",
  				htmlReport: "build/report/coverage",
  				lcovReport: "build/report/lcov",
  				linesThresholdPct: 0
  			}
  		},
  		files: ['test/*.html']
    },
    coveralls: {
  		main_target: {
  			src: "build/report/lcov/lcov.info"
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
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-jsdoc');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks("grunt-qunit-istanbul");
  grunt.loadNpmTasks('grunt-coveralls');

  // Default task(s).
  grunt.registerTask('default', ['jshint', 'uglify', 'qunit', 'jsdoc']);
  grunt.registerTask('check', ['jshint:core', 'qunit']);
};
