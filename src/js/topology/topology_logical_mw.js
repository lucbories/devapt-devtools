
// NPM IMPORTS

// DEVAPT CORE COMMON IMPORTS
import RenderingBuilder from 'devapt-core-common/dist/js/rendering/rendering_builder'
import runtime          from 'devapt-core-common/dist/js/base/runtime'

// DEVTOOLS IMPORTS
import common_mw from '../common_mw'
import Topology from './topology'


// const context = 'devtools/topology/topology_logical_mw'

const renderer = new RenderingBuilder(runtime)

const topology = new Topology('topology_logical', { render:renderer })


// SERVICE VIEW CONFIG
export const service_cfg = {
	view:topology,
	title:'Devapt Devtools - Topology',
	label:'Devtools',
	url:'devtools'
}


// SERVICE MIDDLEWARE
export default common_mw(renderer, topology, 'default_menubar', 'Devapt Devtools - Topology')
