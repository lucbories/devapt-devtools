
// NPM IMPORTS

// DEVAPT CORE COMMON IMPORTS
import RenderingBuilder from 'devapt-core-common/dist/js/rendering/rendering_builder'
import runtime          from 'devapt-core-common/dist/js/base/runtime'

// DEVTOOLS IMPORTS
import common_mw from '../common_mw'


// HTTP METRICS COMPONENTS
// import MetricsHttpTree from './metrics_http_tree'


// BUS METRICS COMPONENTS


// STANDARD COMPONENTS
const renderer = new RenderingBuilder(runtime)


// BUILD METRICS MAIN UI
// const metrics_tabs_settings = runtime.get_registry().get_view('metrics_tabs')
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
