
// import fs from 'fs'
import path from 'path'
// import cp from 'child_process'
import chokidar from 'chokidar'

import devapt from 'devapt'
import Foundation6 from 'devapt-features-foundation6'


const runtime = devapt.runtime


const optional_trace_settings = {
	// RUNTIME STAGES TRACE SETTINGS
	"stages":{
		"enabled":true, // TODO
		
		/**
		* Runtime Stage 0 consists of:
		* 		- create node
		* 		- create bus or connect to bus
		*/
		"RuntimeStage0":{
			"enabled":false
		},
		
		/**
		* Runtime Stage 1 consists of:
		* 		- load master apps settings
		*		- load security setting
		*/
		"RuntimeStage1":{
			"enabled":false
		},
		
		/**
		* Runtime Stage 2 consists of:
		* 		- create node servers
		* 		- create services
		*/
		"RuntimeStage2":{
			"enabled":false
		},
		
		/**
		* Runtime Stage 3 consists of:
		* 		- create connexions, modules and plugins
		*/
		"RuntimeStage3":{
			"enabled":false
		},
		
		/**
		* Runtime Stage 4 consists of:
		* 		- create applications
		*/
		"RuntimeStage4":{
			"enabled":false
		},
		
		/**
		* Runtime Stage 5 consists of:
		* 		- enable servers
		*/
		"RuntimeStage5":{
			"enabled":false
		}
	}
}


const runtime_settings = {
	'is_master':true,
	'name':'NodeA',
	
	'master':{
		'name':'NodeA',
		'host':'localhost',
		'port':5000
	},
	
	'base_dir': path.join(__dirname, '..'),
	
	"settings_provider": {
		'source':'local_file',
		'relative_path':'resources/world.json'
	},
	
	'trace': optional_trace_settings
}



// LOAD RUNTIME AND PLUGINS
runtime.load(runtime_settings)
.then(
	(/*result*/) => {
		const plugins_mgr = runtime.get_plugins_factory().get_rendering_manager()
		const plugin = new Foundation6(plugins_mgr)

		plugins_mgr.load_at_first(plugin)
	},
	
	(reason) => {
		console.log('runtime.load failure for ', reason)
	}
)
.catch(
	(e) => {
		console.log('runtime.load exception with ', e)
	}
)


	
	
/**
 * 
 */
function reload_file(arg_file_path)
{
	if ( path.extname(arg_file_path) == '.js' )
	{
		const full_path = path.resolve(arg_file_path)
		
		console.info('Reloading: ' + full_path)
		
		delete require.cache[full_path]
		require(full_path)
	}
}


/**
 * Watch directory files.
 * @param {string} arg_src_dir - source directory
 * @returns {object} - watcher object
 */
function watch(arg_src_dir)
{
	console.info('Watching for change on: ' + arg_src_dir)
	
	const watch_settings = { ignored: /[\/\\]\./, persistent: true }
	var watcher = chokidar.watch(arg_src_dir, watch_settings)
	watcher.on('change', reload_file)
	
	return watcher
}


/**
 * Stop watching files.
 * @param {object} - watcher object
 * @returns {nothing}
 */
function unwatch(arg_watcher)
{
	arg_watcher.close()
}

const should_trace = true
const SRC_DIR = __dirname
if (should_trace)
{
	watch(SRC_DIR)
}


// var server = null
// function restart(arg_file_path)
// {
// 	console.info('Restarting: ' + arg_file_path)
// 	server.kill()
// 	server = cp.fork('server.js')
// }


process.on('SIGTERM',
	function()
	{
		unwatch()
		process.exit()
	}
)
