
// import T from 'typr'
// import assert from 'assert'
import devapt from 'devapt'
import common_mw from '../common_mw'
import Topology from './topology'


// const context = 'devtools/topology/topology_physical_mw'

const Render = devapt.Render
const renderer = new Render('html_assets_1', 'html_assets_1', 'html_assets_1', undefined)

const topology = new Topology('topology_physical', { render:renderer })
export default common_mw(renderer, topology, 'Devapt Devtools - Topology', 'Devtools', 'devtools')
