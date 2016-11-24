// NPM IMPORTS
import devapt from 'devapt'

// DEVTOOLS IMPORTS
import common_mw from '../common_mw'


const RenderingBuilder = devapt.RenderingBuilder
const renderer = new RenderingBuilder(devapt.runtime)


// SERVICE VIEW CONFIG
export const service_cfg = {
	view:'messages_view',
	title:'Devapt Devtools - Messages',
	label:'Devtools',
	url:'devtools'
}


// SERVICE MIDDLEWARE
export default common_mw(renderer, 'messages_view', 'default_menubar', 'Devapt Devtools - Messages')
