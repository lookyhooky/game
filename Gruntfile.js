module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.config('clean', {
    public: ["public"],
    tmp: ["tmp"]
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.config('copy', {
    html: {
      files: [
        // include index.html into 'build/'
        {expand: true, flatten: true, src: ['src/index.html'], dest: 'public/'}
      ]
    },
    js: {
      files: [
        // copy javascript 'tmp/'
        {expand: true, flatten: true, src:['src/js/*'], dest: 'tmp/'}
      ]
    },
    assets: {
      files: [
        // copy assets into 'public/'
        {expand: true, src:['assets/**'], dest: 'public/'}
      ]
    },
    ext: {
      files: [
        // include jquery into build/js/
        {expand: true, src: ['bower_components/jquery/dist/jquery.js'],
         dest: 'public/js/', flatten: true},

        // include d3 into build/js/
        {expand: true, src: ['bower_components/d3/d3.js'],
         dest: 'public/js/', flatten: true},

        // include normalize.css into build/css/
        {expand: true, src: ['bower_components/normalize.css/normalize.css'],
        dest: 'public/css/', flatten: true},
      ]
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.config('concat', {
    scripts: {
      options: {
        
      },
      src: ['tmp/app.js',
            'tmp/app.util.js',
            'tmp/app.type.js',
            'tmp/app.calc.js',
            'tmp/app.shell.js',
            'tmp/app.draw.js',
            'tmp/app.grid.js',
            'tmp/app.map.js',
            'tmp/app.events.js'],
      dest: 'public/js/app.js'
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.config('uglify', {
    scripts: {
      files: {
        'public/js/app.js' : 'tmp/bundle.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.config('sass', {
    app: {
      options: {
        sourcemap: 'none'
      },
      files: {
        'public/css/app.css' : ['src/sass/style.scss']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.config('cssmin', {
    app: {
      files: {
        'public/css/app.css': ['tmp/app.css']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.config('watch', {
    scripts: {
      files: ['src/js/**/*.js'],
      tasks: ['copy:js', 'concat:scripts'],
      options: {
        dot: false,
        spawn: false,
        livereload: true
      }
    },
    styles: {
      files: ['src/sass/**/*.scss'],
      tasks: ['sass'],
      options: {
        dot: false,
        spawn: false,
        livereload: true
      }
    },
    html: {
      files: ['src/index.html'],
      tasks: ['copy:html'],
      options: {
        dot: false,
        spawn: false,
        livereload: true
      }
    }
  });

  grunt.registerTask('build', ['clean','copy', 'concat', 'sass']);

};
