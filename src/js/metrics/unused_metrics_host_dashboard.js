
import T from 'typr'
import assert from 'assert'
import devapt from 'devapt'



const Render = devapt.Render
const render = new Render('unused', 'unused', 'unused')
const Table = render.rendering_manager.get_feature_class('Table')

const context = 'devtools/metrics/metrics_host_dashboard'



export default class MetricsHostDashboard extends Table
{
	constructor(arg_name, arg_settings)
	{
		// BROWSER SCRIPT
		const js = `
			$(document).ready(
				function()
				{
					var HOST_FIELDS = [
						'hostname',
						
						'cpus_arch',
						'cpus_count',
						
						'cpus_user_mean',
						'cpus_nice_mean',
						'cpus_sys_mean',
						'cpus_idle_mean',
						'cpus_irq_mean'
					]
					
					var HOST_LABELS = [
						'HOSTNAME',
						
						'CPU ARCH',
						'CPU COUNT',
						
						'CPUS USER',
						'CPUS NICE',
						'CPUS SYS',
						'CPUS IDLE',
						'CPUS IRQ'
					]
					
					const table = window.devapt().ui('${arg_name}')
					
					table.init = function()
					{
						var table_id = this.get_dom_id()
						this.table_jqo = $("#" + table_id)
						this.hostnames = {}
					}
					
					
					table.update_hostnames = function(arg_hostnames)
					{
						var self = this
						// console.log(arg_hostnames, 'table.update_hostnames:arg_hostnames')
						
						if (typeof arg_hostnames != "object")
						{
							return
						}
						arg_hostnames = arg_hostnames.hostnames
						
						arg_hostnames.forEach(
							function(hostname, index)
							{
								self.add_hostname(hostname)
							}
						)
					}
					
					
					table.add_hostname = function(arg_hostname)
					{
						// console.log(arg_hostname, 'table.add_hostname:arg_hostname')
						if (arg_hostname in this.hostnames)
						{
							return
						}
						
						var row_id = this.get_dom_id() + '_' + arg_hostname
						var html = '<tr colspan="3" id="' + row_id + '"><td>' + arg_hostname + '</td></tr>'
						
						HOST_FIELDS.forEach(
							function(field, index)
							{
								html += '<tr> <td></td> <td>' + HOST_LABELS[index] + '</td> <td id="' + row_id + '_' + field + '">0</td> </tr>'
							}
						)
						
						$('tbody', this.table_jqo).append(html)
						this.hostnames[arg_hostname] = row_id
					}
					
					
					table.update_metrics = function(arg_values)
					{
						var self = this
						
						if (! arg_values)
						{
							console.log(table_id, 'no values', 'table.update_metrics')
							return
						}
						
						const table_id = this.get_dom_id()
						
						// console.log(table_id, arg_values, 'table.update_metrics')
						
						arg_values = Array.isArray(arg_values) ? arg_values : [arg_values]
						
						arg_values.forEach(
							function(metrics)
							{
								if (metrics)
								{
									self.update_hostname_metrics(metrics)
								}
							}
						)
					}
					
					table.update_hostname_metrics = function(arg_metrics)
					{
						var self = this
						
						// console.log(arg_metrics, 'table.update_hostname_metrics:metrics')
						if (! arg_metrics || ! arg_metrics.hostname || ! (arg_metrics.hostname in self.hostnames) )
						{
							return
						}
						
						var row_id = self.hostnames[arg_metrics.hostname]
						// console.log(row_id, 'table.update_hostname_metrics:row_id')
						
						HOST_FIELDS.forEach(
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
		
		this.$type = 'MetricsHostTable'
        
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
