
import T from 'typr'
import assert from 'assert'

import devapt from 'devapt'



const runtime = devapt.runtime

// import { render_node } from '../../lib/render_tree'
// import { html_tree_template } from '../../lib/html_template'



export default function middleware(req, res)
{
	// const state = runtime().toJS()
	
	
	// let html_content = render_node(state, 1, 'runtime')
	
	
	// const html = html_tree_template(html_content, 'Devapt Devtools - Store / Runtime')
	
    const html = 'not yet implemented'
	res.send(html)
}
