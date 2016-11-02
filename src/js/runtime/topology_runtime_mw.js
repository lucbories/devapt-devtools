// NPM IMPORTS
import devapt from 'devapt'

// DEVTOOLS IMPORTS
import common_mw from '../common_mw'


const Render = devapt.Render
const renderer = new Render()


// SERVICE VIEW CONFIG
export const service_cfg = {
	view:'topology_runtime_view',
	title:'Devapt Devtools - Topology Runtime',
	label:'Devtools',
	url:'devtools'
}


// SERVICE MIDDLEWARE
export default common_mw(renderer, 'topology_runtime_view', 'default_menubar', 'Devapt Devtools - Topology Runtime')
