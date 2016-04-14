
import T from 'typr'
import assert from 'assert'
import devapt from 'devapt'

import get_menubar_menus from '../menubar'



const runtime = devapt.runtime
// const config = devapt.config
// const logs = devapt.logs
const Render = devapt.Render
const Component = devapt.Component

const context = 'devtools/metrics/metrics_mw'


/*
export default*/ class Metrics extends Component
{
	constructor(arg_name, arg_settings)
	{
        // UPDATE SETTINGS
		arg_settings = T.isObject(arg_settings) ? arg_settings : {}
		arg_settings.styles = []
		arg_settings.headers = ['<meta keywords="metrics" />']
		
		super(arg_name, arg_settings)
		
		this.$type = 'Metrics'
        
        // GET RENDERER
		const render = arg_settings.render ? arg_settings.render : null
		assert( T.isObject(render) && render.is_render, context + ':bad render object')
		this.renderer = render


		// GET METRICS STATE
		const metrics_server = runtime.node.metrics_server
		const http_state = metrics_server.get_http_metrics().metrics

		// CREATE STATE TREE
		const settings = { state:{tree:http_state, label:'HTTP Metrics'} }
		let tree = this.renderer.rendering_manager.create('Tree', this.name + '_state_tree', settings)
		assert( T.isObject(tree) && tree.is_component, context + ':bad Tree component object')

		this.add_child(tree)
	}
	
	
	// MUTABLE STATE
	get_initial_state()
	{
		return {
		}
	}
	
	
	// RENDERING
	render()
	{
		// console.log(this.state, 'state2')
		assert( T.isObject(this.state), context + ':bad state object')
		
        // CREATE RENDERER
        // const renderer = new Render('html_assets_1', 'html_assets_1', 'html_assets_1')
        
		
    
        // const html = renderer.page('main', {label:'Devapt Devtools - Metrics'})
        //     .hbox('menus', null, {items:get_menubar_anchors('devtools'), label:'Devtools'})
        //         .up()
        //     .button('button1', null, {label:'refresh', action_url:'myurl'})
        //         .up()
        //     .add(tree)
        //         .up()
        //     .script('test', {
        //         scripts:[],
        //         scripts_urls:['js/vendor/browser.min.js'] }, null)
        //     .up()
        //     .render()
		
		// return html
		return this.render_children()
	}
}



export default function(req, res)
{
	const renderer = new Render('html_assets_1', 'html_assets_1', 'html_assets_1', req)
	const metrics = new Metrics('metrics', { render:renderer })
	// const html = metrics.render()

	// res.send(html)


	const html = renderer.page('main', {request:req, label:'Devapt Devtools - Metrics'})
	.menubar('menus', null, {items:get_menubar_menus(), app_url:'devtools', request:req, label:'Devtools'})
	.up()
	.button('button1', null, {label:'mybutton', action_url:'myurl'})
	.up()
	.add(metrics)
	.up()
	.script('test', {
		scripts:[],
		scripts_urls:['js/vendor/browser.min.js'] }, null)
	.up()
	.render()

	res.send(html)
}
