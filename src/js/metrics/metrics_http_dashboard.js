
import T from 'typr'
import assert from 'assert'
import devapt from 'devapt'



const Render = devapt.Render
const render = new Render('unused', 'unused', 'unused')
const Table = render.rendering_manager.get_feature_class('Table')

const context = 'devtools/metrics/metrics_http_dashboard'



export default class MetricsHttpTable extends Table
{
	constructor(arg_name, arg_settings)
	{
		// BROWSER SCRIPT
		const js = `
			$(document).ready(
				function()
				{
					const table = window.devapt().ui('${arg_name}')
					
					table.init = function()
					{
						var arg_table_id = this.get_dom_id()
						var jqo = $("#" + arg_table_id)
						jqo.append( $("<tr> <td>Global</td> <td>Counter</td> <td id='" + arg_table_id + "_id_counter'>0</td> </tr>") )
						jqo.append( $("<tr> <td></td> <td>Min latency</td> <td id='" + arg_table_id + "_latency_min'>0</td> </tr>") )
						jqo.append( $("<tr> <td></td> <td>Mean latency</td> <td id='" + arg_table_id + "_latency_mean'>0</td> </tr>") )
						jqo.append( $("<tr> <td></td> <td>Max latency</td> <td id='" + arg_table_id + "_latency_max'>0</td> </tr>") )
					}
					
					table.update_metrics = function(arg_values)
					{
						const arg_table_id = this.get_dom_id()
						
						// console.log(arg_table_id, arg_values, 'table.update_metrics')
						
						$("#" + arg_table_id + "_id_counter").text(arg_values.id_counter)
						$("#" + arg_table_id + "_latency_min").text(arg_values.latency_min)
						$("#" + arg_table_id + "_latency_mean").text(arg_values.latency_mean)
						$("#" + arg_table_id + "_latency_max").text(arg_values.latency_max)
					}
					table.init()
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
		const json = require('../../resources/devtools/ui_metrics.json')
		const state = json.views[this.get_name()].settings.state
		return state
		/*return {
			headers: ['category', 'measure', 'value'],
			items: [],
			label:'Metrics Http dashboard',
			show_label:false,
			show_headers:true,
			
			bindings: {
				services:[
					{
						service:'metrics_http',
						method:'get',
						transform:{
							result_type:'object',
							fields:[
								{
									name:'id_counter',
									path:'id_counter'
								},
								{
									name:'latency_min',
									path:'latency_min'
								},
								{
									name:'latency_mean',
									path:'latency_mean'
								},
								{
									name:'latency_max',
									path:'latency_max'
								}
							]
						},
						target_view:this.get_name(),
						target_method:'update_metrics',
						options:{
							method: { poll_interval:3000, poll_name:'metrics_http_table' }
						}
					}
				]
			}
		}*/
	}
}
