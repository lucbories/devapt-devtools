
import T from 'typr'
import assert from 'assert'
import devapt from 'devapt'



const RenderingBuilder = devapt.RenderingBuilder
const renderer = new RenderingBuilder(devapt.runtime, 'unused', 'unused', 'unused', 'unused', undefined)
const FlowGraph = renderer.rendering_manager.get_feature_class('FlowGraph')
assert( T.isFunction(FlowGraph), context + ':FlowGraph class not found')


const context = 'devtools/topology/topology'



export default class Topology extends FlowGraph
{
	constructor(arg_name, arg_settings)
	{
		arg_settings = FlowGraph.normalize_settings(arg_settings)
		
        // GET RENDERER
		const render = arg_settings.render ? arg_settings.render : undefined
		assert( T.isObject(render) && render.is_render, context + ':bad render object')
		delete arg_settings.render
		
		super(arg_name, arg_settings, context)
		
		this.$type = 'Topology'
		this.renderer = render
	}
	
	
	// MUTABLE STATE
	get_initial_state()
	{
		const state = devapt.runtime.get_registry().get_view(this.get_name()).state
		return state
	}
}
