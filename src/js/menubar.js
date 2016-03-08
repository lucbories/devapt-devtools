
export default function get_menubar_anchors(arg_app_url, arg_url_credentials)
{
	console.log(arg_url_credentials, 'arg_url_credentials')
	
    return [
		`<a href="/${arg_app_url}/store/config/all/${arg_url_credentials}">Config All</a>`,
		`<a href="/${arg_app_url}/store/config/applications/${arg_url_credentials}">Config Applications</a>`,
		
		`<a href="/${arg_app_url}/store/config/resources/${arg_url_credentials}">Config Resources</a>`,
		`<a href="/${arg_app_url}/store/config/views/${arg_url_credentials}">Config Views</a>`,
		`<a href="/${arg_app_url}/store/config/models/${arg_url_credentials}">Config Models</a>`,
		`<a href="/${arg_app_url}/store/config/menubars/${arg_url_credentials}">Config Menubars</a>`,
		`<a href="/${arg_app_url}/store/config/menus/${arg_url_credentials}">Config Menus</a>`,
		
		`<a href="/${arg_app_url}/store/config/modules/${arg_url_credentials}">Config Modules</a>`,
		`<a href="/${arg_app_url}/store/config/plugins/${arg_url_credentials}">Config Plugins</a>`,
		`<a href="/${arg_app_url}/store/config/nodes/${arg_url_credentials}">Config Nodes</a>`,
		`<a href="/${arg_app_url}/store/config/services/${arg_url_credentials}">Config Services</a>`,
		
		`<a href="/${arg_app_url}/store/runtime/${arg_url_credentials}">Runtime</a>`,
		`<a href="/${arg_app_url}/metrics/${arg_url_credentials}">Metrics</a>`
	]
}
