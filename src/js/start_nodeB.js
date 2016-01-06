
import devapt from 'devapt'



const runtime = devapt.runtime

const runtime_settings = {
	'is_master':false,
	'name':'NodeB',
	
	'master':{
		'name':'NodeA',
		'host':"localhost",
		'port':5000
	}
}

runtime.load(runtime_settings)


process.on('SIGTERM',
	function()
	{
		process.exit()
	}
)
