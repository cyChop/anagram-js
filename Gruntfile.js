module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      options: {
        jshintrc: 'src/.jshintrc'
      },
      build: {
        src: 'src/*.js'
      }
    },

    uglify: {
      options: {
        banner: '/*!\n'
              + ' * <%= pkg.name %> v<%= pkg.version %>\n'
              + ' * by <%= pkg.author %>\n'
              + ' * Licensed under <%= pkg.license %>\n'
              + ' */\n'
      },
      build: {
        src: 'src/<%= pkg.name %>.js',
        dest: 'target/<%= pkg.name %>.min.js'
      }
    }
  });

  // Load the plugins
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  grunt.registerTask('default', ['jshint', 'uglify']);
};
