const 
	gulp  		 = require('gulp'),
	sass  		 = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	csso 		 = require('gulp-csso'),
	sourcemaps 	 = require('gulp-sourcemaps'),
	pug   		 = require('gulp-pug');

/* Watch */
gulp.task('watch', function(end) {
	gulp.watch(['./scss/**/*.scss'], gulp.series("scss"));
	gulp.watch('./pug/**/*.pug', gulp.series("pug"));
	end();
});

/* scss */
gulp.task("scss", function(){
	return gulp.src('./scss/**/*.scss')
	.pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(csso())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('../view/css'));
});

/* pug */
gulp.task('pug', function(){
	return gulp.src('./pug/*.pug')
	.pipe(pug({
		pretty: true,
	}))
	.pipe(gulp.dest("../view"));
});
