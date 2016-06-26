
// import fs from 'fs'
import path from 'path'
// import cp from 'child_process'
import chokidar from 'chokidar'
import devapt from 'devapt'

const runtime = devapt.runtime



const DEVAPT_NODE_NAME = 'nodeA'
const DEVAPT_NODE_CFG = '../resources/nodes/' + DEVAPT_NODE_NAME + '.json'



const runtime_settings = require(DEVAPT_NODE_CFG)
runtime_settings.base_dir = path.join(__dirname, '..')
runtime_settings.is_master = true


const DEBUG = false


// LOAD RUNTIME AND PLUGINS
runtime.load(runtime_settings)
.then(
	(result) => {
		if (result)
		{
			// WATCH SRC FILES AND RELOAD
			const SRC_DIR = __dirname
			const SRC_DIR2 = path.join(__dirname, '../../../devapt/dist')
			if (DEBUG)
			{
				watch(SRC_DIR)
				watch(SRC_DIR2)
			}
			
			return
		}
		
		console.log('runtime.load failure')
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

/*
function objectEntries(obj)
{
	let index = 0

	// In ES6, you can use strings or symbols as property keys,
	// Reflect.ownKeys() retrieves both
	// const propKeys = Reflect.ownKeys(obj)
	const propKeys = Object.keys(obj)

	return {
		[Symbol.iterator]() {
			return this
		},
		next() {
			if (index < propKeys.length) {
				const key = propKeys[index]
				index++
				return { value: [key, obj[key]] }
			} else {
				return { done: true }
			}
		}
	}
}*/

	
/**
 * 
 */
function reload_file(arg_file_path)
{
	const file_name = path.basename(arg_file_path)
	const this_file_name = path.basename(__filename)
	if (file_name == this_file_name)
	{
		console.info('Need to reload after change on ' + this_file_name)
		return
	}
	
	const exts = ['.js', '.json']
	const ext = path.extname(arg_file_path)
	const full_path = path.resolve(arg_file_path)
	
	if ((exts.indexOf(ext) > -1) && (full_path in require.cache))
	{
		console.info('Reloading: ' + full_path)
		// console.log(require.cache[full_path].parent.children[0])
		
		delete require.cache[full_path]
		require(full_path)
		
		// TODO: NEED TO RELOAD ALL FILES FOR WHICH THE CHANGE FILE IS A DEPENDENCY
		
		// for(let [file_path, file_obj] of objectEntries(require.cache) )
		// {
		// 	const file_name = path.basename(file_path)
		// 	if (file_name != this_file_name)
		// 	{
		// 		delete require.cache[file_path]
		// 		// require(file_path)
		// 	}
		// }
		
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
