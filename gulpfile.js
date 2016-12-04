
'use strict'

var del = require('del')
var gulp = require('gulp')
var sourcemaps = require('gulp-sourcemaps')
var babel = require('gulp-babel')
var changed = require('gulp-changed')
var livereload = require('gulp-livereload')


var source = require('vinyl-source-stream')
var Buffer = require('vinyl-buffer')
var browserify = require('browserify')


var SRC_JS_ALL = 'src/js/**/*.js'

var SRC_RESOURCES_JSON = 'src/resources/**/*.json'
var SRC_RESOURCES_JADE = 'src/jade/**/*.jade'
var SRC_RESOURCES_TEMPLATE = 'src/resources/**/*.template'
var SRC_RESOURCES_INCLUDE = 'src/resources/**/*.include'
var SRC_RESOURCES_ALL = 'src/resources/**/*'

var SRC_PUBLIC_ALL = 'src/public/**/*'
var SRC_PUBLIC_JS = 'src/public/**/*.js'
var SRC_DEVAPT_BROWSER = 'node_modules/devapt/dist/devapt-browser.js*'
var SRC_PUBLIC_CSS = 'src/public/**/*.css'

var DST = 'dist'
var DST_ALL_JS = 'dist/js'
var DST_ALL_JADE = 'dist/jade'
var DST_ALL_RESOURCES = 'dist/resources'

// var DST_PUBLIC = 'public'

var DST_PUBLIC_JS = 'public/assets/js'
var DST_PUBLIC_JS_BUNDLE = 'app.js'
var DST_PUBLIC_JS_TMP = 'dist/public/js'

var DST_DEVAPT_BROWSER = 'public/assets/js'

var DST_PUBLIC_CSS = 'public/assets/css'

const BABEL_CONFIG = {
	presets: ['es2015']
}



// **************************************************************************************************
// DEVAPT-DEVTOOLS - RESTART
// **************************************************************************************************
/*
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
	(done) => {
		killChild()
		return done()
	}
)

gulp.task('restart',
	(done) => {
		killChild()
		child = cp.fork('./dist/js/start_master.js')
		
		console.log('restarted with pid %i', child.pid)
		return done()
	}
)
*/


// **************************************************************************************************
// DEVAPT-DEVTOOLS - SRC - ALL JS
// **************************************************************************************************
/*
	BUILD ALL SRC/ JS FILES TO DIST/
		with sourcemap files
		build only changed files
*/
gulp.task('build_all_js',
	() => {
		return gulp.src(SRC_JS_ALL)
			.pipe(changed(DST_ALL_JS))
			.pipe(sourcemaps.init())
			.pipe( babel(BABEL_CONFIG) )
			.pipe(sourcemaps.write('.'))
			.pipe(gulp.dest(DST_ALL_JS))
	}
)


gulp.task('watch_js',
	() => {
		gulp.watch(SRC_JS_ALL, gulp.series('build_all_js'/*, 'restart'*/) )
		.on('change',
			(path, stats) => {
				console.log('File ' + path + ' was changed, running tasks watch_js...')
			}
		)
		.on('unlink',
			(path, stats) => {
				console.log('File ' + path + ' was deleted, running tasks watch_js...')
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

gulp.task('build_resources', gulp.series('build_all_json', 'build_all_jade', 'build_all_template', 'build_all_include') )

gulp.task('watch_resources',
	() => {
		gulp.watch(SRC_RESOURCES_ALL, gulp.series('build_resources', 'restart') )
		.on('change',
			(path, stats) => {
				console.log('File ' + path + ' was changed, running tasks watch_resources...')
			}
		)
		.on('unlink',
			(path, stats) => {
				console.log('File ' + path + ' was deleted, running tasks watch_resources...')
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
	() => {
		return browserify( { entries: DST_PUBLIC_JS_TMP + '/app.js' } )
			.ignore('sequelize')
			.ignore('restify')
			.ignore('socket.io')
			.ignore('node-forge')
			.external('client_runtime')
			.external('forge-browser')
			.external('ui')
			.bundle()
			.pipe( source(DST_PUBLIC_JS_BUNDLE) )
			.pipe( new Buffer() )
			.pipe(sourcemaps.write('.'))
			.pipe( gulp.dest(DST_PUBLIC_JS) )
			.pipe( livereload() )
	}
)

gulp.task('build_public_js', gulp.series('build_public_js_transpile', 'build_public_js_bundle') )

gulp.task('watch_public_js',
	() => {
		gulp.watch(SRC_PUBLIC_JS, gulp.series('build_public_js', 'restart') )
		.on('change',
			(path, stats) => {
				console.log('File ' + path + ' was changed, running tasks watch_public_js...')
			}
		)
		.on('unlink',
			(path, stats) => {
				console.log('File ' + path + ' was deleted, running tasks watch_public_js...')
			}
		)
	}
)



// **************************************************************************************************
// DEVAPT-DEVTOOLS - PUBLIC - CSS
// **************************************************************************************************

gulp.task('build_public_css_bundle',
	() => {
		return gulp.src(SRC_PUBLIC_CSS)
			.pipe(changed(DST_PUBLIC_CSS))
			.pipe(gulp.dest(DST_PUBLIC_CSS))
			.pipe( livereload() )
	}
)

gulp.task('build_public_css', gulp.series('build_public_css_bundle', (done)=>done() ) )

gulp.task('watch_public_css',
	() => {
		gulp.watch(SRC_PUBLIC_CSS, gulp.series('build_public_css', 'restart') )
		.on('change',
			(path, stats) => {
				console.log('File ' + path + ' was changed, running tasks watch_public_css...')
			}
		)
		.on('unlink',
			(path, stats) => {
				console.log('File ' + path + ' was deleted, running tasks watch_public_css...')
			}
		)
	}
)



// **************************************************************************************************
// DEVAPT-DEVTOOLS - PUBLIC - DEVAPT
// **************************************************************************************************

gulp.task('copy_devapt_public',
	() => {
		return gulp.src(SRC_DEVAPT_BROWSER)
			.pipe(changed(DST_DEVAPT_BROWSER))
			.pipe(gulp.dest(DST_DEVAPT_BROWSER))
			.pipe( livereload() )
	}
)

gulp.task('watch_public_devapt',
	() => {
		gulp.watch(SRC_DEVAPT_BROWSER, gulp.series('copy_devapt_public') )
		.on('change',
			(path, stats) => {
				console.log('File ' + path + ' was changed, running tasks watch_public_devapt...')
			}
		)
		.on('unlink',
			(path, stats) => {
				console.log('File ' + path + ' was deleted, running tasks watch_public_devapt...')
			}
		)
	}
)



// **************************************************************************************************
// DEVAPT-DEVTOOLS - PUBLIC
// **************************************************************************************************

gulp.task('public', gulp.series('copy_devapt_public', 'build_public_js', 'build_public_css') )

gulp.task('watch_public',
	() => {
		gulp.watch(SRC_PUBLIC_ALL, gulp.series('build_public_js', 'restart') )
		.on('change',
			(path, stats) => {
				console.log('File ' + path + ' was changed, running tasks watch_public...')
			}
		)
		.on('unlink',
			(path, stats) => {
				console.log('File ' + path + ' was deleted, running tasks watch_public...')
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
	(done) => {
		return livereload.listen() || done()
	}
)

gulp.task('clean',
	() => {
		return del(DST)
	}
)

var watch_tasks = ['default', 'watch_js', 'watch_resources', 'watch_public_js', 'watch_public_devapt'/*, 'livereload'*/]

gulp.task('default', gulp.series('public', 'build_all_js', 'build_all_json', 'build_all_jade', 'build_all_template', 'build_all_include') )
gulp.task('watch', gulp.series(...watch_tasks) )
