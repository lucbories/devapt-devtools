
import T from 'typr'
import assert from 'assert'
import devapt from 'devapt'

import get_menubar_anchors from '../menubar'



const runtime = devapt.runtime
const config = devapt.config
const logs = devapt.logs
const Render = devapt.Render
const Component = devapt.Component

const context = 'devtools/logs/logs_mw'

// import { html_template } from '../lib/html_template'
// import Table from '../lib/table'
// import Page from '../lib/page'



export default function middleware(req, res)
{
	/*let records_array = [{'ts':Date.now(), 'level':'DEBUG', 'content':'hello1'}, {'ts':Date.now(), 'level':'DEBUG', 'content':'hello2'}]
	
	// DEFINE TABLE COMPONENT
	const table_state = { headers:['ts', 'level', 'content'], items:records_array, label:'logs'}
	let component = new Table({state:table_state})
	
	// DEFINE PAGE COMPONENT
	const page_settings = {
		children:[component],
		label:'Devapt Devtools - Logs'
	}
	let page = new Page(page_settings)
	
	// RENDER PAGE
	const html = page.render()*/
	
    const html = 'not yet implemented'
	res.send(html)
}
