module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    
    pkg: grunt.file.readJSON('package.json'),
    
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['source/**/*.js'],
        dest: 'distribution/<%= pkg.name %>.js'
      }
    },

    uglify: {
      dist: {
        files: {
          'distribution/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },
    
    jshint: {
      uses_defaults: ['Gruntfile.js', 'source/**/*.js', 'tests/*.js'],
    },             

    connect: {
      server : {
        options: {
          hostname: 'localhost',
          keepalive: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('build', ['jshint', 'concat', 'uglify']);
};
