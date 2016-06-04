var gulp = require('gulp'),
	concat = require('gulp-concat');

gulp.task('default', function() {
	return gulp.src(['src/head.js',
					 'src/gcodes.js',
					 'src/mcodes.js',
					 'src/letterAddresses.js',
					 'src/main_loop.js',
					 'src/foot.js'])
		.pipe(concat('gcode_to_svg.js'))
		.pipe(gulp.dest('build/'));
});