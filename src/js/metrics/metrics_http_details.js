
// import T from 'typr'
// import assert from 'assert'
import devapt from 'devapt'

const runtime = devapt.runtime
const plugins_mgr = runtime.get_plugins_factory().get_rendering_manager()
const Table = plugins_mgr.get_feature_class('Table')


// const context = 'devtools/metrics/metrics_http_details'



export default class MetricsHttpDetails extends Table
{
	constructor(arg_name, arg_settings)
	{
		// DEFINE CLASS
		super(arg_name, arg_settings)
		
		this.$type = 'Table'
	}
	
	
	// MUTABLE STATE
	get_initial_state()
	{
		const state = devapt.store.get_view(this.get_name()).state
		return state
	}
}
