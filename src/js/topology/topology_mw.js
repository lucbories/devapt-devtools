
import T from 'typr'
import assert from 'assert'
import devapt from 'devapt'

import get_menubar_menus from '../menubar'



// const runtime = devapt.runtime
// const config = devapt.config
// const logs = devapt.logs
const Render = devapt.Render
const Component = devapt.Component

const context = 'devtools/topology/topology_mw'


class Topology extends Component
{
	constructor(arg_name, arg_settings)
	{
        // UPDATE SETTINGS
		arg_settings = T.isObject(arg_settings) ? arg_settings : {}
		
		arg_settings.styles = []
		arg_settings.styles_urls = ['js/app.css', 'js/vendor/jsplumb/css/jsPlumbToolkit-defaults.css', 'js/vendor/jsplumb/css/jsPlumbToolkit-demo.css']
		
		arg_settings.headers = ['<meta keywords="topology" />']
		
		super(arg_name, arg_settings, context)
		
		this.$type = 'Topology'
        
		// GET RENDERER
		const render = arg_settings.render ? arg_settings.render : null
		assert( T.isObject(render) && render.is_render, context + ':bad render object')
		this.renderer = render
	}
	
	
	// MUTABLE STATE
	get_initial_state()
	{
		return {
			visible:true
		}
	}
	
	
	// RENDERING
	render()
	{
		// console.log(this.state, 'state2')
		assert( T.isObject(this.state), context + ':bad state object')
		
		const flowchart_container_class = 'jtk-demo-canvas canvas-wide chart-demo jtk-surface jtk-surface-nopan'
		
		let html = ''
		html += '<div id="' + this.get_dom_id() + '_main" class="row">\n'
		
		html += '<div id="' + this.get_dom_id() + '" class="' + flowchart_container_class + '">\n'
		
		html += '<div id="' + this.get_dom_id() + '_world" class="node pos13">'
		html += 'World'
		html += '</div>\n'
		
		html += '<div id="' + this.get_dom_id() + '_node_A" class="node pos22">'
		html += 'Node A'
		html += '</div>\n'
		
		html += '<div id="' + this.get_dom_id() + '_node_B" class="node pos24">'
		html += 'Node B'
		html += '</div>\n'
		
		html += '<div id="' + this.get_dom_id() + '_server_A1" class=" node pos31">'
		html += 'Server A1'
		html += '</div>\n'
		
		html += '<div id="' + this.get_dom_id() + '_server_A2" class=" node pos33">'
		html += 'Server A2'
		html += '</div>\n'
		
		html += '<div id="' + this.get_dom_id() + '_server_B1" class=" node pos34">'
		html += 'Server B1'
		html += '</div>\n'
		
		html += '</div>\n'
		html += '</div>\n'
		
		return html
	}
}

let topology_script = `
	document.getElementById("content").style.display="block";
	
	jsPlumb.ready(
		function()
		{
			const topologyJsPlumb = jsPlumb.getInstance(
				{
					Connector : [ "Bezier", { curviness: 10 } ],
					Anchors : [ "TopCenter", "BottomCenter" ]
				}
			);
			
			topologyJsPlumb.setContainer(topology_id);
			
			topologyJsPlumb.draggable(jsPlumb.getSelector(".node"), { grid: [50, 50] });

			topologyJsPlumb.connect( { source: topology_id + "_world", target:topology_id + "_node_A", anchors: ["Bottom", "Top"] } );
			topologyJsPlumb.connect( { source: topology_id + "_world", target:topology_id + "_node_B", anchors: ["Bottom", "Top"] } );

			topologyJsPlumb.connect( { source: topology_id + "_node_A", target:topology_id + "_server_A1", anchors: ["Bottom", "Top"] } );
			topologyJsPlumb.connect( { source: topology_id + "_node_A", target:topology_id + "_server_A2", anchors: ["Bottom", "Top"] } );

			topologyJsPlumb.connect( { source: topology_id + "_node_B", target:topology_id + "_server_B1", anchors: ["Bottom", "Top"] } );
		}
	);
	
`


export default function(req, res)
{
	const renderer = new Render('html_assets_1', 'html_assets_1', 'html_assets_1', req)
	const topology = new Topology('topology', { render:renderer })

	const html = renderer.page('main', {request:req, label:'Devapt Devtools - Topology'})
	.menubar('menus', null, {items:get_menubar_menus(), app_url:'devtools', request:req, label:'Devtools'})
	.up()
	// .button('button1', null, {label:'mybutton', action_url:'myurl'})
	// .up()
	.add(topology)
	.up()
	.script('topology', {
		scripts:['const topology_id="' + topology.get_dom_id() + '";\n', topology_script],
		scripts_urls:['js/vendor/browser.min.js', 'js/vendor/jsplumb/js/jsPlumb-2.0.7.js', 'js/devapt-browser.js', 'js/app.js'] }, null)
	.up()
	.render()

	res.send(html)
}
