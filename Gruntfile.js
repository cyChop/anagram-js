var getSonarConfig = function () {
    var sonarConfig = require('./sonar.config.js');
    sonarConfig.sonar.javascript = require('underscore').defaults({
        lcov: {
            reportPath: 'bin/coverage/report-lcov/lcov.info'
        }
    }, sonarConfig.sonar.javascript);
    return sonarConfig;
};

module.exports = function (grunt) {

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
            coverage: {
                src: 'src/**/*.js',
                options: {
                    specs: 'test/**/*-spec.js',
                    template: require('grunt-template-jasmine-istanbul'),
                    templateOptions: {
                        coverage: 'bin/coverage/coverage.json',
                        report: [
                            {
                                type: 'html',
                                options: {
                                    dir: 'bin/coverage/report-html'
                                }
                            },
                            {
                                type: 'lcov',
                                options: {
                                    dir: 'bin/coverage/report-lcov'
                                }
                            }
                        ]
                    }
                }
            }
        },

        jsdoc: {
            core: {
                src: 'src/*.js',
                dest: 'bin/doc'
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
        },

        sonarRunner: {
            analysis: {
                options: getSonarConfig()
            }
        }
    })
    ;

    // Load the plugins
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-jsdoc');

    grunt.loadNpmTasks('grunt-sonar-runner');

    // Default task(s).
    grunt.registerTask('default', ['jshint', 'uglify', 'jasmine']);
    grunt.registerTask('ci', ['jshint', 'uglify', 'jasmine', 'jsdoc']);
};
