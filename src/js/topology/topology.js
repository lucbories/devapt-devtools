
// NPM IMPORTS
import assert from 'assert'

// DEVAPT CORE COMMON IMPORTS
import T                from 'devapt-core-common/dist/js/utils/types'
import RenderingBuilder from 'devapt-core-common/dist/js/rendering/rendering_builder'
import runtime          from 'devapt-core-common/dist/js/base/runtime'


const renderer = new RenderingBuilder(runtime, 'unused', 'unused', 'unused', 'unused', undefined)
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
}
