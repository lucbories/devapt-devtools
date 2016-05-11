
import T from 'typr'
import assert from 'assert'
import devapt from 'devapt'



const Render = devapt.Render
const render = new Render('unused', 'unused', 'unused')
const Table = render.rendering_manager.get_feature_class('Table')

const context = 'devtools/metrics/metrics_http_table'



export default class MetricsHttpTable extends Table
{
	constructor(arg_name, arg_settings)
	{
		// BROWSER SCRIPT
		const js = `
			$(document).ready(
				function()
				{
					var runtime_settings = {}
					var ClientRuntime = require('client_runtime').default
					var runtime = new ClientRuntime()
					runtime.load(runtime_settings)
					
					function ui_poll_stream(arg_runtime, arg_svc_name, arg_table_id, arg_data_transform, arg_ui_update)
					{
						arg_runtime.register_service(arg_svc_name, {})
						
						var svc = arg_runtime.service(arg_svc_name)
						var cb = function() {
							// console.log('metrics http table cb')
							svc.get().onValue(
								function (data) {
									// console.log('receive /' + arg_svc_name + '/get:', data)
									
									arg_ui_update(arg_table_id, arg_data_transform(data.datas) )
								}
							)
							setTimeout(cb, 3000)
						}
						
						cb()
					}
					
					
					const metrics_to_record = function(arg_stream_record) {
						/*var values = []
						
						values.push( arg_stream_record.id_counter )
						values.push( arg_stream_record.latency_min )
						values.push( arg_stream_record.latency_mean )
						values.push( arg_stream_record.latency_max )
						
						return values*/
						return arg_stream_record
					}
					
					function ui_table_set_record(arg_table_id, arg_values, arg_options)
					{
						$("#" + arg_table_id + "_id_counter").text(arg_values.id_counter)
						$("#" + arg_table_id + "_latency_min").text(arg_values.latency_min)
						$("#" + arg_table_id + "_latency_mean").text(arg_values.latency_mean)
						$("#" + arg_table_id + "_latency_max").text(arg_values.latency_max)
					}
					
					var arg_table_id = "${arg_name}"
					var jqo = $("#" + arg_table_id)
					jqo.append( $("<tr> <td>Global</td> <td>Counter</td> <td id='" + arg_table_id + "_id_counter'>0</td> </tr>") )
					jqo.append( $("<tr> <td></td> <td>Min latency</td> <td id='" + arg_table_id + "_latency_min'>0</td> </tr>") )
					jqo.append( $("<tr> <td></td> <td>Mean latency</td> <td id='" + arg_table_id + "_latency_mean'>0</td> </tr>") )
					jqo.append( $("<tr> <td></td> <td>Max latency</td> <td id='" + arg_table_id + "_latency_max'>0</td> </tr>") )
					
					ui_poll_stream(runtime, 'metrics', 'metrics_http_table', metrics_to_record, ui_table_set_record)
				}
			)
		`
		
        // DEFINE SETTINGS
		arg_settings = T.isObject(arg_settings) ? arg_settings : {}
		arg_settings.scripts = [js]
		
		// DEFINE INITIAL STATE
		const state = undefined
		
		// DEFINE CLASS
		super(arg_name, arg_settings, state)
		
		this.$type = 'MetricsHttpTable'
        
        // GET RENDERER
		const render = arg_settings.render ? arg_settings.render : null
		assert( T.isObject(render) && render.is_render, context + ':bad render object')
		this.renderer = render
	}
	
	
	// MUTABLE STATE
	get_initial_state()
	{
		return {
			headers: ['category', 'measure', 'value'],
			items: [],
			label:'Metrics Http table',
			show_label:false,
			show_headers:true
		}
	}
}
