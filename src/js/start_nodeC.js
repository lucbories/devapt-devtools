
import path from 'path'
import devapt from 'devapt'



const runtime = devapt.runtime



const runtime_settings = require('../resources/nodes/nodeC.json')
runtime_settings.base_dir = path.join(__dirname, '..')
console.log('start C settings', runtime_settings)

runtime.load(runtime_settings)


process.on('SIGTERM',
	function()
	{
		process.exit()
	}
)