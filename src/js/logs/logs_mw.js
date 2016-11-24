// NPM IMPORTS
import devapt from 'devapt'

// DEVTOOLS IMPORTS
import common_mw from '../common_mw'


const RenderingBuilder = devapt.RenderingBuilder
const renderer = new RenderingBuilder(devapt.runtime)


// SERVICE VIEW CONFIG
export const service_cfg = {
	view:'logs_view',
	title:'Devapt Devtools - Logs',
	label:'Devtools',
	url:'devtools'
}


// SERVICE MIDDLEWARE
export default common_mw(renderer, 'logs_view', 'default_menubar', 'Devapt Devtools - Logs')
