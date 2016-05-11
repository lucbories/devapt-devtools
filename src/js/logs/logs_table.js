
import T from 'typr'
import assert from 'assert'
import devapt from 'devapt'



const Render = devapt.Render
const render = new Render('unused', 'unused', 'unused')
const Table = render.rendering_manager.get_feature_class('Table')

const context = 'devtools/logs/logs_table'



export default class LogsTable extends Table
{
	constructor(arg_name, arg_settings)
	{
        // UPDATE SETTINGS
		const js_bind = `
			$(document).ready(
				function()
				{
					var logs_to_record = function (arg_stream_record) {
						if (arg_stream_record.datas)
						{
							arg_stream_record = arg_stream_record.datas
						}
						var rows = []
						if (arg_stream_record.ts && arg_stream_record.level && arg_stream_record.logs && arg_stream_record.logs.forEach)
						{
							var ts = arg_stream_record.ts
							var level = arg_stream_record.level
							arg_stream_record.logs.forEach(
								function(text) { rows.push([ts, level, text]) }
							)
						}
						return rows
					}
					
					var ui = window.devapt().ui()
					var logs_table = ui.get('${arg_name}')
					if (logs_table)
					{
						logs_table.bind_svc('logs', 'post', logs_to_record, logs_table, 'prepend_rows')
					}
				}
			)
		`
		arg_settings = T.isObject(arg_settings) ? arg_settings : {}
		arg_settings.scripts = [js_bind]
		
		// DEFINE INITIAL STATE
		arg_settings.state = undefined
		
		// DEFINE CLASS
		super(arg_name, arg_settings)
		// console.log(this.state, 'state for ' + this.get_name())
		
		this.$type = 'Table'
        
        // GET RENDERER
		const render = arg_settings.render ? arg_settings.render : null
		assert( T.isObject(render) && render.is_render, context + ':bad render object')
		this.renderer = render
	}
	
	
	// MUTABLE STATE
	get_initial_state()
	{
		return {
			headers: ['ts', 'level', 'text'],
			items: [],
			name:this.get_name(),
			type:'Table',
			label:'Logs table',
			show_label:false,
			show_headers:true
		}
	}
}
