
import T from 'typr'
import assert from 'assert'
import devapt from 'devapt'



const runtime = devapt.runtime
// const Component = devapt.Component
const Container = devapt.Container

const context = 'devtools/metrics/metrics_tree'



export default class MetricsTree extends Container
{
	constructor(arg_name, arg_settings)
	{
        // GET RENDERER
		const render = arg_settings.render ? arg_settings.render : undefined
		assert( T.isObject(render) && render.is_render, context + ':bad render object')
		delete arg_settings.render
		
        // UPDATE SETTINGS
		arg_settings = T.isObject(arg_settings) ? arg_settings : {}
		arg_settings.styles = []
		arg_settings.headers = ['<meta keywords="metrics_tree" />']
		
		super(arg_name, arg_settings)
		
		this.$type = 'MetricsTree'
		this.renderer = render


		// GET METRICS STATE
		const metrics_server = runtime.node.metrics_server
		const http_state = metrics_server.get_http_metrics_state_values()

		// CREATE STATE TREE
		const settings = { state:{tree:http_state, label:'HTTP Metrics Tree'} }
		let tree = this.renderer.rendering_manager.create('Tree', this.get_name() + '_state_tree', settings)
		assert( T.isObject(tree) && tree.is_component, context + ':bad Tree component object')
		
		this.add_child(tree)
	}
	
	
	// MUTABLE STATE
	get_initial_state()
	{
		return {}
	}
	
	
	// RENDERING
	render()
	{
		assert( T.isObject(this.state), context + ':bad state object')
		
		return this.render_children()
	}
}
