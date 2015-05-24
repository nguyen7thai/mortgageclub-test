module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    concat: {
      js: {
        src: [
          'src/app/app.js',
          'src/app/**/module.js',
          'src/app/**/*.js'
        ],
        dest: 'build/production.js',
      }
    },

    watch: {
      scripts: {
        files: ['src/*.js', 'src/**/*.js'],
        tasks: ['concat'],
        options: {
          spawn: false,
        },
      }
    },

    bowerInstall: {
      target: {

        src: [
          'index.html'
        ],

        cwd: '',
        dependencies: true
      }
    },

    bower: {
      install: {
        options: {
          targetDir: 'build/bower_components'
        }
      }
    }
  });


  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-bower-install');
  grunt.loadNpmTasks('grunt-bower-task');

  grunt.registerTask('default', ['concat', 'watch']);

};
