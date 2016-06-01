
import T from 'typr'
import assert from 'assert'
import devapt from 'devapt'



const Render = devapt.Render
const render = new Render('unused', 'unused', 'unused')
const Table = render.rendering_manager.get_feature_class('Table')

const context = 'devtools/metrics/one_record_table'



export default class OneRecordTable extends Table
{
	constructor(arg_name, arg_settings)
	{
        // DEFINE SETTINGS
		assert( T.isObject(arg_settings), context + '::bad settings object')
		assert( T.isObject(arg_settings.state), context + '::bad settings state object')
		assert( T.isArray(arg_settings.state.fields), context + '::bad settings state fields array')
		assert( T.isArray(arg_settings.state.labels), context + '::bad settings state labels array')
		
		// DEFINE CLASS
		super(arg_name, arg_settings)
		
        // GET RENDERER
		// const render = arg_settings.render ? arg_settings.render : null
		// assert( T.isObject(render) && render.is_render, context + ':bad render object')
		// this.renderer = render
	}
	
	
	// MUTABLE STATE
	// get_initial_state()
	// {
	// 	const json = require('../../resources/devtools/ui_metrics.json')
	// 	const state = json.views[this.get_name()].settings.state
	// 	return state
	// }
}
