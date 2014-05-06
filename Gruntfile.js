module.exports = function (grunt) {
    //описываем задачю
    grunt.initConfig ({
        pkg: grunt.file.readJSON('package.json'),

        jshint: {
            options: {
                curly:true,
                eqeqeq:true,
                immed:true,
                latedef:true,
                newcap:true,
                noarg:true,
                sub:true,
                undef:true,
                eqnull:true,
                browser:true,
                globals: {
                    jQuery:true,
                    $:true,
                    console:true
                    }
            },
            '<%= pkg.name %>': {
                src: ['js/*.js']
            }
        },

        concat: {
            options: {
                stripBanners:true,
                banner:'/*<%= pkg.name %>*/ /*<%= pkg.version %>*/'
            },

            dist: {
                src: ['js/test.js', 'js/main.js'],
                dest: 'dest/build.js'
            }
        },

        uglify: {
            build: {
                src: 'dest/build.js',
                dest: 'dest/build.min.js'
            }
        },

        cssmin: {
            css: {
                src: ['css/normalize.css', 'css/test.less'],
                dest: 'dest/style.min.css'

            }                                                          ,
    css2:{
            src: ['css/normalize.css', 'css/test.less'],
            dest: 'dest/style2.min.css'

        }
        }
    });

    // подгружаем необходимы плагины
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');


    // include all tasks from this projects (in /tasks/ directory)
    grunt.loadTasks('tasks');

    // регистрируем задачу
    grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'cssmin']);


};