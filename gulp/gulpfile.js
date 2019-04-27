const 
	gulp  		 = require('gulp'),
	sass  		 = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	csso 		 = require('gulp-csso'),
	sourcemaps 	 = require('gulp-sourcemaps'),
	image 		 = require('gulp-image'),
	ts 			 = require('gulp-typescript'),
	pug   		 = require('gulp-pug');

/* Watch */
gulp.task('watch', function(end) {
	gulp.watch(['./scss/**/*.scss'], gulp.series("scss"));
	gulp.watch('./pug/**/*.pug', gulp.series("pug"));
	gulp.watch('./ts/**/*.ts', gulp.series("ts"));
	gulp.watch('./img/**/*', gulp.series("image"));
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

/* typescript */
gulp.task("ts", function() {
	return gulp.src('ts/*.ts')
	.pipe(ts({
            noImplicitAny: true,
            outFile: 'script.js'
    	}))
    .pipe(gulp.dest("../view/js"));
});
/* image */
gulp.task('image', () => {
  gulp.src('./img/**/*')
    .pipe(image({
      pngquant: true,
      optipng: false,
      zopflipng: true,
      jpegRecompress: false,
      mozjpeg: true,
      guetzli: false,
      gifsicle: true,
      svgo: true,
      concurrent: 10,
      quiet: true
    }))
    .pipe(gulp.dest('../view/img'));
});