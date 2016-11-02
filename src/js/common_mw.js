// NPM IMPORTS
import T from 'typr'
import assert from 'assert'


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
		
		const renderer_result = arg_renderer.render_page_content(title, view_name, menubar_name, credentials, req.devapt_assets_services)

		// MANAGE ERROR
		if (! T.isString(renderer_result) )
		{
			res.status(500)
			res.send('a rendering error occures for view [' + view_name + ']')
			return
		}

		res.send(renderer_result)
	}
}
