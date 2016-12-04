
import T from 'typr'
import assert from 'assert'
import devapt from 'devapt'



const runtime = devapt.runtime
const Container = devapt.Container

const context = 'devtools/metrics/metrics_tree'



export default class MetricsTree extends Container
{
	constructor(arg_name, arg_settings)
	{
        // UPDATE SETTINGS
		arg_settings = T.isObject(arg_settings) ? arg_settings : {}
		arg_settings.styles = []
		arg_settings.headers = ['<meta keywords="metrics_tree" />']

		super(arg_name, arg_settings)
		
		this.$type = 'MetricsTree'


		// GET METRICS STATE
		const metrics_server = runtime.node.get_metrics_server()
		const http_state = metrics_server ? metrics_server.get_http_metrics_state_values() : {}

		// CREATE STATE TREE
		const settings = {
			state:{
				tree:http_state,
				label:'HTTP Metrics Tree',
				bindings:{
					services:[
						{
							service:"metrics_http",
							method:"get",
							transform:null,
							target_view:'this',
							target_method:"on_refresh",
							options:{
								method: { "interval_milliseconds":5000, "name":"metrics_http_tree" }
							}
						}
					]
				}
			}
		}
		const plugins_mgr = runtime.get_plugins_factory().get_rendering_manager()
		let tree = plugins_mgr.create('Tree', this.get_name() + '_state_tree', settings)
		assert( T.isObject(tree) && tree.is_component, context + ':bad Tree component object')
		
		this.add_child(tree)
	}
	
	
	// RENDERING
	render()
	{
		assert( T.isObject(this.state), context + ':bad state object')
		
		return this.render_children()
	}
}
