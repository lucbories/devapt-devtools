
import T from 'typr'
import assert from 'assert'
import devapt from 'devapt'



const Render = devapt.Render
const renderer = new Render('unused', 'unused', 'unused', undefined)
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
		const json = require('../../resources/devtools/ui_topology.json')
		const state = json.views[this.get_name()].settings.state
		return state
	}
}
