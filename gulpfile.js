var gulp = require('gulp');
var concat = require('gulp-concat');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var reload = browserSync.reload;

var paths = {
  sass: ['app/styles/*.scss']
};

// watch files for changes and reload
gulp.task('sass', function () {
  gulp.src(paths.sass)
    .pipe(sass())
    .pipe(concat('main.css'))
    .pipe(gulp.dest('app/styles'))
    .pipe(reload({stream:true}));
});

gulp.task('serve', function() {
  browserSync({
    server: {}
  });
});

gulp.task('default', ['sass', 'serve'], function () {
  gulp.watch('styles/*.scss', {cwd: 'app'}, ['sass']);
  gulp.watch(['*.html', 'scripts/**/*.js'], {cwd: 'app'}, reload);
});
