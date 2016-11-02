// NPM IMPORTS
import devapt from 'devapt'

// DEVTOOLS IMPORTS
import common_mw from '../common_mw'
import Topology from './topology'


// const context = 'devtools/topology/topology_physical_mw'

const Render = devapt.Render
const renderer = new Render()
// const renderer = new Render('html_assets_1', 'html_assets_1', 'html_assets_1', undefined)

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
