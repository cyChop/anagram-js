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
        banner: '/*! <%= pkg.name %> by <%= pkg.author %> (<%= grunt.template.today("yyyy-mm-dd") %>) */\n'
      },
      build: {
        src: 'src/<%= pkg.name %>.js',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    }
  });

  // Load the plugins
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  grunt.registerTask('default', ['jshint', 'uglify']);
};
