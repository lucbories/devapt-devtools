
import T from 'typr'
// import assert from 'assert'
import devapt from 'devapt'



const Render = devapt.Render
const render = new Render('unused', 'unused', 'unused')
const Table = render.rendering_manager.get_feature_class('Table')

// const context = 'devtools/metrics/metrics_http_dashboard'



export default class MetricsHttpDashboard extends Table
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
	}
	
	
	// MUTABLE STATE
	get_initial_state()
	{
		const state = devapt.store.get_view(this.get_name()).state
		return state
	}
}
