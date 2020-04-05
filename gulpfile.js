const gulp = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();


gulp.task('pug', function () { 
  return gulp.src('src/pug/*.pug')
  .pipe(pug({
    pretty: true
  }))
  .pipe(gulp.dest('dist/'))
  .pipe(browserSync.stream());
});

gulp.task('sass', function() {
  return gulp.src('src/sass/*.sass')
  .pipe(sass().on('error',sass.logError))
  .pipe(gulp.dest('dist/css/'))
  .pipe(browserSync.stream());
});

gulp.task('watch', function () {
  browserSync.init({
		server: {
			baseDir: 'dist'
		},
		notify: false
	});
  gulp.watch('src/pug/**/*.pug', gulp.series('pug'));
  gulp.watch('src/sass/**/*.sass', gulp.series('sass'));
});


gulp.task('default', gulp.parallel(gulp.series('pug', 'sass'), 'watch'));