
import T from 'typr'
import assert from 'assert'

import get_menubar_menus from './menubar'


const context = 'devtools/js/common_mw'



export default function(arg_renderer, arg_main_view, arg_title, arg_label, arg_url)
{
	return function(req, res)
	{
		assert( T.isObject(arg_main_view) && arg_main_view.is_component, context + ':bad main view object')
		
		arg_renderer.request = req
		const html = arg_renderer.page('main', {request:req, label:arg_title})
		.menubar('menus', null, {items:get_menubar_menus(), app_url:arg_url, request:req, label:arg_label})
		.up()
		.add(arg_main_view)
		.up()
		.script('main_script',
			{
				scripts:[],
				scripts_urls:['js/vendor/browser.min.js', 'js/devapt-browser.js', 'js/app.js']
			},
			null)
		.up()
		.render()

		res.send(html)
	}
}
