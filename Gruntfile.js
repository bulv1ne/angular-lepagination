/* jslint node: true */
'use strict';

module.exports = function(grunt) {

  grunt.initConfig({
    html2js: {
      options: {
        htmlmin: {
          collapseWhitespace: true,
        }
      },
      lepagination: {
        src: ['src/*.html'],
        dest: 'src/angular-lepagination.tpl.js'
      }
    },
    uglify: {
      scripts: {
        files: {
          'src/angular-lepagination.min.js': ['src/angular-lepagination.js', 'src/angular-lepagination.tpl.js']
        }
      }
    },
    jshint: {
      all: ['src/angular-lepagination.js', 'Gruntfile.js'],
    },
    watch: {
      jshint: {
        files: ['src/angular-lepagination.js', 'Gruntfile.js'],
        tasks: ['jshint']
      },
      scripts: {
        files: ['src/angular-lepagination.js', 'src/angular-lepagination.tpl.js'],
        tasks: ['uglify']
      },
      template: {
        files: ['src/*.html'],
        tasks: ['html2js']
      }
    }
  });

  grunt.loadNpmTasks('grunt-html2js');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['html2js', 'uglify']);
};
