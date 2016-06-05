
import T from 'typr'
import assert from 'assert'
import devapt from 'devapt'


const runtime = devapt.runtime
const context = 'devtools/js/common_mw'


/**
 * Rendering middleware builder.
 * @author Luc BORIES
 * @license Apache-2.0
 */
export default function(arg_renderer, arg_main_view, arg_title, arg_label, arg_url)
{
	return function(req, res)
	{
		assert( T.isObject(arg_main_view) && arg_main_view.is_component, context + ':bad main view object')
		
		const menubar_state = devapt.store.get_menubar('default_menubar').state
		
		arg_renderer.page('main', {title:arg_title})
		.menubar('menus', null, menubar_state)
		
		const html = arg_renderer.up()
		.hbox('separator', null, undefined)
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
		
		const rendered_html = runtime.context.render_credentials_template(html, req)
		
		res.send(rendered_html)
	}
}
