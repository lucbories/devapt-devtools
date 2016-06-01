
import T from 'typr'
import assert from 'assert'
import devapt from 'devapt'



const Render = devapt.Render
const render = new Render('unused', 'unused', 'unused')
const Table = render.rendering_manager.get_feature_class('Table')

const context = 'devtools/messages/messages_table'



export default class MessagesTable extends Table
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
		arg_settings.headers = ['<meta keywords="messages_table" />']
		
		// DEFINE INITIAL STATE
		const state = undefined
		
		// DEFINE CLASS
		super(arg_name, arg_settings, state)
		
		this.$type = 'MessagesTable'
        
		this.renderer = render
	}
	
	
	// MUTABLE STATE
	get_initial_state()
	{
		return {
			headers: ['ts', 'sender', 'target'],
			items: [],
			label:'Messages table',
			show_label:false,
			show_headers:true
		}
	}
}
