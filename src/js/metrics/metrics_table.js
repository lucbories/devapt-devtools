
import T from 'typr'
import assert from 'assert'
import devapt from 'devapt'



const Render = devapt.Render
const render = new Render('unused', 'unused', 'unused')
const Table = render.rendering_manager.get_feature_class('Table')

const context = 'devtools/metrics/metrics_table'



export default class MetricsTable extends Table
{
	constructor(arg_name, arg_settings)
	{
        // DEFINE SETTINGS
		const js_bind = `
			$(document).ready(
				function()
				{
					var metrics_to_record = function (arg_stream_record)
					{
						if (arg_stream_record.datas)
						{
							arg_stream_record = arg_stream_record.datas
						}
						var rows = []
						if (arg_stream_record && arg_stream_record.metric && arg_stream_record.metrics && arg_stream_record.metrics.forEach)
						{
							var metric = arg_stream_record.metric
							arg_stream_record.metrics.forEach(
								function(metric_record) {
									var row = [metric]
									row.push(metric_record.pid)
									row.push(metric_record.service.url)
									row.push(metric_record.server.server_name)
									row.push(metric_record.service.method)
									row.push(metric_record.response.status)
									row.push(metric_record.latency)
									rows.push(row)
								}
							)
						}
						return rows
					}
					
					var ui = window.devapt().ui()
					
					var metrics_table = ui.get('${arg_name}')
					// console.log(metrics_table, '${arg_name}')
					// console.log(ui.state, 'ui.state')
					
					if (metrics_table)
					{
						metrics_table.bind_svc('metrics', 'post', metrics_to_record, metrics_table, 'prepend_rows')
					}
				}
			)
		`
		arg_settings = T.isObject(arg_settings) ? arg_settings : {}
		arg_settings.scripts = [js_bind]
		
		// DEFINE INITIAL STATE
		const state = undefined
		
		// DEFINE CLASS
		super(arg_name, arg_settings, state)
		
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
			headers: ['protocole', 'pid', 'url', 'server', 'method', 'status', 'latency'],
			items: [],
			label:'Metrics table',
			show_label:false,
			show_headers:true
		}
	}
}
