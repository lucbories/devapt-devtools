
// NPM IMPORTS
import assert from 'assert'

// DEVAPT CORE COMMON IMPORTS
import T from 'devapt-core-common/dist/js/utils/types'


const context = 'devtools/js/common_mw'



/**
 * Rendering middleware builder.
 * 
 * @author Luc BORIES
 * 
 * @license Apache-2.0
 */
export default function(arg_renderer, arg_main_view, arg_main_menubar, arg_title)
{
	return function(req, res)
	{
		assert( T.isString(arg_main_view) || ( T.isObject(arg_main_view) && arg_main_view.is_component ), context + ':bad main view object')
		
		const title = arg_title
		const credentials = req.devapt_credentials
		const view_name = arg_main_view
		const menubar_name = undefined
		
		const html = arg_renderer.render_html_page(title, view_name, menubar_name, credentials, req.devapt_assets_services)

		// MANAGE ERROR
		if (! T.isString(html) )
		{
			res.status(500)
			res.send('a rendering error occures for view [' + view_name + ']')
			return
		}

		res.send(html)
	}
}
