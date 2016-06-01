
'use strict'

var del = require('del')
var gulp = require('gulp')
var sequence = require('run-sequence')
var sourcemaps = require('gulp-sourcemaps')
var babel = require('gulp-babel')
var changed = require('gulp-changed')
var livereload = require('gulp-livereload')


var source = require('vinyl-source-stream')
var buffer = require('vinyl-buffer')
var browserify = require('browserify')


var SRC_JS_ALL = 'src/js/**/*.js'

var SRC_RESOURCES_JSON = 'src/resources/**/*.json'
var SRC_RESOURCES_JADE = 'src/jade/**/*.jade'
var SRC_RESOURCES_TEMPLATE = 'src/resources/**/*.template'
var SRC_RESOURCES_INCLUDE = 'src/resources/**/*.include'
var SRC_RESOURCES_ALL = 'src/resources/**/*'

var SRC_PUBLIC_ALL = 'src/public/**/*'
var SRC_PUBLIC_JS = 'src/public/**/*.js'
var SRC_JSPLUMB = 'node_modules/jsplumb/dist/'
var SRC_JSPLUMB_ALL = 'node_modules/jsplumb/dist/**/*'
var SRC_DEVAPT_BROWSER = 'node_modules/devapt/dist/devapt-browser.js*'

var DST = 'dist'
var DST_ALL_JS = 'dist/js'
var DST_ALL_JADE = 'dist/jade'
var DST_ALL_RESOURCES = 'dist/resources'
var DST_PUBLIC = 'public'
var DST_PUBLIC_JS = 'public/assets/js'
var DST_PUBLIC_JS_BUNDLE = 'app.js'
var DST_PUBLIC_JS_TMP = 'dist/public/js'
var DST_DEVAPT_BROWSER = 'public/assets/js'

const BABEL_CONFIG = {
	presets: ['es2015']
}



// **************************************************************************************************
// DEVAPT-DEVTOOLS - RESTART
// **************************************************************************************************

var cp = require('child_process')

var child = null
function killChild()
{
	console.log('kill pid %i', child.pid)
	if (child)
	{
		child.kill()
		child.disconnect()
		child = null
	}
}

gulp.task('stop',
	(/*callback*/) => {
		killChild()
	}
)

gulp.task('restart',
	(/*callback*/) => {
		killChild()
		child = cp.fork('./dist/js/start_master.js')
		
		console.log('restarted with pid %i', child.pid)
	}
)



// **************************************************************************************************
// DEVAPT-DEVTOOLS - SRC - ALL JS
// **************************************************************************************************
/*
	BUILD ALL SRC/ JS FILES TO DIST/
		with sourcemap files
		build only changed files
*/
gulp.task('build_all_js',
	(/*callback*/) => {
		// try
		// {
		return gulp.src(SRC_JS_ALL)
			.pipe(changed(DST_ALL_JS))
			.pipe(sourcemaps.init())
			.pipe( babel(BABEL_CONFIG) )
			.pipe(sourcemaps.write('.'))
			.pipe(gulp.dest(DST_ALL_JS))
		// }
		// catch(e)
		// {
		// 	console.log('an error occures', Object.keys(e) )
		// }
	}
)


gulp.task('watch_js',
	(/*callback*/) => {
		var watcher_all_js = gulp.watch(SRC_JS_ALL, sequence('build_all_js', 'restart') )
		watcher_all_js.on('change',
			(event) => {
				console.log('File ' + event.path + ' was ' + event.type + ', running tasks watch_js...')
			}
		)
	}
)



// **************************************************************************************************
// DEVAPT-DEVTOOLS - SRC - ALL RESOURCES
// **************************************************************************************************
/*
	COPY ALL SRC/ JSON FILES TO DIST/
		build only changed files
*/
gulp.task('build_all_json',
	() => {
		return gulp.src(SRC_RESOURCES_JSON)
			.pipe(changed(DST_ALL_RESOURCES))
			.pipe(gulp.dest(DST_ALL_RESOURCES))
	}
)


/*
	COPY ALL SRC/ JADE FILES TO DIST/
		build only changed files
*/
gulp.task('build_all_jade',
	() => {
		return gulp.src(SRC_RESOURCES_JADE)
			.pipe(changed(DST_ALL_JADE))
			.pipe(gulp.dest(DST_ALL_JADE))
	}
)


/*
	COPY ALL SRC/ TEMPLATE FILES TO DIST/
		build only changed files
*/
gulp.task('build_all_template',
	() => {
		return gulp.src(SRC_RESOURCES_TEMPLATE)
			.pipe(changed(DST_ALL_RESOURCES))
			.pipe(gulp.dest(DST_ALL_RESOURCES))
	}
)


/*
	COPY ALL SRC/ INCLUDE FILES TO DIST/
		build only changed files
*/
gulp.task('build_all_include',
	() => {
		return gulp.src(SRC_RESOURCES_INCLUDE)
			.pipe(changed(DST_ALL_RESOURCES))
			.pipe(gulp.dest(DST_ALL_RESOURCES))
	}
)

gulp.task('build_resources', ['build_all_json', 'build_all_jade', 'build_all_template', 'build_all_include'])

gulp.task('watch_resources',
	(/*callback*/) => {
		var watcher_all_js = gulp.watch(SRC_RESOURCES_ALL, sequence('build_resources', 'restart') )
		watcher_all_js.on('change',
			(event) => {
				console.log('File ' + event.path + ' was ' + event.type + ', running tasks watch_resources...')
			}
		)
	}
)



// **************************************************************************************************
// DEVAPT-DEVTOOLS - PUBLIC - JS
// **************************************************************************************************
/*
	BUILD ALL SRC/ PUBLIC JS FILES TO PUBLIC/
		with sourcemap files
		build only changed files
*/
gulp.task('build_public_js_transpile',
	() => {
		return gulp.src(SRC_PUBLIC_JS)
			.pipe(changed(DST_PUBLIC_JS_TMP))
			.pipe(sourcemaps.init())
			.pipe(
				babel({
					presets: ['es2015']
				})
			)
			.pipe(sourcemaps.write('.'))
			.pipe(gulp.dest(DST_PUBLIC_JS_TMP))
	}
)


gulp.task('build_public_js_bundle',
	(/*callback*/) => {
		return browserify( { entries: DST_PUBLIC_JS_TMP + '/app.js' } )
			.ignore('sequelize')
			.ignore('restify')
			.ignore('socket.io')
			.external('client_runtime')
			.external('ui')
			.bundle()
			.pipe( source(DST_PUBLIC_JS_BUNDLE) )
			.pipe( buffer() )
			.pipe(sourcemaps.write('.'))
			.pipe( gulp.dest(DST_PUBLIC_JS) )
			.pipe( livereload() )
	}
)

gulp.task('build_public_js',
	(callback) => {
		sequence('build_public_js_transpile', 'build_public_js_bundle', callback)
	}
)

gulp.task('watch_public_js',
	(/*callback*/) => {
		var watcher_public_js = gulp.watch(SRC_PUBLIC_JS, sequence('build_public_js', 'restart') )
		watcher_public_js.on('change',
			(event) => {
				console.log('File ' + event.path + ' was ' + event.type + ', running tasks watch_public_js...')	
			}
		)
	}
)



// **************************************************************************************************
// DEVAPT-DEVTOOLS - PUBLIC - DEVAPT
// **************************************************************************************************

gulp.task('copy_devapt_public',
	(/*callback*/) => {
		return gulp.src(SRC_DEVAPT_BROWSER)
			.pipe(changed(DST_DEVAPT_BROWSER))
			.pipe(gulp.dest(DST_DEVAPT_BROWSER))
			.pipe( livereload() )
	}
)

gulp.task('watch_public_devapt',
	(/*callback*/) => {
		var watcher_devapt = gulp.watch(SRC_DEVAPT_BROWSER, ['copy_devapt_public'])
		watcher_devapt.on('change',
			(event) => {
				console.log('File ' + event.path + ' was ' + event.type + ', running tasks watch_public_devapt...')
			}
		)
	}
)



// **************************************************************************************************
// DEVAPT-DEVTOOLS - PUBLIC - JSPLUMB
// **************************************************************************************************

// gulp.task('build_jsplumb_js',
// 	() => {
// 		return gulp.src(SRC_JSPLUMB + 'js/*.js')
// 			.pipe(changed(DST_PUBLIC + '/assets/js/vendor/jsplumb/js'))
// 			.pipe(gulp.dest(DST_PUBLIC + '/assets/js/vendor/jsplumb/js'))
// 	}
// )
// gulp.task('build_jsplumb_css',
// 	() => {
// 		return gulp.src(SRC_JSPLUMB + 'css/*.css')
// 			.pipe(changed(DST_PUBLIC + '/assets/js/vendor/jsplumb/css'))
// 			.pipe(gulp.dest(DST_PUBLIC + '/assets/js/vendor/jsplumb/css'))
// 	}
// )
// gulp.task('build_jsplumb_img',
// 	() => {
// 		return gulp.src(SRC_JSPLUMB + 'img/*')
// 			.pipe(changed(DST_PUBLIC + '/assets/js/vendor/jsplumb/img'))
// 			.pipe(gulp.dest(DST_PUBLIC + '/assets/js/vendor/jsplumb/img'))
// 	}
// )
// gulp.task('copy_jsplumb_public', ['build_jsplumb_js', 'build_jsplumb_css', 'build_jsplumb_img'])


// gulp.task('watch_public_jsplumb',
// 	(/*callback*/) => {
// 		var watcher_devapt = gulp.watch(SRC_JSPLUMB_ALL, ['copy_jsplumb_public'])
// 		watcher_devapt.on('change',
// 			(event) => {
// 				console.log('File ' + event.path + ' was ' + event.type + ', running tasks watch_public_jsplumb...')
// 			}
// 		)
// 	}
// )



// **************************************************************************************************
// DEVAPT-DEVTOOLS - PUBLIC
// **************************************************************************************************

gulp.task('public', ['copy_devapt_public', 'build_public_js'])

gulp.task('watch_public',
	() => {
		var watcher = gulp.watch(SRC_PUBLIC_ALL, sequence('build_public_js', 'restart') )
		watcher.on('change',
			(event) => {
				console.log('File ' + event.path + ' was ' + event.type + ', running tasks watch_public...')	
			}
		)
	}
)



// **************************************************************************************************
// DEVAPT-DEVTOOLS - MAIN GULP TASKS
// **************************************************************************************************

/*
	LIVE RELOAD SERVER
*/
gulp.task('livereload',
	(/*callback*/) => {
		livereload.listen()
	}
)

gulp.task('clean',
	() => {
		return del(DST)
	}
)

// gulp.task('build_bundles', ['build_bundle_browser', 'build_bundle_common', 'build_bundle_server']);

// gulp.task('release', ['build_all_files', 'build_all_json']);

var watch_tasks = ['watch_js', 'watch_resources', 'watch_public_js', 'watch_public_devapt', 'livereload']
gulp.task('default', ['public', 'build_all_js', 'build_all_json', 'build_all_jade', 'build_all_template', 'build_all_include'])
// gulp.task('watch', ['default', 'watch_js', 'watch_resources', 'watch_public_js', 'watch_public_devapt', 'livereload'])


gulp.task('watch', (/*cb*/) => sequence('default', watch_tasks))
// gulp.task('watch', (/*cb*/) => sequence('default', 'restart', watch_tasks))
