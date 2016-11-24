// NPM IMPORTS
import devapt from 'devapt'

// DEVTOOLS IMPORTS
import common_mw from '../common_mw'


const RenderingBuilder = devapt.RenderingBuilder
const renderer = new RenderingBuilder(devapt.runtime)


// SERVICE VIEW CONFIG
export const service_cfg = {
	view:'topology_registry_view',
	title:'Devapt Devtools - Topology Registry',
	label:'Devtools',
	url:'devtools'
}


// SERVICE MIDDLEWARE
export default common_mw(renderer, 'topology_registry_view', 'default_menubar', 'Devapt Devtools - Topology Registry')
