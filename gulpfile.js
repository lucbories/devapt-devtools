
'use strict';

// var del = require('del');
var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var changed = require('gulp-changed');
var browserSync = require('browser-sync').create();



var SRC_ALL_JS = 'src/js/**/*.js';
var SRC_ALL_JSON = 'src/resources/**/*.json';
var SRC_ALL_JADE = 'src/jade/**/*.jade';
var SRC_ALL_TEMPLATE = 'src/resources/**/*.template';
var SRC_ALL_INCLUDE = 'src/resources/**/*.include';

var DST = 'dist';
var DST_ALL_JS = 'dist/js'
var DST_ALL_JADE = 'dist/jade'
var DST_ALL_RESOURCES = 'dist/resources'



/*
    BUILD ALL SRC/ JS FILES TO DIST/
        with sourcemap files
        build only changed files
*/
gulp.task('build_all_js', () => {
    return gulp.src(SRC_ALL_JS)
		.pipe(changed(DST_ALL_JS))
        .pipe(sourcemaps.init())
        .pipe(
            babel({
                presets: ['es2015']
            })
        )
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(DST_ALL_JS));
});


/*
    COPY ALL SRC/ JSON FILES TO DIST/
        build only changed files
*/
gulp.task('build_all_json', () => {
    return gulp.src(SRC_ALL_JSON)
		.pipe(changed(DST_ALL_RESOURCES))
        .pipe(gulp.dest(DST_ALL_RESOURCES));
});


/*
    COPY ALL SRC/ JADE FILES TO DIST/
        build only changed files
*/
gulp.task('build_all_jade', () => {
    return gulp.src(SRC_ALL_JADE)
		.pipe(changed(DST_ALL_JADE))
        .pipe(gulp.dest(DST_ALL_JADE));
});


/*
    COPY ALL SRC/ TEMPLATE FILES TO DIST/
        build only changed files
*/
gulp.task('build_all_template', () => {
    return gulp.src(SRC_ALL_TEMPLATE)
		.pipe(changed(DST_ALL_RESOURCES))
        .pipe(gulp.dest(DST_ALL_RESOURCES));
});


/*
    COPY ALL SRC/ INCLUDE FILES TO DIST/
        build only changed files
*/
gulp.task('build_all_include', () => {
    return gulp.src(SRC_ALL_INCLUDE)
		.pipe(changed(DST_ALL_RESOURCES))
        .pipe(gulp.dest(DST_ALL_RESOURCES));
});



/*
    DEFINE MAIN GULP TASKS
*/
// gulp.task('build_bundles', ['build_bundle_browser', 'build_bundle_common', 'build_bundle_server']);

// gulp.task('release', ['build_all_files', 'build_all_json']);

gulp.task('default', ['build_all_js', 'build_all_json', 'build_all_jade', 'build_all_template', 'build_all_include']);





// var watcher = gulp.watch('js/**/*.js', ['uglify','reload']);
// watcher.on('change', function(event) {
//   console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
// });

gulp.task('js-watch', ['build_all_js'], browserSync.reload);
gulp.task('serve', ['build_all_js'],
    function ()
    {
        // Serve files from the root of this project
        browserSync.init({
            server: {
                baseDir: "./"
            }
        });
    
        // add browserSync.reload to the tasks array to make
        // all browsers reload after tasks are complete.
        var watcher = gulp.watch(SRC_ALL_JS, ['js-watch']);
        watcher.on('change',
            function(event)
            {
                console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
            }
        );
    }
);
