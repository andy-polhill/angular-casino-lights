'use strict';

var gulp = require('gulp');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var del = require('del');

var destination = 'dist/';

var paths = {
  sass: ['scss/***.scss'],
  scripts: ['js/**/*.js', 'fonts/casino-raleway.js']
};

gulp.task('jshint', function() {
  return gulp.src(paths.scripts)
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'));
});

gulp.task('clean', function (cb) {
  del([destination + '**'], cb);
});

gulp.task('styles', function () {
  gulp.src(paths.sass)
    .pipe(gulp.dest(destination));

  gulp.src(paths.sass)
    .pipe(gulp.dest(destination))
    .pipe(sass())
    .pipe(concat('casino-lights.css'))
    .pipe(gulp.dest(destination));
});

gulp.task('scripts', function() {
  return gulp.src(paths.scripts)
    .pipe(concat('casino-lights.js'))
    .pipe(gulp.dest(destination))
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest(destination));
});

gulp.task('default', ['jshint', 'clean', 'scripts', 'styles']);
