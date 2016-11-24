// NPM IMPORTS
import devapt from 'devapt'

// DEVTOOLS IMPORTS
import common_mw from '../common_mw'
import Topology from './topology'


// const context = 'devtools/topology/topology_physical_mw'

const RenderingBuilder = devapt.RenderingBuilder
const renderer = new RenderingBuilder(devapt.runtime)

const topology = new Topology('topology_physical', { render:renderer })


// SERVICE VIEW CONFIG
export const service_cfg = {
	view:topology,
	title:'Devapt Devtools - Topology',
	label:'Devtools',
	url:'devtools'
}


// SERVICE MIDDLEWARE
export default common_mw(renderer, topology, 'default_menubar', 'Devapt Devtools - Topology')
