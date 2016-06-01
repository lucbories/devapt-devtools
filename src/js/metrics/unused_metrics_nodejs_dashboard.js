
import T from 'typr'
import assert from 'assert'
import devapt from 'devapt'



const Render = devapt.Render
const render = new Render('unused', 'unused', 'unused')
const Table = render.rendering_manager.get_feature_class('Table')

const context = 'devtools/metrics/metrics_nodejs_dashboard'



export default class MetricsNodeJsDashboard extends Table
{
	constructor(arg_name, arg_settings)
	{
		// BROWSER SCRIPT
		const js = `
			$(document).ready(
				function()
				{
					var NODEJS_FIELDS = [
						'hostname',
						'runtime_uid',
						
						'process_arch',
						'process_platform',
						
						'process_uptime_mean',
						
						'process_pid',
						'process_version',
						
						'process_memory_shared_mean',
						'process_memory_head_total_mean',
						'process_memory_heap_used_mean'
					]
					
					var NODEJS_LABELS = [
						'HOSTNAME',
						'RUNTIME UID',
						
						'ARCHITECTURE',
						'PLATEFORME',
						'UPTIME',
						'PID',
						'VERSION',
						'MEMORY - SHARED',
						'MEMORY - HEAP TOTAL',
						'MEMORY - HEAP USED'
					]
					
					const table = window.devapt().ui('${arg_name}')
					
					table.init = function()
					{
						var table_id = this.get_dom_id()
						this.table_jqo = $("#" + table_id)
						this.runtimes = {}
					}
					
					
					table.update_runtimes = function(arg_runtimes)
					{
						// console.log(arg_runtimes, 'table.update_runtimes:arg_runtimes')
						
						var self = this
						
						if (typeof arg_runtimes != "object")
						{
							return
						}
						arg_runtimes = arg_runtimes.runtimes
						
						arg_runtimes.forEach(
							function(runtime, index)
							{
								self.add_runtime(runtime)
							}
						)
					}
					
					
					table.add_runtime = function(arg_runtime)
					{
						// console.log(arg_runtime, 'table.add_runtime:arg_runtime')
						
						if (arg_runtime in this.runtimes)
						{
							return
						}
						
						var row_id = this.get_dom_id() + '_' + arg_runtime
						var html = '<tr colspan="3" id="' + row_id + '"><td>' + arg_runtime + '</td></tr>'
						
						NODEJS_FIELDS.forEach(
							function(field, index)
							{
								html += '<tr> <td></td> <td>' + NODEJS_LABELS[index] + '</td> <td id="' + row_id + '_' + field + '">0</td> </tr>'
							}
						)
						
						$('tbody', this.table_jqo).append(html)
						this.runtimes[arg_runtime] = row_id
					}
					
					
					table.update_metrics = function(arg_values)
					{
						// console.log(arg_values, 'table.update_metrics')
						
						var self = this
						
						if (! arg_values)
						{
							console.log(table_id, 'no values', 'table.update_metrics')
							return
						}
						
						const table_id = this.get_dom_id()
						
						// console.log(arg_values, 'table.update_metrics')
						
						arg_values = Array.isArray(arg_values) ? arg_values : [arg_values]
						
						arg_values.forEach(
							function(metrics)
							{
								if (metrics)
								{
									self.update_runtime_metrics(metrics)
								}
							}
						)
					}
					
					table.update_runtime_metrics = function(arg_metrics)
					{
						var self = this
						
						// console.log(arg_metrics, 'table.update_runtime_metrics:metrics')
						if (! arg_metrics || ! arg_metrics.runtime_uid || ! (arg_metrics.runtime_uid in self.runtimes) )
						{
							return
						}
						
						var row_id = self.runtimes[arg_metrics.runtime_uid]
						// console.log(row_id, 'table.update_runtime_metrics:row_id')
						
						NODEJS_FIELDS.forEach(
							function(field, index)
							{
								if (field in arg_metrics)
								{
									var value = arg_metrics[field]
									if (typeof value == 'number')
									{
										value = value.toFixed()
									}
									
									var field_id = row_id + '_' + field
									$("#" + field_id).text(value)
								}
								else
								{
									console.log('field not found in metrics', field, arg_metrics)
								}
							}
						)
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
		
		this.$type = 'MetricsNodeJsTable'
        
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
	}
}
