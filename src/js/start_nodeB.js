
import path from 'path'
import devapt from 'devapt'



const runtime = devapt.runtime



const runtime_settings = require('../resources/nodes/nodeB.json')
runtime_settings.base_dir = path.join(__dirname, '..')
// runtime_settings.is_master = false

// const runtime_settings = {
// 	'is_master':false,
// 	'name':'NodeB',
	
// 	'master':{
// 		'name':'NodeA',
// 		'host':"localhost",
// 		'port':5000
// 	}
// }

runtime.load(runtime_settings)


process.on('SIGTERM',
	function()
	{
		process.exit()
	}
)
