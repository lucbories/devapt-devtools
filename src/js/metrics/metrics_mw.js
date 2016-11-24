// NPM IMPORTS
import devapt from 'devapt'

// DEVTOOLS IMPORTS
import common_mw from '../common_mw'


// HTTP METRICS COMPONENTS
// import MetricsHttpTree from './metrics_http_tree'


// BUS METRICS COMPONENTS


// STANDARD COMPONENTS
const RenderingBuilder = devapt.RenderingBuilder
const renderer = new RenderingBuilder(devapt.runtime)


// BUILD METRICS MAIN UI
const metrics_tabs_settings = devapt.runtime.get_registry().get_view('metrics_tabs')
// const metrics_tabs = new Tabs('metrics_tabs', metrics_tabs_settings)


// SERVICE VIEW CONFIG
export const service_cfg = {
	view:'metrics_tabs',
	title:'Devapt Devtools - Metrics',
	label:'Devtools',
	url:'devtools'
}


// SERVICE MIDDLEWARE
export default common_mw(renderer, 'metrics_tabs', 'default_menubar', 'Devapt Devtools - Metrics')
