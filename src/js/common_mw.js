
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
export default function(arg_renderer, arg_main_view, arg_title/*, arg_label, arg_url*/)
{
	return function(req, res)
	{
		assert( T.isString(arg_main_view) || ( T.isObject(arg_main_view) && arg_main_view.is_component ), context + ':bad main view object')
		
		const menubar_state = devapt.store.get_menubar('default_menubar').state
		
		// const auth_basic_realm = '<meta http-equiv="WWW-Authenticate" content="Basic realm=Devtools"/>'
		// const auth_basic_credentials = '<meta http-equiv="Authorization" content="Basic {{{credentials_basic_base64}}}"/>'

		arg_renderer.page('main', {title:arg_title/*, headers:[auth_basic_realm, auth_basic_credentials]*/})
		.menubar('menus', null, menubar_state)
		
		const html = arg_renderer.up()
		.hbox('separator', null, undefined)
		.up()
		.add(arg_main_view)
		.up()
		.script('main_script',
			{
				scripts:[],
				scripts_urls:['plugins/Devtools/browser.min.js', 'plugins/Devtools/devapt-browser.js', 'plugins/Devtools/app.js']
			},
			null)
		.up()
		.render()
		
		const rendered_html = runtime.context.render_credentials_template(html, req)
		
		res.send(rendered_html)
	}
}
