
// NPM IMPORTS

// DEVAPT CORE COMMON IMPORTS
import RenderingBuilder from 'devapt-core-common/dist/js/rendering/rendering_builder'
import runtime          from 'devapt-core-common/dist/js/base/runtime'

// DEVTOOLS IMPORTS
import common_mw from '../common_mw'


const renderer = new RenderingBuilder(runtime)


// SERVICE VIEW CONFIG
export const service_cfg = {
	view:'topology_runtime_view',
	title:'Devapt Devtools - Topology Runtime',
	label:'Devtools',
	url:'devtools'
}


// SERVICE MIDDLEWARE
export default common_mw(renderer, 'topology_runtime_view', 'default_menubar', 'Devapt Devtools - Topology Runtime')
