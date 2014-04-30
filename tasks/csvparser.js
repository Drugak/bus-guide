'use strict';


var fs      = require('fs');
var os      = require('os');
var async   = require('async');
var mkdirp  = require('mkdirp');
var csv     = require('csv');


/**
 *
 * И вроде бы всё есть
 * И даже на жопе шерсть
 * Но вот что-то всё не то
 * И не понятно что
 * И вроде бы всё пиздато
 * И хуй с ним с блоком НАТО
 * Но вот только когда напьюсь
 * Мне снится Советский Союз
 *
 * (с) Ленинград
 *
 */

module.exports = function ( grunt) {

    grunt.registerTask('csvparser',
        'A sample task which parse CSV with official reply of Odessa Transport Department ',
        function(pathToCsv) {
            if ( arguments.length == 0 ) {
                grunt.log.error(this.name + " error: not enough arguments. ");
                grunt.log.error("Usage: grunt " + this.name + " [path-to-csvfile]  ");
                return false;
            }
            var filepath = arguments[0];
            var done = this.async();

            setTimeout(function() {
                grunt.log.writeln("Hello async world!" + filepath);
                done(true);
            }, 1);
            return true;
        }
    );

};