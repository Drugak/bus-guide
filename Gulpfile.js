/**
 * Created by Noxval on 06.04.15.
 */

// REQUIREMENTS
//======================================
var gulp = require('gulp'),
    less = require('gulp-less'),
    path = require('path'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    clean = require('gulp-clean'),
    watch = require('gulp-watch'),
    runSequence = require('run-sequence');





// VARIABLES
//======================================


// TASKS
//======================================
gulp.task('less', function() {
    return gulp.src('src/less/app.less')
        .pipe(less({
            paths: [ path.join(__dirname, 'less', 'includes') ],
        }))
        .pipe(gulp.dest('dest/css'));
});

gulp.task('compress', function() {
    return gulp.src(['src/js/**/*.js','src/js/*.js'])
        .pipe(uglify())
        .pipe(gulp.dest('dest/js'))
});

gulp.task('concatJS', function() {
    return gulp.src('dest/js/**/*.js')
        .pipe(concat('app.js'))
        .pipe(gulp.dest('dest/js'));
});

gulp.task('mr_Proper+Script', function () {
    return gulp.src('dest/js/**/*.js', {read: false})
        .pipe(clean());
});

gulp.task('mr_Proper+Css', function () {
    return gulp.src('dest/css/*.css', {read: false})
        .pipe(clean());
});


gulp.task('mr_Holms+Css_tools' , function (callback) {
    runSequence('mr_Proper+Css', 'less', callback)
});
gulp.task('mr_Holms+JS_tools' , function (callback) {
    runSequence('mr_Proper+Script', 'compress', 'concatJS', callback)
});



gulp.task('mr_Holms' , function () {
    gulp.watch('src/less/**/*.less' , ['mr_Holms+Css_tools']);
    gulp.watch('src/js/**/*.js',['mr_Holms+JS_tools']);
});
gulp.task('mr_Holms+Css' , function () {
    gulp.watch('src/less/**/*.less' , ['mr_Holms+Css_tools']);
});
gulp.task('mr_Holms+JS' , function () {
    gulp.watch('src/js/**/*.js',['mr_Holms+JS_tools']);
});

gulp.task('mr_Proper',['mr_Proper+Css', 'mr_Proper+Script'], function() {});
gulp.task('bildTask', ['less', 'compress', 'concatJS'] , function (){});
