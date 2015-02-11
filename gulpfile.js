var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    sass = require('gulp-sass'),
    reload = browserSync.reload;

// watch files for changes and reload
gulp.task('sass', function () {
  gulp.src('app/styles/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('app/styles'))
    .pipe(reload({stream:true}));
});

gulp.task('serve', function() {
  browserSync({
    server: {
      baseDir: 'app'
    }
  });
});

gulp.task('default', ['sass', 'serve'], function () {
  gulp.watch('styles/*.scss', {cwd: 'app'}, ['sass']);
  gulp.watch(['*.html', 'scripts/**/*.js'], {cwd: 'app'}, reload);
});
