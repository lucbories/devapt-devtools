
import T from 'typr'
import assert from 'assert'
import devapt from 'devapt'



const Render = devapt.Render
const render = new Render('unused', 'unused', 'unused')
const Table = render.rendering_manager.get_feature_class('Table')

const context = 'devtools/metrics/metrics_bus_dashboard'


/*
export default class MetricsBusDashboard extends Table
{
	constructor(arg_name, arg_settings)
	{
		// BROWSER SCRIPT
		const js = `
			$(document).ready(
				function()
				{
					var BUS_FIELDS = [
						'msg_count',
						'msg_size',
						'errors_count',
						'subscribers_count'
					]
					
					var BUS_LABELS = [
						'COUNT',
						'SIZE',
						'ERRORS',
						'SUBSCRIBERS'
					]
					
					const table = window.devapt().ui('${arg_name}')
					// console.log(table, 'bus table')
					
					table.init = function()
					{
						// console.log('bus table init')
						
						var table_id = this.get_dom_id()
						this.table_jqo = $("#" + table_id)
						this.buses = {}
					}
					
					
					table.update_buses = function(arg_buses)
					{
						// console.log(arg_buses, 'table.update_buses:arg_buses')
						
						var self = this
						
						if (typeof arg_buses != "object")
						{
							return
						}
						arg_buses = arg_buses.buses
						
						arg_buses.forEach(
							function(bus, index)
							{
								self.add_bus(bus)
							}
						)
					}
					
					
					table.add_bus = function(arg_bus)
					{
						// console.log(arg_bus, 'table.add_bus:arg_bus')
						
						if (arg_bus in this.buses)
						{
							return
						}
						
						var row_id = this.get_dom_id() + '_' + arg_bus
						var html = '<tr colspan="3" id="' + row_id + '"><td>' + arg_bus + '</td></tr>'
						
						BUS_FIELDS.forEach(
							function(field, index)
							{
								html += '<tr> <td></td> <td>' + BUS_LABELS[index] + '</td> <td id="' + row_id + '_' + field + '">0</td> </tr>'
							}
						)
						
						$('tbody', this.table_jqo).append(html)
						this.buses[arg_bus] = row_id
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
									self.update_bus_metrics(metrics)
								}
							}
						)
					}
					
					table.update_bus_metrics = function(arg_metrics)
					{
						// console.log(arg_metrics, 'table.update_bus_metrics:metrics')
						
						var self = this
						
						if (! arg_metrics || ! arg_metrics.bus_name || ! (arg_metrics.bus_name in self.buses) )
						{
							return
						}
						
						var row_id = self.buses[arg_metrics.bus_name]
						// console.log(row_id, 'table.update_bus_metrics:row_id')
						
						BUS_FIELDS.forEach(
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
		
		this.$type = 'MetricsBusTable'
        
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
*/