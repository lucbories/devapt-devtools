
import T from 'typr'
import assert from 'assert'
import devapt from 'devapt'


const Render = devapt.Render
const render = new Render('unused', 'unused', 'unused')
const Table = render.rendering_manager.get_feature_class('Table')

const context = 'devtools/metrics/metrics_http_details'



export default class MetricsTable extends Table
{
	constructor(arg_name, arg_settings)
	{
        // DEFINE SETTINGS
		const js_bind = `
			$(document).ready(
				function()
				{
					window.devapt().ui('${arg_name}')
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
		const json = require('../../resources/devtools/ui_metrics.json')
		const state = json.views[this.get_name()].settings.state
		return state
		/*return {
			headers: ['protocole', 'pid', 'url', 'server', 'method', 'status', 'latency'],
			items: [],
			label:'Metrics table',
			show_label:false,
			show_headers:true,
			has_scroll:true,
			
			strategy:{
				update_mode:'prepend',
				resize_mode:'remove_last',
				resize_max:10
			},
			
			// max_rows:100,
			// max_rows_action:'remove_bottom',
			
			bindings: {
				services:[
					{
						service:'metrics_http',
						method:'post',
						transform:{
							result_type:'array',
							flat_field_name:'metrics',
							flat_fields:[
								{
									name:'pid',
									path:'pid'
								},
								{
									name:'url',
									path:['service', 'url']
								},
								{
									name:'server_name',
									path:['server', 'server_name']
								},
								{
									name:'method',
									path:['service', 'method']
								},
								{
									name:'status',
									path:['response', 'status']
								},
								{
									name:'latency',
									path:['latency']
								}
							],
							fields:[
								{
									name:'metric',
									path:['metric']
								}
							]
						},
						target_view:this.get_name(),
						target_method:'do_action_prepend'
					}
				],
				dom:[
					{
						dom_selector:'#' + this.get_name() + ' thead th:first',
						dom_event:'click',
						transform:undefined,
						target_dom_selector:'#' + this.get_name() + ' thead th:last',
						target_method:'toggle'
					}
				]
			}
		}*/
	}
}
