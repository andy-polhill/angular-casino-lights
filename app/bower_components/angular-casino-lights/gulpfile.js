'use strict';

var gulp = require('gulp');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var del = require('del');

var destination = 'dist/';

gulp.task('jshint', function() {
  return gulp.src('js/**/*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'));
});

gulp.task('clean', function (cb) {
  del([destination + '**'], cb);
});

gulp.task('build:js', function() {
  return gulp.src('js/**/*.js')
    .pipe(concat('angular-casino-lights.js'))
    .pipe(gulp.dest(destination))
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest(destination));
});

gulp.task('default', ['jshint', 'clean', 'build:js']);
